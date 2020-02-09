import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openDialogue() {
    this.dialog.open(LoginComponent)
        .afterClosed()
        .subscribe(result => console.log(result));
  }
}
