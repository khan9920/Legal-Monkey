import { Component, OnInit } from '@angular/core';
import { ExtractsService } from 'src/app/services/extracts.service';

@Component({
  selector: 'app-simple-response',
  templateUrl: './simple-response.component.html',
  styleUrls: ['./simple-response.component.scss']
})
export class SimpleResponseComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(private extractsService: ExtractsService) { }

  ngOnInit(): void {
  }

  onGoBack() {
    this.extractsService.setEditorStatus(true);
  }
}
