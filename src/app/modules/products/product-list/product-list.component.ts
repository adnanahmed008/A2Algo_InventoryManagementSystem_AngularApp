import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ImsApiService } from 'src/app/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private $SubscriberGetProducts: Subscription = new Subscription;
  private $SubscriberDeleteProducts: Subscription = new Subscription;

  public lstProducts: IProduct[] = [];
  public isFetchingProducts: boolean = true;

  constructor(
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngOnInit() {
    this.refreshProductList();
  }

  refreshProductList() {
    this.isFetchingProducts = true;
    this.$SubscriberGetProducts = this.srvIMSAPI.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.lstProducts = products;
        this.isFetchingProducts = false;
      },
      error: error => {
        this.isFetchingProducts = false;
      }
    });
  }

  onDeleteButtonClick(id: string) {
    this.$SubscriberDeleteProducts = this.srvIMSAPI.deleteProduct(id).subscribe(() => {
      this.refreshProductList();
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberGetProducts)
      this.$SubscriberGetProducts.unsubscribe();

    if (this.$SubscriberDeleteProducts)
      this.$SubscriberDeleteProducts.unsubscribe();
  }
}
