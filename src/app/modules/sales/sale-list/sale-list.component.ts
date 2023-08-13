import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISale } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit, OnDestroy {
  private $SubscriberGetSales: Subscription = new Subscription;

  public lstSales: ISale[] = [];
  public isFetchingSales: boolean = true;

  constructor(
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngOnInit() {
    this.refreshSalesList();
  }

  refreshSalesList() {
    this.isFetchingSales = true;
    this.$SubscriberGetSales = this.srvIMSAPI.getSales().subscribe({
      next: (products: ISale[]) => {
        this.lstSales = products;
        this.isFetchingSales = false;
      },
      error: error => {
        this.isFetchingSales = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberGetSales)
      this.$SubscriberGetSales.unsubscribe();
  }
}
