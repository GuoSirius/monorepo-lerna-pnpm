import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss'],
})
export class MineComponent implements OnInit {
  public watchLists = [];

  constructor() { }

  public ngOnInit(): void {
  }

}
