import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './Services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.toLowerCase().includes('login')) {
      this.loaderService.show('Signing you in', 'Verifying credentials...');
    } else {
      this.loaderService.show('Processing...', 'Please wait a moment');
    }
    
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
