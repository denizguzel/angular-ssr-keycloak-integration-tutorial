import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject('keycloak-token') private token: string, private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token || this.keycloakService.getToken();

    const setHeaders = {};

    if (!request.headers.has('Authorization') && token) {
      setHeaders['Authorization'] = `Bearer ${token}`;
    }

    return next.handle(
      request.clone({
        setHeaders,
      }),
    );
  }
}
