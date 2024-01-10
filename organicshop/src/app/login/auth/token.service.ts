import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  returnsToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  saveToken(token: string) {
    localStorage.setItem(KEY, token);
    document.cookie = `${KEY}=${token}; Secure; SameSite=None; path=/; domain=api.itsorganic.shop`;
  }

  deleteToken() {
    localStorage.removeItem(KEY);
  }

  hasToken() {
    return !!this.returnsToken();
  }
}
