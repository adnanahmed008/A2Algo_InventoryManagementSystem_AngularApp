import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductNomenclature, ISaleOrder } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent implements OnInit, OnDestroy {
  private $SubscriberProductNomenclatures: Subscription = new Subscription;
  private $SubscriberSellProduct: Subscription = new Subscription;

  public frmSellProduct: FormGroup = new FormGroup({
    productId: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.max(10000)])
  });

  public isSellingProduct: boolean = false;

  public lstProductNomenclatures: IProductNomenclature[] = [];

  constructor(
    private router: Router,
    private srvIMSAPI: ImsApiService
  ) {

  }

  ngOnInit(): void {
    this.getProductNomenclatures();
  }

  getProductNomenclatures() {
    this.$SubscriberProductNomenclatures = this.srvIMSAPI.getProductNomenclatures().subscribe({
      next: (nomenclatures: IProductNomenclature[]) => {
        this.lstProductNomenclatures = nomenclatures;
      },
      error: error => {

      }
    });
  }

  getNewProductSaleOrderData(): ISaleOrder {
    return <ISaleOrder>{
      ProductId: this.frmSellProduct.get("productId")?.value,
      Quantity: this.frmSellProduct.get("quantity")?.value
    };
  }

  onSellProductFormSubmit() {
    if (!this.frmSellProduct.valid) {
      this.frmSellProduct.markAllAsTouched();
      return;
    }

    this.isSellingProduct = true;
    let saleOrder = this.getNewProductSaleOrderData();

    this.$SubscriberSellProduct = this.srvIMSAPI.createSaleOrder(saleOrder).subscribe({
      next: resp => {
        this.frmSellProduct.reset();
        this.isSellingProduct = false;

        Swal.fire({
          title: 'Success',
          text: 'The sale order created successsfully',
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Close"
        }).then(result => {
          if (result.isConfirmed)
            this.router.navigate(["/sales"]);
        });
      },
      error: resp => {
        this.isSellingProduct = false;

        if (typeof resp === "object") {
          if (resp.error == "QUANTITY_EXCEEDS_STOCK")
            Swal.fire({
              title: 'Error!',
              text: 'The requested quantity is not available',
              icon: 'error',
              showConfirmButton: true,
              showCancelButton: false,
              confirmButtonText: "Close"
            });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberSellProduct)
      this.$SubscriberSellProduct.unsubscribe();

    if (this.$SubscriberProductNomenclatures)
      this.$SubscriberProductNomenclatures.unsubscribe();
  }
}
