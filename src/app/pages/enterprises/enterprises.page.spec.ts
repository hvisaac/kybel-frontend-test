import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterprisesPage } from './enterprises.page';

describe('EnterprisesPage', () => {
  let component: EnterprisesPage;
  let fixture: ComponentFixture<EnterprisesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnterprisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
