import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// NGRX STORE
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffects } from './effects';
import * as fromAuth from './reducers';

// COMPONENTS
import { LoginFormComponent, LogoutConfirmationDialogComponent } from './components';
import { MaterialModule } from '@angular-ngrx/material';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
