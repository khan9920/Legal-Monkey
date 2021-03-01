import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimplifyService } from 'src/app/services/simplify.service';
import MediumEditor from "medium-editor";
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ShowPriceComponent } from '../show-price/show-price.component';

declare let rangy: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild("editor") editor: ElementRef;

  public extraction: {
    _id: string,
    text: string
  };

  public extractionSub: Subscription;

  public isLoading: boolean = false;
  public isLoadingSub: Subscription;

  constructor(private simplifyService: SimplifyService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.extraction = JSON.parse(localStorage.getItem('extraction'));

    this.extractionSub = this.simplifyService.getDocumentUpdated().subscribe(result => {
      this.extraction = result;
    });

    this.isLoadingSub = this.simplifyService.getEditorStatus().subscribe(result => {
      this.isLoading = result;
    });
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

    this.dialog.open(ShowPriceComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: {
        _id: this.extraction._id,
        text: this.editor.nativeElement.innerHTML,
        type: 'document'
      }
    });
  }

  ngOnDestroy() {
    this.extractionSub.unsubscribe();
  }
}
