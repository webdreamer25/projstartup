import { Behavior } from "../../../zense";
import 'firebase/storage';

const UploaderBehavior = Object.create(Behavior);

UploaderBehavior.config({
  behaviorName: 'file-uploader',

  ui: {
    dropArea: '.js-drop-area',
    gallery: '.js-uploader-gallery',
    progressBar: '.js-progress-bar',
    uploaderField: '.js-image-upload-field'
  },

  fileIdx: 0,
  uploadProgress: [],

  handlers() {
    this.ui.dropArea.on('dragenter', this.highlight.bind(this));
    this.ui.dropArea.on('dragover', this.highlight.bind(this));
    this.ui.dropArea.on('dragleave', this.unhighlight.bind(this));
    this.ui.dropArea.on('drop', this.handleDrop.bind(this));
    this.ui.uploaderField.on('change', this.handleFiles.bind(this));
  },

  reset() {
    this.resetProgressBar();

    this.ui.gallery.innerHTML = '';
  },

  highlight(e) {
    e.preventDefault();

    this.ui.dropArea.find('.c-uploader__droparea').classList.add('c-uploader--highlight');
  },

  unhighlight(e) {
    e.preventDefault();

    this.ui.dropArea.find('.c-uploader__droparea').classList.remove('c-uploader--highlight');
  },

  handleDrop(e) {
    let files = e.dataTransfer.files;

    this.unhighlight(e);
    this.handleFiles(files);
  },

  handleFiles(files) {
    files = [...files];

    this.initProgressBar(files.length);

    files.forEach(this.uploadFile.bind(this));
    files.forEach(this.previewFile.bind(this));
  },

  uploadFile(file, idx) {
    let filePath = '/images/' + this.settings.page;
    let storageRef = this.storage.ref(filePath);
    let uploadTask = storageRef.child(file.name).put(file);

    uploadTask.on('state_changed', (snap) => {
      let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      let url = 'https://firebasestorage.googleapis.com/v0/b/crees-9efc7.appspot.com/o/';

      this.updateProgressBar(idx, progress);

      if (snap.metadata) {
        let payload = {
          component: this.settings.page,
          name: file.name,
          size: file.size,
          type: file.type
        };

        payload.filePath = url + encodeURIComponent(snap.metadata.fullPath);

        this.writeFileToDatabase(payload);
      }

      // switch (snap.state) {
      //   case this.storage.TaskState.PAUSED: // or 'paused'
      //     console.log('Upload is paused');
      //     break;
      //   case this.storage.TaskState.RUNNING: // or 'running'
      //     console.log('Upload is running');
      //     break;
      // }
    }, (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, () => {
      this.fileIdx += 1;

      if (this.fileIdx === this.uploadProgress.length) {
        let msg = '';

        this.resetProgressBar();

        if (this.fileIdx > 1) {
          msg = 'Successfully uploaded all ' + this.fileIdx + ' images.';
        } else {
          msg = 'Successfully uploaded ' + file.name;
        }

        this.events.publish('notify', { msg }, true);
      }
    });
  },

  writeFileToDatabase(payload) {
    let path = 'pages/' + this.settings.page + '-page/images/' + this.settings.component;

    this.module.db.ref('language').once('value', (snap) => {
      let updates = {};
      let imagesList = snap.child('/en/' + path).val();

      path += '/' + imagesList.length;

      updates['/en/' + path] = payload;
      updates['/es/' + path] = payload;

      this.module.db.ref('language').update(updates);
    });
  },

  previewFile(file) {
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      let img = `<div class="c-uploader__image col">
        <div class="c-uploader__image-inner">
          <img src="${reader.result}" class="img-responsive" />
        </div>
      </div>`;

      this.ui.gallery.insertHTML('afterbegin', img);
    };
  },

  initProgressBar(numberOfFiles) {
    this.ui.progressBar.style.cssText = 'width: ' + 0 + '%';

    this.uploadProgress = [];

    for (let i = numberOfFiles; i > 0; i--) {
      this.uploadProgress.push(0);
    }
  },

  updateProgressBar(fileNumber, percent) {
    let total;

    this.uploadProgress[fileNumber] = percent;

    total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length;
    
    this.ui.progressBar.style.cssText = 'width: ' + total + '%';
  },

  resetProgressBar() {
    this.fileIdx = 0;
    this.uploadProgress = [];

    // this.ui.progressBar.style.cssText = 'display: none;'

    // this.ui.progressBar.style.cssText = '';
    this.ui.progressBar.style.cssText = 'width: ' + 0 + '%';
  },

  start() {
    this.settings = this.module.settings;
    this.storage = this.module.fb.storage();

    this.handlers();
  }
});

export default UploaderBehavior;