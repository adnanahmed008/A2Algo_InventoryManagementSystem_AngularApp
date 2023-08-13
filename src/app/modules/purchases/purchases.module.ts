import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PurchaseListComponent,
    PurchaseProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PurchasesRoutingModule
  ]
})
export class PurchasesModule { }
