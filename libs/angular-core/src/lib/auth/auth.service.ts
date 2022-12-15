import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Storage } from '../../utils/storage.utils';
import { AuthUtils } from './auth.utils';
import { environment } from '@int-garage-management-monorepo/environments';

@Injectable()
export class AuthService {
  private _authenticated = false;

  constructor(private _httpClient: HttpClient) {}

  set accessToken(token: string) {
    Storage.set(environment.KEY_LOCAL_STORAGE, token);
  }

  get accessToken(): string {
    const accessToken = Storage.get(environment.KEY_LOCAL_STORAGE);
    if (!accessToken) return '';
    return accessToken;
  }

  signInUsingToken(): Observable<boolean> {
    const decoded = AuthUtils._decodeToken(this.accessToken);

    return of(true);
    // return combineLatest()
  }

  signOut(): Observable<any> {
    Storage.remove(environment.KEY_LOCAL_STORAGE);
    Storage.clear();

    this._authenticated = false;

    return of(true);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    if (this._authenticated) return of(true);

    if (!this.accessToken) return of(false);

    if (AuthUtils.isTokenExpired(this.accessToken)) return of(false);

    return this.signInUsingToken();
  }
}
