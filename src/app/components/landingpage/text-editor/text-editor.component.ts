import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SimplifyService } from 'src/app/services/simplify.service';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit, OnDestroy {

  public text = 'Your text...';
  public isLoading: boolean = false;
  public simplifiedData = [];

  public isEnterTextClicked: boolean = true;
  public isUploadDocumentClicked: boolean = false;

  public editorEnabled: boolean = true;
  public editorStatusSub: Subscription;
  public isAuthenticated: boolean = false;
  private isAuthenticatedStatusSub: Subscription;

  public files: File[];

  constructor(private simplifyService: SimplifyService, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editorStatusSub = this.simplifyService.getEditorStatus().subscribe(result => {
      this.editorEnabled = result;
    });

    this.isAuthenticatedStatusSub = this.authService.getAuthenticationStatus().subscribe(result => {
      this.isAuthenticated = result;
    })
  }

  onEnterTextClick() {
    this.isEnterTextClicked = true;
    this.isUploadDocumentClicked = false;
  }

  onUploadDocumentClick() {
    this.isEnterTextClicked = false;
    this.isUploadDocumentClicked = true;
  }

  onUploadDocument(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);

  }

  onSimplify(text: any) {

    if (this.isAuthenticated == false) {
      this.dialog.open(LoginComponent, {
        width: '400px',
        maxHeight: '90vh'
      });
      return;
    } else {
      return;
      if (text == '' || text == 'Your text...') {
        this.snackBar.open('Please enter your text and try again!', 'Dismiss', {
          duration: 3000
        });
        return;
      }

      this.isLoading = true;

      const data = {
        text: text
      }

      this.simplifyService.simplify(data).subscribe(result => {
        if (result.success) {
          this.isLoading = false;
          this.editorEnabled = false;
          this.simplifiedData = result.data;
        }
      }, error => {
        this.isLoading = false;
        this.snackBar.open(error.error.data, 'Dismiss', {
          duration: 3000
        });
      });
    }
  }

  ngOnDestroy() {
    this.isAuthenticatedStatusSub.unsubscribe();
  }
}
