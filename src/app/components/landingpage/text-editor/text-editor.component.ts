import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  public conversions = [];

  public isEnterTextClicked: boolean = true;
  public isUploadDocumentClicked: boolean = false;

  public editorEnabled: boolean = true;
  public editorStatusSub: Subscription;
  public isAuthenticated: boolean = false;
  private isAuthenticatedStatusSub: Subscription;

  public selectedFile: File;
  public fileName: string = '';
  public fileType: string = '';


  constructor(private simplifyService: SimplifyService, private authService: AuthService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  onSelectFiles(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    this.fileName = this.selectedFile.name;

    if (this.selectedFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      this.fileType = 'doc';
    } else if (this.selectedFile.type == 'application/pdf') {
      this.fileType = 'pdf'
    }
  }

  onUpload() {
    this.isLoading = true;
    const data = new FormData();

    data.append('document', this.selectedFile);

    this.simplifyService.uploadDocuments(data).subscribe(result => {
      if (result.success) {
        this.isLoading = false;
        localStorage.setItem('converted-doc', result.data);
        this.router.navigate(['/editor']);
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }

  onSimplify(text: any) {

    if (this.isAuthenticated == false) {
      this.dialog.open(LoginComponent, {
        width: '400px',
        maxHeight: '90vh'
      });
      return;
    } else {
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
          this.conversions = result.data.conversions;
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
