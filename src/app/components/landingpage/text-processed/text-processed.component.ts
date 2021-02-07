import { Component, Input, OnInit } from '@angular/core';
import { SimplifyService } from 'src/app/services/simplify.service';

@Component({
  selector: 'app-text-processed',
  templateUrl: './text-processed.component.html',
  styleUrls: ['./text-processed.component.css']
})
export class TextProcessedComponent implements OnInit {

  conversions: [];

  constructor(private simplifyService: SimplifyService) { }

  ngOnInit() {
    this.conversions = JSON.parse(localStorage.getItem('convertedText'));
  }

  onSimplify() {
    this.simplifyService.setEditorStatus(true);
  }
}
