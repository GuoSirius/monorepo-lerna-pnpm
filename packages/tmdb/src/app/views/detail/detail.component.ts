import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITVMovie, MediaType } from '@/app/interface/ITVMovie';

import { DetailService } from '@/app/service/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailService],
})
export class DetailComponent implements OnInit {
  public recommendedLists: ITVMovie[] = [];
  public similarLists: ITVMovie[] = [];
  public mediaType!: MediaType;

  constructor(
    private detailApi: DetailService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const { route } = this;

    route.params.subscribe((params) => {
      const { id, mediaType } = params;

      this.mediaType = mediaType;

      console.log(params);

      this.getDetail();
      this.getRecommendedLists(id, mediaType);
      this.getSimilarLists(id, mediaType);
    });
  }

  // 获取 详情
  public getDetail(): void {
    const { route } = this;

    route.params.subscribe((params) => {
      // this.name = params['name'];
      console.log(params)
    });
  }

  // 获取 推荐 列表
  public getRecommendedLists(id: number, mediaType: MediaType): void {
    if (mediaType === 'movie') {
      return this.getRecommendedMoviesLists(id);
    }

    this.getRecommendedTVShowsLists(id);
  }

  // 获取 相似 列表
  public getSimilarLists(id: number, mediaType: MediaType): void {
    if (mediaType === 'movie') {
      return this.getSimilarMoviesLists(id);
    }

    this.getSimilarTVShowsLists(id);
  }

  // 获取 推荐电影 列表
  public getRecommendedMoviesLists(id: number): void {
    const { detailApi } = this;

    detailApi.getRecommendedMoviesLists(id).subscribe((lists) => {
      this.recommendedLists = lists;
    });
  }

  // 获取 相似电影 列表
  public getSimilarMoviesLists(id: number): void {
    const { detailApi } = this;

    detailApi.getSimilarMoviesLists(id).subscribe((lists) => {
      this.similarLists = lists;
    });
  }

  // 获取 推荐脱口秀 列表
  public getRecommendedTVShowsLists(id: number): void {
    const { detailApi } = this;

    detailApi.getRecommendedTVShowsLists(id).subscribe((lists) => {
      this.recommendedLists = lists;
    });
  }

  // 获取 相似脱口秀 列表
  public getSimilarTVShowsLists(id: number): void {
    const { detailApi } = this;

    detailApi.getSimilarTVShowsLists(id).subscribe((lists) => {
      this.similarLists = lists;
    });
  }
}
