import { Behavior } from "../../../zense";

const WysiwygBehavior = Object.create(Behavior);

WysiwygBehavior.config({
  behaviorName: 'wysiwyg',

  ui: {
    wysiwyg: '.js-wysiwyg'
  },

  initialize() {
    HTMLTextAreaElement.prototype.insertAtCaret = function (text) {
      text = text || '';

      if (document.selection) {
        // IE
        this.focus();

        let sel = document.selection.createRange();

        sel.text = text;
      } else if (this.selectionStart || this.selectionStart === 0) {
        // Others
        let startPos = this.selectionStart;
        let endPos = this.selectionEnd;

        this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);

        this.selectionStart = startPos + text.length;
        this.selectionEnd = startPos + text.length;
      } else {
        this.value += text;
      }
    };
  },

  handlers() {
    this.dom('.js-wysiwyg-btn').on('click', (e) => {
      e.preventDefault();

      let btn = this.dom(e.currentTarget);
      let type = btn.attr('data-type');
      let textarea = this.ui.wysiwyg.find('.g-wysiwyg__textarea');
      let value = '';

      switch(type) {
        case 'bold':
          value = '<strong></strong>';
          break;
        case 'italic':
          value = '<em></em>';
          break;
        case 'break':
          value = '<br>';
          break;
        case 'paragraph':
          value = '<p></p>';
          break;
        case 'ul':
          value = '<ul><li>item 1</li><li>item 2</li><li>item 3</li></ul>';
          break;
        case 'ol':
          value = '<ol><li>item 1</li><li>item 2</li><li>item 3</li></ol>';
          break;
        default:
          textarea.select();
          document.execCommand('copy');
          return false;
      }

      textarea.insertAtCaret(value);
    });
  },

  addToolbar() {
    this.ui.wysiwyg.insertHTML('afterbegin', this.createToolbar());
  },

  createToolbar() {
    return `<div class="g-wysiwyg__toolbar">
      <div class="container">
        <div class="row">
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" title="bold" data-type="bold">
              <i class="far fa-bold"></i>
            </button>
          </div>
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" title="italic" data-type="italic">
              <i class="far fa-italic"></i>
            </button>
          </div>
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" title="page break" data-type="break">
              br
            </button>
          </div>
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" title="unordered list" data-type="ul">
              <i class="far fa-list-ul"></i>
            </button>
          </div>
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" title="ordered list" data-type="ol">
              <i class="far fa-list-ol"></i>
            </button>
          </div>
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" title="paragraph" data-type="paragraph">
              <i class="far fa-paragraph"></i>
            </button>
          </div>
          <div class="g-wysiwyg__col col-auto">
            <button class="g-wysiwyg__btn js-wysiwyg-btn" 
              title="copy to clipboard" 
              data-type="copy"
              data-notification="true"
              data-notification-message="Copied to clipboard!">
              <i class="far fa-clipboard"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  },

  start() {
    this.initialize();
    this.addToolbar();
    this.handlers();
  }
});

export default WysiwygBehavior;