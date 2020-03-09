import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components';
import { MaterialModule } from '@angular-ngrx/material';


export const COMPONENTS = [
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
