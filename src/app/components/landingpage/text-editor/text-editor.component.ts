import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { SimplifyService } from 'src/app/services/simplify.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  public text = 'Your text...';
  public isLoading: boolean = false;
  public simplifiedData = [];
  public editorEnabled: boolean = true;
  public editorStatusSub: Subscription;

  constructor(private simplifyService: SimplifyService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editorStatusSub = this.simplifyService.getEditorStatus().subscribe(result => {
      this.editorEnabled = result;
    })
  }

  onSimplify() {
    if (this.text == '' || this.text == 'Your text...') {
      this.snackBar.open('Please enter your text and try again!', 'Dismiss', {
        duration: 3000
      });
      return;
    }

    this.isLoading = true;

    const data = {
      text: this.text
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
