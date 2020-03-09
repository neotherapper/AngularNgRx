import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components';
import { MaterialModule } from '@angular-ngrx/material';
import { AuthRoutingModule } from '@angular-ngrx/auth/auth-routing.module';


export const COMPONENTS = [
  LoginFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
