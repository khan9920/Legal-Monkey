import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimplifyService } from 'src/app/services/simplify.service';
import MediumEditor from "medium-editor";

declare let rangy: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild("editor") editor: ElementRef;

  public extraction: {
    _id: string,
    text: string
  };

  public isLoading: boolean = false;

  constructor(private simplifyService: SimplifyService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.extraction = JSON.parse(localStorage.getItem('extraction'));
  }

  ngAfterViewInit() {
    const edit = this.editor.nativeElement;
    rangy.init();

    var HighlighterButton = MediumEditor.extensions.button.extend({
      name: 'highlighter',
      tagNames: ['mark'],
      contentDefault: '<b>H</b>',
      contentFA: '<i class="fa fa-paint-brush"></i>',
      aria: 'Highlight',
      action: 'highlight',

      init: function () {
        MediumEditor.extensions.button.prototype.init.call(this);

        this.classApplier = rangy.createClassApplier('highlight', {
          elementTagName: 'mark',
          normalize: true
        });
      },

      handleClick: function (event) {
        this.classApplier.toggleSelection();
        this.base.checkContentChanged();
      }
    });

    const editor = new MediumEditor(edit, {
      toolbar: {
        buttons: ['highlighter'],
      },
      buttonLabels: 'fontawesome',
      extensions: {
        'highlighter': new HighlighterButton()
      }
    });
  }

  onSimplify() {
    this.isLoading = true;
    const data = {
      _id: this.extraction._id,
      text: this.editor.nativeElement.innerHTML
    }

    this.save(this.extraction._id, this.editor.nativeElement.innerHTML);
    this.simplifyService.simplifyDocument(data).subscribe(result => {
      if (result.success) {
        this.isLoading = false;
        this.extraction = result.data;
        this.save(result.data._id, result.data.text);
      }
    }, error => {
      this.isLoading = false;
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      })
    })
  }

  private save(ID: string, Text: string) {
    const data = {
      _id: ID,
      text: Text,
    }

    localStorage.setItem('extraction', JSON.stringify(data));
  }
}
