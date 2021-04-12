import { Component, OnInit } from '@angular/core';

import { ITVMovie } from '@/app/interface/ITVMovie';

import { StorageService } from '@/app/service/storage.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss'],
  providers: [StorageService],
})
export class MineComponent implements OnInit {
  public watchCollectionLists: ITVMovie[] = [];

  constructor(private storage: StorageService) {}

  public ngOnInit(): void {
    this.getMineWatchedCollectionLists();
  }

  // 获取 观看收藏 列表
  public getMineWatchedCollectionLists(): void {
    const { storage } = this;

    this.watchCollectionLists = storage.getMineWatchedCollectionLists();
  }
}
