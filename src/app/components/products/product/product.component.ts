import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    public productService: ProductService,
    public toastr: ToastrService

  ) { }


  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm)
  {
    if (productForm.value.$key == null)
    {
      this.productService.insertProduct(productForm.value);
      this.toastr.success('Book Added');
      return
    }

    else

    this.productService.updateProduct(productForm.value);
    this.toastr.success('Updated Book');

    this.resetForm(productForm);


  }

  resetForm(productForm?: NgForm)
  {
    if (productForm != null)
    productForm.reset();
    this.productService.selectedProduct = new Product();
  }

}
