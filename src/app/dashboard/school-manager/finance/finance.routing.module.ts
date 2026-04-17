import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { BankConnectionComponent } from './bank-connection/bank-connection.component';
import { VirtualAccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  { path: "", component: FeeTypesComponent },
  { path: "invoices", component: InvoicesComponent },
  { path: "accounts", component: VirtualAccountsComponent },
  { path: "connection", component: BankConnectionComponent },
]

@NgModule({
  imports: [],
  exports: [],
  providers: [provideRouter(routes)]
})
export class FinanceRoutingModule {
  
}
