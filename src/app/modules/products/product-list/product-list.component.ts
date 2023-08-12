import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ImsApiService } from 'src/app/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit, OnDestroy {
  private $SubscriberGetProducts: Subscription = new Subscription;

  public lstProducts: IProduct[] = [];
  public isFetchingProducts: boolean = true;

  constructor(
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngAfterViewInit() {
    this.refreshProductList();
  }

  refreshProductList() {
    this.isFetchingProducts = true;
    this.$SubscriberGetProducts = this.srvIMSAPI.getProducts().subscribe(products => {
      this.lstProducts = products;
      this.isFetchingProducts = false;

      console.log(this.lstProducts);
    });
  }

  onDeleteButtonClick(id: string)
  {
    this.srvIMSAPI.deleteProduct(id).subscribe(() => {
      this.refreshProductList();
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberGetProducts)
      this.$SubscriberGetProducts.unsubscribe();
  }
}
