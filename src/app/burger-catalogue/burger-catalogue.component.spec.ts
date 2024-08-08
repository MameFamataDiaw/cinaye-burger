import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerCatalogueComponent } from './burger-catalogue.component';

describe('BurgerCatalogueComponent', () => {
  let component: BurgerCatalogueComponent;
  let fixture: ComponentFixture<BurgerCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerCatalogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BurgerCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
