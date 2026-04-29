import { Component } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="loaderService.loading$ | async">
      <div class="loader-card">
        <div class="animation-container">
          <div class="ripple-ring"></div>
          <div class="ripple-ring delay-1"></div>
          <div class="ripple-ring delay-2"></div>
          <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#3b82f6"/>
              <rect x="15" y="14" width="6" height="6" rx="1" fill="#2563eb"/>
              <path d="M18 13C17.4477 13 17 13.4477 17 14V15H19V14C19 13.4477 18.5523 13 18 13Z" fill="#1e40af"/>
            </svg>
          </div>
        </div>
        
        <h2 class="loader-title">{{ loaderService.title$ | async }}</h2>
        <p class="loader-subtitle">{{ loaderService.subtitle$ | async }}</p>
        
        <div class="progress-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    }

    .loader-card {
      background: white;
      padding: 40px 30px 0;
      border-radius: 28px;
      width: 320px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
      position: relative;
      overflow: hidden;
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animation-container {
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ripple-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid #3b82f6;
      border-radius: 50%;
      opacity: 0;
      animation: ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .delay-1 { animation-delay: 0.5s; }
    .delay-2 { animation-delay: 1s; }

    .icon-wrapper {
      width: 50px;
      height: 50px;
      z-index: 2;
    }

    .loader-title {
      font-family: 'Inter', sans-serif;
      color: #1e3a8a;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .loader-subtitle {
      font-family: 'Inter', sans-serif;
      color: #64748b;
      font-size: 14px;
      margin-bottom: 35px;
    }

    .progress-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #f1f5f9;
    }

    .progress-bar {
      height: 100%;
      background: #3b82f6;
      width: 30%;
      animation: progressMove 1.5s infinite ease-in-out;
    }

    @keyframes ripple {
      0% { transform: scale(0.5); opacity: 0; }
      50% { opacity: 0.3; }
      100% { transform: scale(1.2); opacity: 0; }
    }

    @keyframes progressMove {
      0% { left: -30%; }
      100% { left: 100%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
