import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-dialog',
  template: `
  <h2 mat-dialog-title>data.title</h2>
    <mat-dialog-content>
      <p>data.content</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <span class="flex-spacer"></span>
      <button mat-button mat-dialog-close *ngIf="data.cancelText">data.cancelText</button>
      <button mat-button mat-button-raised color="primary" [mat-dialog-close]="true"
        cdkFocusInitial>
        data.okText
      </button>
    </mat-dialog-actions>

  `,
  styleUrls: ['./simpleDialog.component.css']
})
export class SimpleDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
