import { Component, Input, OnInit } from '@angular/core';

import { IPlayerInformation } from '@/app/interface/ITVMoveDetail';

let apiLoaded = false;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() public playerInformation!: IPlayerInformation;

  public videoId = ''

  constructor() {}

  public ngOnInit(): void {
    this.getViedoId();

    this.initialziePlayer();
  }

  // 初始化 播放器
  public initialziePlayer(): void {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at https://developers.google.com/youtube/iframe_api_reference#Getting_Started

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      apiLoaded = true;
    }
  }

  // 获取 视频 ID
  public getViedoId(): void {
    const { playerInformation } = this;
    const { videoId } = playerInformation;

    this.videoId = videoId
  }
}
