import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardComponent } from './components/card/card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DetailComponent } from './views/detail/detail.component';
import { IndexComponent } from './views/index/index.component';
import { MineComponent } from './views/mine/mine.component';
import { PlayerComponent } from './components/player/player.component';
import { CastCrewModalComponent } from './components/cast-crew-modal/cast-crew-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DetailComponent,
    MineComponent,
    CardComponent,
    CarouselComponent,
    PlayerComponent,
    CastCrewModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
