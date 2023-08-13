import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INewProduct, IProduct } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnDestroy {
  private $SubscriberCreateProduct: Subscription = new Subscription;
  private $SubscriberProductDetail: Subscription = new Subscription;

  // #region | Product Info |
  private productId!: string;
  public product!: IProduct;
  // #endregion

  public frmUpdateProduct: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    description: new FormControl("", [Validators.required, Validators.minLength(80)]),
    unitPrice: new FormControl("", [Validators.required, Validators.min(1)])
  });

  public isLoadingProduct: boolean = false;
  public isUpdatingProduct: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private srvIMSAPI: ImsApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((value: ParamMap) => {
      this.productId = value.get("id") as string;
      this.getProductDetail();
    });
  }

  getProductDetail() {
    this.isLoadingProduct = true;
    this.$SubscriberProductDetail = this.srvIMSAPI.getProduct(this.productId).subscribe({
      next: (product: IProduct) => {
        this.updateFormValues(product);
        this.isLoadingProduct = false;
      },
      error: () => {
        this.isLoadingProduct = false;
      }
    });
  }

  updateFormValues(product: IProduct) {
    this.frmUpdateProduct.setValue({
      name: product.Name,
      description: product.Description,
      unitPrice: product.UnitPrice
    });
  }

  getUpdatedProductData(): INewProduct {
    return <INewProduct>{
      Name: this.frmUpdateProduct.get("name")?.value,
      Description: this.frmUpdateProduct.get("description")?.value,
      UnitPrice: this.frmUpdateProduct.get("unitPrice")?.value
    };
  }

  onUpdateProductFormSubmit() {
    if (!this.frmUpdateProduct.valid) {
      this.frmUpdateProduct.markAllAsTouched();
      return;
    }

    this.isUpdatingProduct = true;
    let product = this.getUpdatedProductData();
    this.$SubscriberCreateProduct = this.srvIMSAPI.updateProduct(this.productId, product).subscribe({
      next: resp => {
        this.frmUpdateProduct.reset();
        this.isUpdatingProduct = false;

        Swal.fire({
          title: 'Success',
          text: 'The product updated successsfully',
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Close"
        }).then(result => {
          if (result.isConfirmed)
            this.router.navigate(["/products"]);
        });
      },
      error: error => {
        this.isUpdatingProduct = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberProductDetail)
      this.$SubscriberProductDetail.unsubscribe();

    if (this.$SubscriberCreateProduct)
      this.$SubscriberCreateProduct.unsubscribe();
  }
}
