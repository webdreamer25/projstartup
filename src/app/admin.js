import './polyfill';
import 'core-js/modules/es6.symbol';
// import 'core-js/modules/es6.array.find'

import AdminComposite from './composites/admin/admin.composite';

import firebase from 'firebase/app';
import 'firebase/database';


// Initialize Firebase
const config = {
  apiKey: "AIzaSyANt1SjQiwDW6VaRDg12NA8LQzkcjF7yQc",
  authDomain: "crees-9efc7.firebaseapp.com",
  databaseURL: "https://crees-9efc7.firebaseio.com",
  projectId: "crees-9efc7",
  storageBucket: "crees-9efc7.appspot.com",
  messagingSenderId: "297603630872"
};

window.crees = {
  item: {},
  settings: {},
  configurations: Object.freeze({
    projectId: config.projectId,
    dbURL: config.databaseURL
  })
};

firebase.initializeApp(config);

const db = firebase.database();

let currentModuleName = null;
let currentComponentId = null;

// Dynamic conditional module loader.
function determineModuleToRender(settings) {
  import(
    /* webpackIgnore: false */ 
    './modules/admin/' + settings.moduleName + '.module'
  ).then(module => {

    module = module.default;

    // Needed when view is renderType = 'html' and is rendering inside the same container the existing composite, module or component is never destroyed.
    if (currentModuleName === null || module.hasRendered || currentModuleName !== module.name ||
        settings.componentId !== undefined && settings.componentId !== currentComponentId) {
      currentModuleName = module.name;
      currentComponentId = settings.componentId;
      module.hasRendered = false;
    }

    if (!module.hasRendered) {
      module.db = db;
      module.fb = firebase;
      module.store = settings.store;
      
      if (settings.imagesData) {
        module.imagesData = settings.imagesData;
      }

      delete settings.store;
      delete settings.imagesData;

      module.settings = settings;
      module.render();
    }
  });
};

// We need to set pageName variable based on the hash property.
function determineCurrentPage(snap) {
  let pageName = '';
  let hash = window.location.hash;
  let pathArray = hash.split('/');
  let index = pathArray.length - 1;
  let lastOfIndex = parseInt(pathArray[index]);
  let temp = sessionStorage.getItem('temp');
  let storage = sessionStorage.getItem('appSettings');
  let settings = {};

  if (temp !== null) {
    temp = JSON.parse(temp);
  }

  // Get the saved breadcrumb if it exists
  if (storage !== null) {
    let appSettings = JSON.parse(storage);

    settings = Object.assign(appSettings, temp);
    settings.routes.length = Object.keys(settings.routes).length - 1;
  } else {
    settings = Object.assign({
      routes: {
        dashboard: 'dashboard',
        length: 1
      },
      info: {
        originRoute: hash
      }
    }, temp);
  }

  sessionStorage.removeItem('temp');

  if (hash === undefined || hash === '' || hash === '#dashboard') {
    pageName = 'dashboard';
  } else if (pathArray.length > 1) {
    index = isNaN(lastOfIndex) && pathArray[2] !== 'new' ? index : (index - 1);

    pageName = pathArray[index];
  }

  switch (pageName) {
    case 'dashboard':
      settings.component = false;
      settings.store = snap.val();

      if (settings.routes.length > 1) {
        delete settings.routes['components'];
        delete settings.routes['edit'];
      }

      break;
    case 'edit':
      let page = pathArray[0].replace('#', '');

      settings.component = true;

      if (pathArray[2] === 'new') {
        settings.componentId = 0;
      } else {
        settings.componentId = pathArray[2] ? pathArray[2] : 1;
      }

      settings.store = snap.child(page).val();
      settings.imagesData = snap.child('images/' + page).val();

      settings.dataIsArray = Array.isArray(settings.store);

      settings.info.totalComponents =  settings.dataIsArray ? (settings.store.length - 1) : 1;

      break;
    default: 
      let configIdx = 0;
      let currentPage = pathArray[0].replace('#', '');

      settings.store = snap.child('pages').val();
      settings.componentsConfig = settings.store.find((page) => {
        if (page.name === currentPage) {
          return true;
        } else {
          configIdx++;

          return false;
        }
      });

      settings.componentsConfig.configIdx = configIdx;

      if (settings.routes.length > 2) {
        delete settings.routes['edit'];
      }
  }

  // Handle setting current hashes
  settings.routes[pageName] = pageName === 'dashboard' ? pageName : hash.replace('#', '');

  // Ensures we remove plurality and handle undefined cases.
  if (settings.component) {
    settings.component = pathArray[0].replace('#', '');
  } else {
    settings.component = '';
  }

  if (pathArray[1] === 'en' || pathArray[1] === 'es') {
    settings.language = pathArray[1] ;
  }

  settings.moduleName = pageName;

  let settingsCopy = Object.assign({}, settings);

  delete settingsCopy.store;

  sessionStorage.removeItem('appSettings');
  sessionStorage.setItem('appSettings', JSON.stringify(settingsCopy));

  determineModuleToRender(settings);
};

function setReferenceURLPath(route) {
  let dbPath = '';
  let urlPath = route.split('/');

  if (urlPath.includes('edit')) {
    let savedSettings = JSON.parse(sessionStorage.getItem('appSettings'));

    dbPath = 'language/' + savedSettings.language;
    dbPath += '/pages/' + savedSettings.page + '-page/';
  } else {
    dbPath = 'app';
  }

  return dbPath;
};

// Initial routing on first load or refresh.
db.ref('app').once('value', snap => {
  let hash = window.location.hash;
  let user = sessionStorage.user !== null && sessionStorage.user !== undefined;

  AdminComposite.store = snap.val();
  AdminComposite.render();

  // We only want to check page after user has logged in
  if (user && hash !== '#') {
    if (hash.indexOf('edit') === -1) {
      determineCurrentPage(snap);
    } else {
      db.ref(setReferenceURLPath(hash)).once('value', determineCurrentPage);
    }
  }
});

// Handle routing to the appropriate page.
window.addEventListener('hashchange', () => {
  let hash = window.location.hash;
  let user = sessionStorage.user !== null && sessionStorage.user !== undefined;

  if (hash === '#!' || hash === '#' || !user) {
    hash = '';
    
    return false;
  }

  db.ref(setReferenceURLPath(hash)).once('value', determineCurrentPage);
}, false);

// Needed to ensure we re-render the component after save.
// db.ref(setReferenceURLPath(window.location.hash)).on('value', determineCurrentPage);