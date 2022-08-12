import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLiteMock, SQLitePorterMock } from './mocks/sqlite.mock';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePickerMock } from './mocks/date-picker.mock';
import { Capacitor } from '@capacitor/core';

export function getSQLite() {
  return Capacitor.getPlatform() === 'web' ? { provide: SQLite, useClass: SQLiteMock } : SQLite;
}

export function getDatePicker() {
  return Capacitor.getPlatform() === 'web' ? { provide: DatePicker, useClass: DatePickerMock } : DatePicker;
}

import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SQLite,
    getDatePicker(),
    getSQLite(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
        provide: LOCALE_ID,
        useValue: 'pt'
    },
    {
        provide:  DEFAULT_CURRENCY_CODE,
        useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
