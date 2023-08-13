import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private $SubscriberProductDetail: Subscription = new Subscription;

  // #region | Product Info |
  private productId!: string;
  public product!: IProduct;
  // #endregion

  public isLoadingProduct: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value: ParamMap) => {
      this.productId = value.get("id") as string;
      this.getProductDetail();
    });
  }

  getProductDetail() {
    this.isLoadingProduct = true;
    this.$SubscriberProductDetail = this.srvIMSAPI.getProduct(this.productId).subscribe({
      next: product => {
        if(!product)
        this.router.navigate([".."]);

        this.product = product;
        this.isLoadingProduct = false;
      },
      error: error => {
        this.isLoadingProduct = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberProductDetail)
      this.$SubscriberProductDetail.unsubscribe();
  }
}
