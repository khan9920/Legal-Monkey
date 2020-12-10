import { Component, OnInit } from '@angular/core';
import { ConversionsService } from 'src/app/services/conversions.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent implements OnInit {

  public conversions = [];
  public recentClicked: boolean = true;
  public allClicked: boolean = false;

  constructor(private conversionsService: ConversionsService) { }

  ngOnInit(): void {
    this.conversions = this.conversionsService.getRecentConversions();
  }

  onRecent() {
    this.recentClicked = true;
    this.allClicked = false;
    this.conversions = this.conversionsService.getRecentConversions();
  }

  onAll() {
    this.recentClicked = false;
    this.allClicked = true;

    this.conversions = this.conversionsService.getAllConversions();
  }
}
