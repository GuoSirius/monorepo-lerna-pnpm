import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastCrewModalComponent } from './cast-crew-modal.component';

describe('CastCrewModalComponent', () => {
  let component: CastCrewModalComponent;
  let fixture: ComponentFixture<CastCrewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastCrewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastCrewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
