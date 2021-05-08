import { Inject, Injectable, InjectionToken } from '@angular/core';
import KeycloakInstance from 'keycloak-js';

const Keycloak: typeof KeycloakInstance = typeof window !== 'undefined' ? require('keycloak-js') : null;

export const KEYCLOAK_CONFIG = new InjectionToken<Keycloak.KeycloakConfig>('keycloak-config');

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private instance: Keycloak.KeycloakInstance;

  constructor(@Inject(KEYCLOAK_CONFIG) private keycloakConfig: Keycloak.KeycloakConfig) {}

  init(): Promise<void> {
    if (Keycloak === null) return null;

    return new Promise((resolve, reject) => {
      this.instance = Keycloak(this.keycloakConfig);
      this.instance
        .init({
          checkLoginIframe: false,
          onLoad: 'login-required',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        })
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  getToken(): string {
    return this.instance.token;
  }

  getRefreshToken(): string {
    return this.instance.refreshToken;
  }
}
