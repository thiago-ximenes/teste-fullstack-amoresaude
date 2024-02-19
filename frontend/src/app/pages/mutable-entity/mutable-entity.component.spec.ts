import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutableEntityComponent } from './mutable-entity.component';

describe('MutableEntityComponent', () => {
  let component: MutableEntityComponent;
  let fixture: ComponentFixture<MutableEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutableEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutableEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
