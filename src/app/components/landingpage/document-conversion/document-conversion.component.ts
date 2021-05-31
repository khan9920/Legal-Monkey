import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document-conversion',
  templateUrl: './document-conversion.component.html',
  styleUrls: ['./document-conversion.component.scss']
})
export class DocumentConversionComponent implements OnInit {

  public selected: boolean = false;
  public inputs: any = [];
  public extraction: any;

  public receivedOutput: boolean = false;
  public outputs: any = [];

  constructor(private documentsService: DocumentsService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.extraction = JSON.parse(localStorage.getItem('extraction'));
    this.inputs = JSON.parse(localStorage.getItem('extraction')).inputs;
  }

  onGoBack() {
    this.router.navigate(['/']);
  }

  onSelect(ID: string) {
    this.inputs.forEach(input => {
      if (input._id == ID) {
        input.selected = true;
      } else {
        input.selected = false
      }
    });

    const data = {
      _id: this.extraction._id,
      passageID: ID
    }

    this.documentsService.simplify(data).subscribe(result => {
      if (result.success) {
        this.receivedOutput = true;
        this.outputs = result.data.outputs;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onHighlight() {
    this.documentsService.highlight({ _id: this.extraction._id }).subscribe(result => {
      if (result.success) {
        this.inputs = result.data.inputs;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }
}