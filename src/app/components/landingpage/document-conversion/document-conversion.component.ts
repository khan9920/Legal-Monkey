import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-conversion',
  templateUrl: './document-conversion.component.html',
  styleUrls: ['./document-conversion.component.scss']
})
export class DocumentConversionComponent implements OnInit {

  public selected: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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

    console.log(this.selected);

  }
}
