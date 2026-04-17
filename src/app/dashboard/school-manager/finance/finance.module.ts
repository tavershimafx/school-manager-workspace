import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FinanceRoutingModule } from './finance.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '@modals/modals.module';
import DirectivesModule from '@directives/directives.module';
import PipesModule from '@pipes/pipes.module';
import { InvoicesComponent } from './invoices/invoices.component';
import { FeeTypesComponent } from './fee-types/fee-types.component';
import { BankConnectionComponent } from './bank-connection/bank-connection.component';
import { VirtualAccountsComponent } from './accounts/accounts.component';
import { NewConnectionModal } from './new-connection/new-connection.component';
import { CreateFeeTypeModal } from './create-feetype/create-feetype.component';
import { CreateInvoiceModal } from './create-invoice/create-invoice.component';
import { CreateAccountsModal } from './create-accounts/create-accounts.component';

const components = [
  FeeTypesComponent,
  InvoicesComponent,
  VirtualAccountsComponent,
  BankConnectionComponent,
  NewConnectionModal,
  CreateFeeTypeModal,
  CreateInvoiceModal,
  CreateAccountsModal
]

@NgModule({
  declarations: [...components],
  imports: [RouterModule,
    FinanceRoutingModule, 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    DirectivesModule,
    PipesModule
    ],
  exports: [],
  providers: [],
})
export class FinanceModule {
  
}
