import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerOrderComponent } from './burger-order.component';

describe('BurgerOrderComponent', () => {
  let component: BurgerOrderComponent;
  let fixture: ComponentFixture<BurgerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurgerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
