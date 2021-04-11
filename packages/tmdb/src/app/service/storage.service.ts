import { Injectable } from '@angular/core';

import store2 from 'store2';

import { CONTINUE_WATCHING_KEY } from '@/app/config';

import { ITVMovie } from '@/app/interface/ITVMovie';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {}

  public addContinueWatchingItem(item: ITVMovie): void {
    const continueWatchingLists = this.getContinueWatchingLists();

    if (continueWatchingLists.some((val) => (val.media_type === item.media_type && val.id === item.id))) {
      return;
    }

    store2.add(CONTINUE_WATCHING_KEY, [item]);
  }

  public getContinueWatchingLists(): ITVMovie[] {
    const continueWatchingLists = store2.get(CONTINUE_WATCHING_KEY);

    return continueWatchingLists || [];
  }
}
