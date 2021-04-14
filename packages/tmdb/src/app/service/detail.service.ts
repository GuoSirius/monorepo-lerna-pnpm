import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BASE_URL, DEFAULT_PLAYER_INFORMATION, VIDEO_TYPE_ORDER_LISTS } from '@/app/config';

import { ICastCrew, ICastCrewDetail, IPlayerInformation, IReview, IShareDetail, ITVMovieDetail } from '@/app/interface/ITVMoveDetail';
import { ITVMovie } from '@/app/interface/ITVMovie';

@Injectable({
  providedIn: 'root',
})
export class DetailService {

  constructor(private httpClient: HttpClient) {}

  // MoviePlayerInformation
  public getMoviePlayerInformation(id: number, path = '/mv'): Observable<IPlayerInformation> {
    return this.getRecommendedMoviesLists<IPlayerInformation>(id, path).pipe(
      filter((item) => {
        console.log('filter', item);
        return VIDEO_TYPE_ORDER_LISTS.includes(item.type);
      }),
      map((item) => {
        console.log('map', item);
        return item || DEFAULT_PLAYER_INFORMATION;
      }),
    );
  }

  // MovieDetail
  public getMovieDetail(id: number): Observable<ITVMovieDetail> {
    return this.getRecommendedMoviesLists(id, '/mvdetails');
  }

  // MovieReview
  public getMovieReviewLists(id: number): Observable<IReview[]> {
    return this.getRecommendedMoviesLists(id, '/mvreviews');
  }

  // MovieCastCrew
  public getMovieCastCrewLists(id: number): Observable<ICastCrew[]> {
    return this.getRecommendedMoviesLists(id, '/mvcast');
  }

  // RecommendedMovies
  public getRecommendedMoviesLists<T = ITVMovie[]>(id: number, path = '/recommendmv'): Observable<T> {
    const { httpClient } = this;

    let params = new HttpParams();

    params = params.set('id', id.toString());

    return httpClient
      .get<Record<string, T>>(`${BASE_URL}${path}`, { params }).pipe(
        map((response) => response.res),
      );
  }

  // SimilarMovies
  public getSimilarMoviesLists(id: number): Observable<ITVMovie[]> {
    return this.getRecommendedMoviesLists(id, '/similarmv');
  }

  // TVShowPlayerInformation
  public getTVShowPlayerInformation(id: number): Observable<IPlayerInformation> {
    return this.getMoviePlayerInformation(id, '/tv');
  }

  // TVShowDetail
  public getTVShowDetail(id: number): Observable<ITVMovieDetail> {
    return this.getRecommendedMoviesLists(id, '/tvdetails');
  }

  // TVShowReview
  public getTVShowReviewLists(id: number): Observable<IReview[]> {
    return this.getRecommendedMoviesLists(id, '/tvreviews');
  }

  // TVShowCastCrew
  public getTVShowCastCrewLists(id: number): Observable<ICastCrew[]> {
    return this.getRecommendedMoviesLists(id, '/tvcast');
  }

  // RecommendedTVShows
  public getRecommendedTVShowsLists(id: number): Observable<ITVMovie[]> {
    return this.getRecommendedMoviesLists(id, '/recommendtv');
  }

  // SimilarTVShows
  public getSimilarTVShowsLists(id: number): Observable<ITVMovie[]> {
    return this.getRecommendedMoviesLists(id, '/similartv');
  }

  // CastCrewDetail
  public getCastCrewDetail(id: number): Observable<ICastCrewDetail> {
    return this.getRecommendedMoviesLists(id, '/castdetail');
  }

  // ShareDetail
  public getShareDetail(id: number): Observable<IShareDetail> {
    return this.getRecommendedMoviesLists(id, '/castexternal');
  }
}
