import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


class EditorComp extends React.Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef(null);
  }

  render() {
    const self = this;
    return (
      <div className="authoring-editor">
        <Editor
          className="container"
          ref={this.editorRef}
          onInit={(evt, editor) => self.editorRef.current = editor}
          initialValue={"" || localStorage.getItem('email-context')}
          init={{
            height: 500,
            menubar: 'file edit view insert format tools table help',
            plugins: [
              'hr colorpicker ',
              'advlist autolink lists link image imagetools charmap print preview anchor',
              'searchreplace visualblocks code fullscreen save',
              'insertdatetime media table paste code help wordcount '
            ],
            color_picker_callback: function(callback, value) {
              callback('#FF00FF');
            },
            imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
            paste_data_images: true,
            automatic_uploads: true,
            image_title: true,
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                  var id = 'blobid' + (new Date()).getTime();
                  var blobCache =  self.editorRef.current.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
          
              input.click();
            },
            //Save button call back function
            save_onsavecallback: function () {  
              var content = self.editorRef.current.getContent();
              console.log(content)
              localStorage.setItem('email-context', content)
            },
            toolbar: 'undo redo | link image | preview | fontsizeselect | fontselect | formatselect | ' +
            'bold italic underline forecolor backcolor hr | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist save | customInsertButton | ' +
            'outdent indent | removeformat | help | ',
            
            setup: function (editor) {
              editor.ui.registry.addButton('customInsertButton', {
                text: 'Add Button',
                onAction: function () {
                  const style = 'min-width: 100px;padding: 10px;color:white;height: 40px;background-color: black;'
                  editor.insertContent(`&nbsp;<span class="box" style="${style}">Button</span>&nbsp;`);
                  // self.makeDraggable();
                }
              });
              editor.on('init', function (e) {
                editor.setContent(localStorage.getItem('email-context'));
              });
            },
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
        {/* {render(generate())} */}
        {/* {htmlOutput} */}
      </div>
    );
  }
}


export default EditorComp;