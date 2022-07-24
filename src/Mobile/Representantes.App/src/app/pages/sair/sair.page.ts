import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { DatabaseService } from 'src/app/services/database/database';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit {

  constructor(
    private router: Router,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
  }

  sair(){
    this.apagarToken().then(() => {
      this.db.resetDb().then(() => {
        this.router.navigate(['login']);
      });
    });
  }

  async apagarToken() {
    await Storage.remove({ key: 'Token' });
  };
}
