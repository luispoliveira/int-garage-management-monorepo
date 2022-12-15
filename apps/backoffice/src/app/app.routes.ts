import { Route } from '@angular/router';
import { NoAuthGuard } from '@int-garage-management-monorepo/angular-core';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./pages/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
    ],
  },
];
