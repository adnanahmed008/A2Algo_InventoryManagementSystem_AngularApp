import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';

const routes: Routes = [
  { path: 'index', component: PurchaseListComponent },
  { path: 'create-order', component: PurchaseProductComponent },
  { path: '', pathMatch: "full", redirectTo: "index" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
