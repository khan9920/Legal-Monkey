import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import EditorJS from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import { SimplifyService } from 'src/app/services/simplify.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor;
  private convertedData: string = '';

  constructor(private simplifyService: SimplifyService, private snackBar: MatSnackBar) { }

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
      this.simplifyService.simplifyDocument(outputData).subscribe(result => {
        if (result.success) {
          localStorage.setItem('converted-doc', result.data);
          window.location.reload();
        }
      }, error => {
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        })
      })
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }
}
