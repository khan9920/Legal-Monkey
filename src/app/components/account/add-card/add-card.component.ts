declare var $: any;
declare var WebxpayTokenizeInit: any;
import { get } from 'scriptjs';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeService } from 'src/app/services/me.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  public title: string = '';

  constructor(private meService: MeService, private route: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.route.url === '/account') {
      this.title = 'Add new card'
    } else {
      this.title = 'Free trial is over!'
    }

    // const cardServices = CardService;
    const scope = this;
    // webxpay codes
    // init webxpay
    get("https://cbcmpgs.gateway.mastercard.com/form/version/52/merchant/TESTWEBXPATOKLKR/session.js", () => {
      WebxpayTokenizeInit({
        card: {
          number: "#card-number",
          securityCode: "#security-code",
          expiryMonth: "#expiry-month",
          expiryYear: "#expiry-year",
          nameOnCard: "#cardholder-name",
        },
        ready: afterInit,
      });

      function afterInit(GenerateSession) {
        // save card
        $('#save-card-button').click(function () {
          $('#save-card-button').attr('disabled', true);

          GenerateSession(
            function (session) {
              handleSuccess(session);
            },
            function (error) {
              handleErrors(error);
            }
          );
        });
      }

      // execute when hosted session successfully generated
      function handleSuccess(sessionId) {

        const data = {
          session: sessionId
        }

        scope.meService.addCard(data);
      }
      // execute when hosted session generation fail.
      function handleErrors(error) {
        $('#save-card-button').removeAttr('disabled');
        $('#save-card-button').html('Save');

        $('.err').html('');
        $('.general-error').html('');

        switch (error.type) {
          case 'fields_in_error': {
            if (error.details.cardNumber) {
              if (error.details.cardNumber == 'missing') {
                $('.card-number-error').html('Enter valid card number');
              }
              if (error.details.cardNumber == 'invalid') {
                $('.card-number-error').html('Invalid card number');
              }
            }
            if (error.details.expiryMonth) {
              if (error.details.expiryMonth == 'missing') {
                $('.exp-month-error').html('Enter expiration month');
              }
              if (error.details.expiryMonth == 'invalid') {
                $('.exp-month-error').html('Invalid expiration month');
              }
            }
            if (error.details.expiryYear) {
              if (error.details.expiryYear == 'missing') {
                $('.exp-year-error').html('Enter expiration year');
              }
              if (error.details.expiryYear == 'invalid') {
                $('.exp-year-error').html('Invalid expiration year');
              }
            }
            if (error.details.securityCode) {
              if (error.details.securityCode == 'missing') {
                $('.cvv-error').html('Enter CVV');
              }
              if (error.details.securityCode == 'invalid') {
                $('.cvv-error').html('Invalid CVV');
              }
            }
            console.error('missing card details', error.details);
            break;
          }
          case 'request_timeout': {
            $('.general-error').html('<span class="text-decoration-uppercase">' + error.details + '</span>')
            console.error('request time out', error.details);
            break;
          }
          case 'system_error': {
            if (error.details == 'cvv missing') {
              $('.general-error').html('Enter CVV details');
            } else {
              $('.general-error').html(error.details);
            }
            console.error('system error', error.details);
            break;
          }
        }
      }
    });
  }

  onClose() {
    this.dialog.closeAll();
  }
}
