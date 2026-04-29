import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private titleSubject = new BehaviorSubject<string>('Processing...');
  public title$ = this.titleSubject.asObservable();

  private subtitleSubject = new BehaviorSubject<string>('Please wait a moment');
  public subtitle$ = this.subtitleSubject.asObservable();

  show(title: string = 'Processing...', subtitle: string = 'Please wait a moment') {
    this.titleSubject.next(title);
    this.subtitleSubject.next(subtitle);
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
