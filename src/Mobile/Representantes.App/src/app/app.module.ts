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
  return Capacitor.platform == 'web' ? { provide: SQLite, useClass: SQLiteMock } : SQLite;
}

export function getDatePicker() {
  return Capacitor.platform == 'web' ? { provide: DatePicker, useClass: DatePickerMock } : DatePicker;
}

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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
