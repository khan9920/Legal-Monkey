import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeService } from 'src/app/services/me.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  constructor(private meService: MeService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAddCard() {
    const data = {
      session: 'SESSION0002409723047L75717837H8'
    }
    this.meService.addCard(data);
  }

  onClose() {
    this.dialog.closeAll();
  }
}
