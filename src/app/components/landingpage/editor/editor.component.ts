import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Marker from '@editorjs/marker';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor;
  private convertedData: string = '';

  constructor() { }

  ngOnInit(): void {
    this.convertedData = localStorage.getItem('converted-doc');

    this.editor = new EditorJS({
      holder: 'editor-js',
      inlineToolbar: ['marker'],
      tools: {
        marker: {
          class: Marker
        }
      },
      data: {
        time: 1552744582955,
        blocks: [
          {
            type: "paragraph",
            data: {
              text: this.convertedData
            }
          }
        ],
        version: "2.11.10"
      }
    });
  }

  onSimplify() {
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }
}
