import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { INewProduct } from 'src/app/interfaces';
import { ImsApiService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnDestroy {
  private $SubscriberCreateProduct: Subscription = new Subscription;

  public frmCreateProduct: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    description: new FormControl("", [Validators.required, Validators.minLength(80)]),
    unitPrice: new FormControl("", [Validators.required, Validators.min(1)])
  });

  public isCreatingProduct: boolean = false;

  constructor(
    private srvIMSApi: ImsApiService
  ) { }

  getNewProductData(): INewProduct {
    return <INewProduct>{
      Name: this.frmCreateProduct.get("name")?.value,
      Description: this.frmCreateProduct.get("description")?.value,
      UnitPrice: this.frmCreateProduct.get("unitPrice")?.value
    };
  }

  onCreateProductFormSubmit() {
    if (!this.frmCreateProduct.valid) {
      this.frmCreateProduct.markAllAsTouched();
      return;
    }

    this.isCreatingProduct = true;
    let product = this.getNewProductData();

    this.$SubscriberCreateProduct = this.srvIMSApi.createProduct(product).subscribe({
      next: resp => {
        this.frmCreateProduct.reset();
        this.isCreatingProduct = false;

        Swal.fire({
          title: 'Success',
          text: 'The product created successsfully',
          icon: 'success',
          showConfirmButton: true,
          showCancelButton: false,
          confirmButtonText: "Close"
        });
      },
      error: () => {
        this.isCreatingProduct = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.$SubscriberCreateProduct)
      this.$SubscriberCreateProduct.unsubscribe();
  }
}
