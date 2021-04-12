import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ISelectedTVMovie, MediaType } from '@/app/interface/ITVMovie';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public id!: number;
  @Input() public mediaType?: MediaType;
  @Input() public title?: string;
  @Input() public imageUrl!: string;
  @Input() public isVirtual: boolean | undefined = false;
  @Input() public customClasses?: string | string[];

  @Output() public clicked: EventEmitter<ISelectedTVMovie> = new EventEmitter();

  constructor(private router: Router) {}

  public ngOnInit(): void {}

  public clickHandler(e: Event): void {
    const { id, title, imageUrl, mediaType, clicked } = this;

    const item = { id, name: title, poster_path: imageUrl, backdrop_path: imageUrl, media_type: mediaType, title, imageUrl, mediaType };

    clicked.emit(item as ISelectedTVMovie);
  }
}
