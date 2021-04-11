import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BASE_URL } from '@/app/config';

import { ITVMovie } from '@/app/interface/ITVMovie';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  private httpParams: HttpParams;

  constructor(private httpClient: HttpClient) {
    this.httpParams = new HttpParams();
  }

  // 搜索
  public search(name: string): Observable<ITVMovie[]> {
    const { httpClient, httpParams } = this;

    if (name === '') {
      return of([]);
    }

    const params = httpParams.set('keyword', name);

    return httpClient
      .get<Record<string, ITVMovie[]>>(`${BASE_URL}/search`, { params }).pipe(
        map((response) => response.res),
      );
  }

  // CurrentlyPlaying
  public getCurrentlyPlayingLists(path = '/topmv'): Observable<ITVMovie[]> {
    const { httpClient } = this;

    return httpClient
      .get<Record<string, ITVMovie[]>>(`${BASE_URL}${path}`).pipe(
        map((response) => response.res),
      );
  }

  // PopularMovies
  public getPopularMoviesLists(): Observable<ITVMovie[]> {
    return this.getCurrentlyPlayingLists('/popularmv');
  }

  // TopRatedMovies
  public getTopRatedMoviesLists(): Observable<ITVMovie[]> {
    return this.getCurrentlyPlayingLists('/topratemv');
  }

  // TrendingMovies
  public getTrendingMoviesLists(): Observable<ITVMovie[]> {
    return this.getCurrentlyPlayingLists('/trendmv');
  }

  // PopularTVShows
  public getPopularTVShowsLists(): Observable<ITVMovie[]> {
    return this.getCurrentlyPlayingLists('/populartv');
  }

  // TopRatedTVShows
  public getTopRatedTVShowsLists(): Observable<ITVMovie[]> {
    return this.getCurrentlyPlayingLists('/topratetv');
  }

  // TrendingTVShows
  public getTrendingTVShowsLists(): Observable<ITVMovie[]> {
    return this.getCurrentlyPlayingLists('/trendtv');
  }
}
