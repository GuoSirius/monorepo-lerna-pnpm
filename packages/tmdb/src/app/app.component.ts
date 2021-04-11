import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { ITVMovie } from './interface/ITVMovie';

import { IndexService } from './service/index.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [IndexService, StorageService],
})
export class AppComponent {
  public keywords: any;
  public searching = false;
  public searchFailed = false;

  constructor(private indexApi: IndexService, private storage: StorageService, private router: Router) {}

  public ngModelChangeHandler(keywords: string): void {
    this.indexApi.search(keywords).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })).subscribe();
  }

  public search: OperatorFunction<string, readonly ITVMovie[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term) =>
        this.indexApi.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })),
      ),
      tap(() => this.searching = false),
    )

  public selectItemHandler( e: NgbTypeaheadSelectItemEvent ): void {
    const { router, storage } = this;
    const { item } = e;
    const { id, media_type } = item;

    storage.addContinueWatchingItem(item);

    router.navigateByUrl(`/watch/${media_type}/${id}`);
  }

  public formatter(item: ITVMovie): string {
    return item.name;
  }
}
