import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnterpriseFormComponent } from './forms/enterprise-form/enterprise-form.component';

@NgModule({
  declarations: [
    EnterpriseFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EnterpriseFormComponent
  ]
})
export class ComponentsModule { }
