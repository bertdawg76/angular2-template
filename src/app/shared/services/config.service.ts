import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()
export class APIConfigService {
  public baseUrl =            environment.apiHost;
  public apiUrl =             this.createUrl('api');
  public authTokenUrl =       this.createUrl('api-token-auth');
  public oauthUrl =           this.createUrl('social');
  public changePasswordUrl =  this.createUrl('reset');
  public resetPasswordUrl =   this.createUrl('reset-password');
  public emailVerifyUrl =     this.createUrl('verify');
  public impersonateUrl =     this.createWithApiUrl('users/impersonate');
  public createUrl (str: string): string { return `${this.baseUrl}/${str}`; }
  public createWithApiUrl (str: string): string { return `${this.baseUrl}/api/${str}`; }
};
