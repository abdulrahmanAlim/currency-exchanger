import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

let standardRoutes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'exchanger', pathMatch: 'full' },
      {
        path: 'exchanger',
        loadChildren: () =>
          import('@exchanger/exchanger.module').then((m) => m.ExchangerModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(standardRoutes) ],
  exports: [RouterModule],
  providers: [],
})
export class LayoutRoutingModule {}
