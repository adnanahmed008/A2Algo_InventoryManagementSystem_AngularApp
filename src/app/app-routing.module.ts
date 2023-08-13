import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "products", loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: "sales", loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule) },
  { path: "purchases", loadChildren: () => import('./modules/purchases/purchases.module').then(m => m.PurchasesModule) },
  { path: "", pathMatch: "full", redirectTo: "/products" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
