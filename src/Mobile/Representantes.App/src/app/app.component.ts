import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

//import { Plugins } from '@capacitor/core';
//const { Storage } = Plugins;
import { Storage } from '@capacitor/storage';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  constructor(
    private platform: Platform,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      SplashScreen.hide();

      let token = Storage.get({ key: 'Token' });
      token.then(a => {
        if(a.value){
          console.log(a.value);
          this.router.navigate(['principal']);
        }
        else{
          this.router.navigate(['login']);
        }
      });
    });

  }


  
}
