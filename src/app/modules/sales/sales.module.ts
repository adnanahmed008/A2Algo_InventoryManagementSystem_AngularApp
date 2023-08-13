import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SaleListComponent,
    SellProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
