// import 'core-js/modules/es6.symbol';
// import AppComposite from './composites/app.composite';
// import firebase from 'firebase/app';
// import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

// firebase.initializeApp(config);

// const ref = firebase.database().ref('language');

// Dynamic conditional module loader.
function determineModuleToRender(pageName, pageStore) {
  import(
    /* webpackIgnore: false */ 
    './composites/' + pageName + '.composite'
  ).then(composite => {
    composite.default.database = ref;
    composite.default.store = pageStore;
    composite.default.render()
  });
};

// We need to set pageName variable based on the hash property.
function determineCurrentPage(snap) {
  let pageStore = {};
  let pageName = window.location.hash.replace('#', '');

  switch(pageName) {
    case 'contacts':
      pageName = 'contacts';
      break;
    default:
      pageName = 'home';
      break;
  }

  pageStore = snap.child('pages/' + pageName + '-page').val();

  determineModuleToRender(pageName, pageStore);
};

// Handle routing to the appropriate page.
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#!') {
    window.location.hash = '';
    
    return false;
  }

  
}, false);
