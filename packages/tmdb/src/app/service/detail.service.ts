import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BASE_URL } from '@/app/config';

import { ITVMovie } from '@/app/interface/ITVMovie';

@Injectable({
  providedIn: 'root',
})
export class DetailService {

  constructor(private httpClient: HttpClient) {}

  // MovieDetail

  // TVShowDetail

  // RecommendedMovies
  public getRecommendedMoviesLists(id: number, path = '/recommendmv'): Observable<ITVMovie[]> {
    const { httpClient } = this;

    let params = new HttpParams();

    params = params.set('id', id.toString());

    return httpClient
      .get<Record<string, ITVMovie[]>>(`${BASE_URL}${path}`, { params }).pipe(
        map((response) => response.res),
      );
  }

  // SimilarMovies
  public getSimilarMoviesLists(id: number): Observable<ITVMovie[]> {
    return this.getRecommendedMoviesLists(id, '/similarmv');
  }

  // RecommendedTVShows
  public getRecommendedTVShowsLists(id: number): Observable<ITVMovie[]> {
    return this.getRecommendedMoviesLists(id, '/recommendtv');
  }

  // SimilarTVShows
  public getSimilarTVShowsLists(id: number): Observable<ITVMovie[]> {
    return this.getRecommendedMoviesLists(id, '/similartv');
  }
}
