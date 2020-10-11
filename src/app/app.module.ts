import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ApiInterceptor } from './api-interceptor';
import { AppComponent } from './app.component';
import { KeycloakService, KEYCLOAK_CONFIG } from './keycloak.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), HttpClientModule],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloakService: KeycloakService) => () => keycloakService.init(),
      deps: [KeycloakService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: KEYCLOAK_CONFIG,
      useValue: environment.keycloak,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
