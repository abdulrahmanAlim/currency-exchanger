import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangerComponent } from './pages/currency-exchanger/currency-exchanger.component';
import { CurrencyDetailsComponent } from './pages/currency-details/currency-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'currency', pathMatch: 'full' },
  {
    path: 'currency',
    component: CurrencyExchangerComponent
  },
  {
    path: 'details/:type',
    component: CurrencyDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangerRoutingModule { }
