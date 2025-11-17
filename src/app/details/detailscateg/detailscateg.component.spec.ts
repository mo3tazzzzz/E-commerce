import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscategComponent } from './detailscateg.component';

describe('DetailscategComponent', () => {
  let component: DetailscategComponent;
  let fixture: ComponentFixture<DetailscategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailscategComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
