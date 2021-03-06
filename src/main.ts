import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
export function getApiUrl(): string {
  return "https://magayaapi.azurewebsites.net/";
}
const providers = [
  { provide: 'API_URL', useFactory: getApiUrl, deps: []}
];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
