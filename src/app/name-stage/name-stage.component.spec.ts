import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameStageComponent } from './name-stage.component';

describe('NameStageComponent', () => {
  let component: NameStageComponent;
  let fixture: ComponentFixture<NameStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
