import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authSignInRoutes } from './sign-in.routing';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(authSignInRoutes)],
})
export class AuthSignInModule {}
