import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ITVMovie } from '@/app/interface/ITVMovie';

import { IndexService } from '@/app/service/index.service';
import { StorageService } from '@/app/service/storage.service';

import { CURRENTLY_PLAYING_INTERVAL } from './constant';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.scss' ],
  providers: [IndexService, StorageService],
})
export class IndexComponent implements OnInit {
  public CURRENTLY_PLAYING_INTERVAL = CURRENTLY_PLAYING_INTERVAL;
  public currentltPlayingLists: ITVMovie[] = [];
  public continueWatchingLists: ITVMovie[] = [];
  public popularMovieLists: ITVMovie[] = [];
  public topRatedMovieLists: ITVMovie[] = [];
  public trendingMovieLists: ITVMovie[] = [];
  public popularTVShowLists: ITVMovie[] = [];
  public topRatedTVShowLists: ITVMovie[] = [];
  public trendingTVShowLists: ITVMovie[] = [];

  constructor(private indexApi: IndexService, private storage: StorageService, private router: Router) {}

  public ngOnInit(): void {
    this.getCurrentlyPlayingLists();

    this.getContinueWatchingLists();

    this.getPopularMoviesLists();
    this.getTopRatedMoviesLists();
    this.getTrendingMoviesLists();

    this.getPopularTVShowsLists();
    this.getTopRatedTVShowsLists();
    this.getTrendingTVShowsLists();
  }

  public clickCurrentlyPlayingHandler(item: ITVMovie): void {
    const { router, storage } = this;
    const { id } = item;

    item.media_type = 'movie';

    storage.addContinueWatchingItem(item);

    router.navigateByUrl(`/watch/movie/${id}`);
  }

  // 获取 当前正在播放列表
  public getCurrentlyPlayingLists(): void {
    const { indexApi } = this;

    indexApi.getCurrentlyPlayingLists().subscribe((lists) => {
      this.currentltPlayingLists = lists;
    });
  }

  // 获取 已观看列表
  public getContinueWatchingLists(): void {
    const { storage } = this;

    this.continueWatchingLists = storage.getContinueWatchingLists();
  }

  // 获取 受欢迎 电影 列表
  public getPopularMoviesLists(): void {
    const { indexApi } = this;

    indexApi.getPopularMoviesLists().subscribe((lists) => {
      this.popularMovieLists = lists;
    });
  }

  // 获取 好评 电影 列表
  public getTopRatedMoviesLists(): void {
    const { indexApi } = this;

    indexApi.getTopRatedMoviesLists().subscribe((lists) => {
      this.topRatedMovieLists = lists;
    });
  }

  // 获取 流行 电影 列表
  public getTrendingMoviesLists(): void {
    const { indexApi } = this;

    indexApi.getTrendingMoviesLists().subscribe((lists) => {
      this.trendingMovieLists = lists;
    });
  }

  // 获取 受欢迎 脱口秀 列表
  public getPopularTVShowsLists(): void {
    const { indexApi } = this;

    indexApi.getPopularTVShowsLists().subscribe((lists) => {
      this.popularTVShowLists = lists;
    });
  }

  // 获取 好评 脱口秀 列表
  public getTopRatedTVShowsLists(): void {
    const { indexApi } = this;

    indexApi.getTopRatedTVShowsLists().subscribe((lists) => {
      this.topRatedTVShowLists = lists;
    });
  }

  // 获取 流行 脱口秀 列表
  public getTrendingTVShowsLists(): void {
    const { indexApi } = this;

    indexApi.getTrendingTVShowsLists().subscribe((lists) => {
      this.trendingTVShowLists = lists;
    });
  }
}
