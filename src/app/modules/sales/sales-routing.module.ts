import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SellProductComponent } from './sell-product/sell-product.component';

const routes: Routes = [
  { path: 'index', component: SaleListComponent },
  { path: 'create-order', component: SellProductComponent },
  { path: '', pathMatch: "full", redirectTo: "index" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
