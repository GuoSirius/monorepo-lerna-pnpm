import { Injectable } from '@angular/core';

import store2 from 'store2';

import { CONTINUE_WATCHING_KEY, MINE_WATCHED_COLLECTION_KEY } from '@/app/config';

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

  public addMineWatchedCollectionItem(item: ITVMovie): void {
    const mineWatchedCollectionLists = this.getMineWatchedCollectionLists();

    if (mineWatchedCollectionLists.some((val) => (val.media_type === item.media_type && val.id === item.id))) {
      return;
    }

    store2.add(MINE_WATCHED_COLLECTION_KEY, [item]);
  }

  public getMineWatchedCollectionLists(): ITVMovie[] {
    const mineWatchedCollectionLists = store2.get(MINE_WATCHED_COLLECTION_KEY);

    return mineWatchedCollectionLists || [];
  }

  public updateMineWatchedCollectionLists(item: ITVMovie): void {
    const mineWatchedCollectionLists = this.getMineWatchedCollectionLists();

    const index = mineWatchedCollectionLists.findIndex((val) => (val.media_type === item.media_type && val.id === item.id));

    if (index === -1) {
      store2.add(MINE_WATCHED_COLLECTION_KEY, [item]);

      return;
    }

    mineWatchedCollectionLists.splice(index, 1);

    store2.set(MINE_WATCHED_COLLECTION_KEY, mineWatchedCollectionLists);
  }
}
