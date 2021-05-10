import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-conversion',
  templateUrl: './document-conversion.component.html',
  styleUrls: ['./document-conversion.component.scss']
})
export class DocumentConversionComponent implements OnInit {

  public selected: boolean = false;
  public extraction: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.extraction = JSON.parse(localStorage.getItem('extraction'));
  }

  onGoBack() {
    this.router.navigate(['/']);
  }

  onSelect() {
    if (this.selected) {
      this.selected = false;
    } else {
      this.selected = true;
    }
  }
}
