import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { EnterTitleComponent } from '../enter-title/enter-title.component';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
  @ViewChild('filesButton')
  filesButton: ElementRef;

  public isLoading: boolean = false;
  public selectedFile: File;
  public fileName: string = '';
  public fileType: string = '';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelectFiles(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.fileName = this.selectedFile.name;

    if (this.selectedFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      this.fileType = 'doc';
    } else if (this.selectedFile.type == 'application/pdf') {
      this.fileType = 'pdf'
    }
  }

  onUpload() {
    this.dialog.open(EnterTitleComponent, {
      width: '400px',
      maxHeight: '90vh',
      data: {
        file: this.selectedFile
      }
    });
  }

  onRemoveFile() {
    this.fileName = '';
    this.filesButton.nativeElement.value = "";
  }
}
