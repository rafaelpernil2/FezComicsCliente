import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as AppConfig from './AppConfig.json';

@Injectable()
export class AppSettings {
     json: any = AppConfig;
}
