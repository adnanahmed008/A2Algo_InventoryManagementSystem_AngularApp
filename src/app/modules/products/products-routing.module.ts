import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: 'index', component: ProductListComponent },
  { path: 'create', component: CreateProductComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: ':id', component: ProductDetailComponent },
  { path: '', pathMatch: "full", redirectTo: "index" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }