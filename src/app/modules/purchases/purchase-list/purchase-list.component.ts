import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPurchase } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit, OnDestroy {
  private $SubscriberGetProducts: Subscription = new Subscription;

  public lstPurchases: IPurchase[] = [];
  public isFetchingPurchases: boolean = true;

  constructor(
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngOnInit() {
    this.refreshPurchaseList();
  }

  refreshPurchaseList() {
    this.isFetchingPurchases = true;
    this.$SubscriberGetProducts = this.srvIMSAPI.getPurchases().subscribe({
      next: (products: IPurchase[]) => {
        this.lstPurchases = products;
        this.isFetchingPurchases = false;
      },
      error: error => {
        this.isFetchingPurchases = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberGetProducts)
      this.$SubscriberGetProducts.unsubscribe();
  }
}
