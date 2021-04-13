import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICastCrew, IPlayerInformation, IReview, ITVMovieDetail } from '@/app/interface/ITVMoveDetail';
import { ITVMovie, MediaType } from '@/app/interface/ITVMovie';

import { DetailService } from '@/app/service/detail.service';
import { StorageService } from '@/app/service/storage.service';

import { CastCrewModalComponent } from '@/app/components/cast-crew-modal/cast-crew-modal.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailService, StorageService],
})
export class DetailComponent implements OnInit {
  public playerInformation!: IPlayerInformation;
  public detail!: ITVMovieDetail;
  public reviewLists: IReview[] = [];
  public castCrewLists: ICastCrew[] = [];
  public recommendedLists: ITVMovie[] = [];
  public similarLists: ITVMovie[] = [];
  public recommendedTitle!: string;
  public similarTitle!: string;
  public buttonText!: string;
  public mediaType!: MediaType;
  public hasAdded = false;
  public id!: number;
  public alertType = '';
  public alertMessage = '';

  constructor(
    private detailApi: DetailService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {}

  public ngOnInit(): void {
    const { route } = this;

    route.params.subscribe((params) => {
      const { id, mediaType } = params;

      this.id = id;
      this.mediaType = mediaType;

      this.setAttribute(mediaType);
      this.switchButtonStatus(id);

      this.getPlayerInformation(id, mediaType);
      this.getDetail(id, mediaType);

      this.getReviewLists(id, mediaType);
      this.getCastCrewLists(id, mediaType);

      this.getRecommendedLists(id, mediaType);
      this.getSimilarLists(id, mediaType);
    });
  }

  // 设置 属性
  private setAttribute(mediaType = this.mediaType): void {
    if (mediaType === 'movie') {
      this.recommendedTitle = 'Recommended Movies';
      this.similarTitle = 'Similar Movies';
    } else {
      this.recommendedTitle = 'Recommended TV Shows';
      this.similarTitle = 'Similar TV Shows';
    }
  }

  // 切换 按钮状态
  public switchButtonStatus(id = this.id): void {
    const { storage } = this;

    const watchCollectionLists = storage.getMineWatchedCollectionLists();

    this.hasAdded = watchCollectionLists.some((item) => id === item.id);

    if (this.hasAdded) {
      this.buttonText = 'Remove to Watchlist';
    } else {
      this.buttonText = 'Add to Watchlist';
    }
  }

  // 添加、删除 收藏
  public addRemoveHandler(): void {
    const { id, detail, mediaType, storage } = this;
    const { name, poster_path } = detail;

    const item = { id, name, poster_path, media_type: mediaType, backdrop_path: poster_path, mediaType };

    storage.updateMineWatchedCollectionLists(item);

    this.switchButtonStatus(id);
    this.showMessage();
  }

  // 消息提示
  public showMessage(): void {
    const { hasAdded } = this;

    if (hasAdded) {
      this.alertType = 'success';
      this.alertMessage = 'Added to watchlist';

      return;
    }

    this.alertType = 'danger';
    this.alertMessage = 'Removed to watchlist';
  }

  // 提示框 关闭
  public alertClosedHandler(): void {
    this.alertType = '';
    this.alertMessage = '';
  }

  // 参与人员 详情
  public castCrewClickedHandler(item: ICastCrew): void {
    const { modalService } = this;
    const { id, profile_path } = item;

    const modalRef = modalService.open(CastCrewModalComponent, { size: 'xl', scrollable: true });

    // modalRef.scrolla

    modalRef.componentInstance.id = id;
    modalRef.componentInstance.avatarUrl = profile_path;
  }

  // 获取 播放信息
  public getPlayerInformation(id: number, mediaType: MediaType): void {
    const { detailApi } = this;

    let playerInformation$;

    if (mediaType === 'movie') {
      playerInformation$ = detailApi.getMoviePlayerInformation(id);
    } else {
      playerInformation$ = detailApi.getTVShowPlayerInformation(id);
    }

    playerInformation$.subscribe((data) => {
      this.playerInformation = data;
    });
  }

  // 获取 详情
  public getDetail(id: number, mediaType: MediaType): void {
    const { detailApi } = this;

    let detail$;

    if (mediaType === 'movie') {
      detail$ = detailApi.getMovieDetail(id);
    } else {
      detail$ = detailApi.getTVShowDetail(id);
    }

    detail$.subscribe((data) => {
      this.detail = data;
    });
  }

  // 获取 评论列表
  public getReviewLists(id: number, mediaType: MediaType): void {
    const { detailApi } = this;

    let reviewLists$;

    if (mediaType === 'movie') {
      reviewLists$ = detailApi.getMovieReviewLists(id);
    } else {
      reviewLists$ = detailApi.getTVShowReviewLists(id);
    }

    reviewLists$.subscribe((lists) => {
      this.reviewLists = lists;
    });
  }

  // 获取 参与人员列表
  public getCastCrewLists(id: number, mediaType: MediaType): void {
    const { detailApi } = this;

    let castCrewLists$;

    if (mediaType === 'movie') {
      castCrewLists$ = detailApi.getMovieCastCrewLists(id);
    } else {
      castCrewLists$ = detailApi.getTVShowCastCrewLists(id);
    }

    castCrewLists$.subscribe((lists) => {
      this.castCrewLists = lists;
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
