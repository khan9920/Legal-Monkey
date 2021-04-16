import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { MeService } from 'src/app/services/me.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { AddCardComponent } from './add-card/add-card.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  public me: any = '';
  private meSub: Subscription;

  public cards: any = [];
  private cardsSub: Subscription;

  public isLoading: boolean = false;
  public isLoadingSub: Subscription;

  constructor(private authService: AuthService, private meService: MeService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.meService.setLoadingStatus(true);
    this.meService.getMe();
    this.meSub = this.meService.getMeUpdated().subscribe(result => {
      this.me = result;
    });

    this.meService.getCards();
    this.cardsSub = this.meService.getCardsUpdated().subscribe(result => {
      this.cards = result;
    });

    this.isLoadingSub = this.meService.getLoadingStatus().subscribe(result => {
      this.isLoading = result;
    });
  }

  onAddCard() {
    this.dialog.open(AddCardComponent, {
      width: '400px',
      maxHeight: '90vh'
    });
  }

  onMakeDefaultCard(cardID: string) {
    const data = {
      card: cardID
    }

    this.meService.setLoadingStatus(true);
    this.meService.updateCard(data);
  }

  onRemoveCard(cardID: string) {
    const data = {
      card: cardID
    }

    this.meService.setLoadingStatus(true);
    this.meService.removeCard(data);
  }

  onBackToHome() {
    this.router.navigate(['/']);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // this.meSub.unsubscribe();
    this.cardsSub.unsubscribe();
  }
}
