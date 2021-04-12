import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICastCrewDetail, IShareDetail } from '@/app/interface/ITVMoveDetail';

import { DetailService } from '@/app/service/detail.service';

@Component({
  selector: 'app-cast-crew-modal',
  templateUrl: './cast-crew-modal.component.html',
  styleUrls: ['./cast-crew-modal.component.scss'],
  providers: [DetailService],
})
export class CastCrewModalComponent implements OnInit {
  @Input() public id!: number;
  @Input() public avatarUrl!: string;

  public share!: IShareDetail;
  public detail!: ICastCrewDetail;

  constructor(private detailApi: DetailService, private activeModal: NgbActiveModal) {}

  public ngOnInit(): void {
    const { id } = this;

    this.getDetail(id);
    this.getShareDetail(id);
  }

  public closeHandler(type = 'close'): void {
    const { activeModal } = this;

    if (type === 'dismiss') {
      activeModal.dismiss('Cross click');

      return;
    }

    activeModal.close('Close click');
  }

  // 获取 详情
  public getDetail(id: number): void {
    const { detailApi } = this;

    detailApi.getCastCrewDetail(id).subscribe((data) => {
      this.detail = data;
    });
  }

  // 获取 分享详情
  public getShareDetail(id: number): void {
    const { detailApi } = this;

    detailApi.getShareDetail(id).subscribe((data) => {
      this.share = data;
    });
  }
}
