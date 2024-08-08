import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerDetailsComponent } from './burger-details.component';

describe('BurgerDetailsComponent', () => {
  let component: BurgerDetailsComponent;
  let fixture: ComponentFixture<BurgerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurgerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
