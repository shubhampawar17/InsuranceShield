import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { FooterOtherComponent } from './footer-other/footer-other.component';
import { PremiumShareComponent } from './premium-share/premium-share.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { PageHeaderComponent } from './page-header/page-header.component';



@NgModule({
  declarations: [

    AlertComponent,
     FooterComponent,
     FooterOtherComponent,
     PremiumShareComponent,
     BackButtonComponent,
     PageHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent, FooterComponent, FooterOtherComponent, BackButtonComponent, PageHeaderComponent]
})
export class SharedModule { }
