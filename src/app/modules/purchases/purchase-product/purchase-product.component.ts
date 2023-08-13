import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductNomenclature, IPurchaseOrder } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.scss']
})
export class PurchaseProductComponent implements OnInit, OnDestroy {
  private $SubscriberProductNomenclatures: Subscription = new Subscription;
  private $SubscriberPurchaseProduct: Subscription = new Subscription;

  public frmPurchaseProduct: FormGroup = new FormGroup({
    productId: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.max(10000)])
  });

  public isPurchasingProduct: boolean = false;

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

  getNewPurchaseOrderData(): IPurchaseOrder {
    return <IPurchaseOrder>{
      ProductId: this.frmPurchaseProduct.get("productId")?.value,
      Quantity: this.frmPurchaseProduct.get("quantity")?.value
    };
  }

  onPurchaseProductFormSubmit() {
    if (!this.frmPurchaseProduct.valid) {
      this.frmPurchaseProduct.markAllAsTouched();
      return;
    }

    this.isPurchasingProduct = true;
    let purchaseOrder = this.getNewPurchaseOrderData();
    console.log(purchaseOrder);

    this.$SubscriberPurchaseProduct = this.srvIMSAPI.createPurchaseOrder(purchaseOrder).subscribe({
      next: resp => {
        this.frmPurchaseProduct.reset();
        this.isPurchasingProduct = false;

        Swal.fire({
          title: 'Success',
          text: 'The purchase order created successsfully',
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Close"
        }).then(result => {
          if (result.isConfirmed)
            this.router.navigate(["/purchases"]);
        });
      },
      error: resp => {
        this.isPurchasingProduct = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberPurchaseProduct)
      this.$SubscriberPurchaseProduct.unsubscribe();

    if (this.$SubscriberProductNomenclatures)
      this.$SubscriberProductNomenclatures.unsubscribe();
  }

}
