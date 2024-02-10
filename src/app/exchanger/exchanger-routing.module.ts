import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangerComponent } from './pages/currency-exchanger/currency-exchanger.component';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';
import { ExchangerContainerComponent } from './pages/exchanger-container/exchanger-container.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangerContainerComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        component: CurrencyExchangerComponent
      },
      {
        path: ':type',
        component: CurrencyDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangerRoutingModule { }
