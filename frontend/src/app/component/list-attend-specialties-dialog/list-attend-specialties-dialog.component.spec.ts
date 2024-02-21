import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendSpecialtiesDialogComponent } from './list-attend-specialties-dialog.component';

describe('ListAttendSpecialtiesDialogComponent', () => {
  let component: ListAttendSpecialtiesDialogComponent;
  let fixture: ComponentFixture<ListAttendSpecialtiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAttendSpecialtiesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttendSpecialtiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
