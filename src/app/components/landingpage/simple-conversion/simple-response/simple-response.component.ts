import { Component, OnInit } from '@angular/core';
import { ExtractsService } from 'src/app/services/extracts.service';

@Component({
  selector: 'app-simple-response',
  templateUrl: './simple-response.component.html',
  styleUrls: ['./simple-response.component.scss']
})
export class SimpleResponseComponent implements OnInit {

  public isLoading: boolean = false;
  public extraction: any;

  constructor(private extractsService: ExtractsService) { }

  ngOnInit(): void {
    this.extraction = JSON.parse(localStorage.getItem('simpleExtraction'));
    console.log(this.extraction);

  }

  onGoBack() {
    this.extractsService.setEditorStatus(true);
  }
}
