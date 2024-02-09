import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

import { MainHeaderComponent } from './components/header/components/main-header/main-header.component';

import { LogoComponent } from './components/header/components/logo/logo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Intercepter } from '../interceptors/interceptor';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Intercepter, multi: true },
  ],
  declarations: [
    HeaderComponent,
    MainContentComponent,
    LayoutPageComponent,
    MainHeaderComponent,
    LogoComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [],
})
export class LayoutModule {}
