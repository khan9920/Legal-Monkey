import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-conversion',
  templateUrl: './document-conversion.component.html',
  styleUrls: ['./document-conversion.component.scss']
})
export class DocumentConversionComponent implements OnInit {

  public selected: boolean = false;
  public inputs: any = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.inputs = JSON.parse(localStorage.getItem('extraction')).inputs;
  }

  onGoBack() {
    this.router.navigate(['/']);
  }

  onSelect(ID: string) {


  }
}
