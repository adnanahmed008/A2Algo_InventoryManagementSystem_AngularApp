import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ImsApiService } from 'src/app/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  private $SubscriberProductDetail: Subscription = new Subscription;
  private id!: string;

  public product!: IProduct;

  constructor(
    private route: ActivatedRoute,
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value: ParamMap) => {
      this.id = value.get("id") as string;
      this.getProductDetail();
    });
  }

  ngAfterViewInit(): void {
  }

  getProductDetail() {
    this.$SubscriberProductDetail = this.srvIMSAPI.getProduct(this.id).subscribe(product => {
      this.product = product;
    });
  }
}
