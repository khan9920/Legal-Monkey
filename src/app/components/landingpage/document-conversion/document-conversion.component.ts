import { Component, OnInit } from '@angular/core';
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

  constructor(private documentsService: DocumentsService, private router: Router) { }

  ngOnInit(): void {
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
      // document: 
    }

    this.documentsService.simplify(data).subscribe(result => {
      console.log(result);
    })
  }
}
