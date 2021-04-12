import chunk from 'lodash/chunk';

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ImageFieldType, ISelectedTVMovie, ITVMovie, MediaType } from '@/app/interface/ITVMovie';

import { StorageService } from '@/app/service/storage.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [StorageService],
})
export class CarouselComponent implements OnChanges {
  @Input() public title = 'Title';
  @Input() public lists!: ITVMovie[];
  @Input() public interval = 3000000;
  @Input() public imageField: ImageFieldType = 'poster_path';
  @Input() public mediaType: MediaType = 'movie';
  @Input() public needAdd = true;
  @Input() public needNavigate = true;
  @Input() public customClasses: string | string[] = 'mb-5';

  @Output() public clicked: EventEmitter<ISelectedTVMovie> = new EventEmitter();

  public chunkCount = 6;
  public chunkedLists: ITVMovie[][] = [];

  constructor(private storage: StorageService, private router: Router) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const { chunkCount } = this;

    const { lists } = changes;

    const chunkedLists = chunk(lists.currentValue, chunkCount);
    const lastChunk = chunkedLists[ chunkedLists.length - 1 ];

    if (lastChunk) {
      Array.from({ length: chunkCount - lastChunk.length }).forEach(() => {
        lastChunk.push({ isVirtual: true });
      });
    }

    this.chunkedLists = chunkedLists as ITVMovie[][];
  }

  public clickedHandler(item: ISelectedTVMovie): void {
    const { router, storage, clicked, needAdd, needNavigate } = this;
    const { id, mediaType } = item;

    clicked.emit(item);

    if (needAdd) {
      storage.addContinueWatchingItem(item);
    }

    if (!needNavigate) {
      return;
    }

    router.navigateByUrl(`/watch/${mediaType}/${id}`);
  }
}
