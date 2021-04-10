import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexComponent } from './views/index/index.component';
import { DetailComponent } from './views/detail/detail.component';
import { MineComponent } from './views/mine/mine.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DetailComponent,
    MineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
