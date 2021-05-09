import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExtractsService } from 'src/app/services/extracts.service';

@Component({
  selector: 'app-simple-conversion',
  templateUrl: './simple-conversion.component.html',
  styleUrls: ['./simple-conversion.component.scss']
})
export class SimpleConversionComponent implements OnInit, OnDestroy {

  public enableEditor: boolean = false;
  private enableEditorSub: Subscription;

  constructor(private extractsService: ExtractsService) { }

  ngOnInit(): void {
    this.enableEditorSub = this.extractsService.getEditorStatus().subscribe(result => {
      this.enableEditor = result;
    });
  }

  ngOnDestroy() {
    this.enableEditorSub.unsubscribe();
  }
}
