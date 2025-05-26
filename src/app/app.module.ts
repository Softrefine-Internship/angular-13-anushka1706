import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TileModel } from './tile.model';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
