import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent {
  @Input() label = 'Back';
  @Input() ariaLabel = 'Back';
  @Input() className = '';
  @Input() fallbackUrl = '/';

  constructor(
    private readonly location: Location,
    private readonly router: Router
  ) {}

  onBack(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    this.router.navigateByUrl(this.fallbackUrl);
  }
}

