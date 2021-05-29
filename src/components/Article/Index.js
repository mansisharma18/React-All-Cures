import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import ImageTool from '@editorjs/image';
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";

const editor = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    tools: {
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
          placeholder: 'Write Here....'
        },
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      header: {
        class: Header,
        /**
         * This property will override the common settings
         * That means that this tool will have only Marker and Link inline tools
         * If 'true', the common settings will be used.
         * If 'false' or omitted, the Inline Toolbar wont be shown
         */
        inlineToolbar: true,
        config: {
          placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
      },
  
      delimiter: Delimiter,
      warning: Warning,
      list: {
        class: List,
        inlineToolbar: [
          'link',
          'bold'
        ]
      },
      quote: Quote,
      checklist: {
       class: Checklist,
       inlineToolbar: true,
      },
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      embed: {
        class: Embed,
        inlineToolbar: false,
        config: {
         services: {
           youtube: true,
           coub: true
         },
        },
      },
      image: ImageTool,  
    }
  
  });
  
editor.isReady
.then(() => {
  console.log('Editor.js is ready to work!')
  /** Do anything you need after editor initialization */
})
.catch((reason) => {
  console.log(`Editor.js initialization failed because of ${reason}`)
});

export default editor;