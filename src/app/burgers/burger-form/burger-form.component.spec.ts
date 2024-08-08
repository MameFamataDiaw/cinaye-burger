import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerFormComponent } from './burger-form.component';

describe('BurgerFormComponent', () => {
  let component: BurgerFormComponent;
  let fixture: ComponentFixture<BurgerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurgerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
