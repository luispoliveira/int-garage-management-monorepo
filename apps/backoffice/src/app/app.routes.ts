import { Route } from '@angular/router';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';

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
