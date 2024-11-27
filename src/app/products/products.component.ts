import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  take,
  tap,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';
import { ProductApiResponse } from './dto/product-api-response.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  productsResult$!: Observable<ProductApiResponse>;
  products$!: Observable<Product[]>;
  productService = inject(ProductService);
  private loadMore = new BehaviorSubject<{ limit: number; skip: number }>({
    limit: 12,
    skip: 0,
  });
  private allloaded = false;
  constructor() {
    this.products$ = this.loadMore.pipe(
      takeWhile(() => !this.allloaded),
      concatMap(({ limit, skip }) =>
        this.productService.getProducts({ limit, skip }).pipe(
          tap((response) => {
            if (response.products.length==0) {
              this.allloaded = true;
            }
          })
        )
      ),
      scan((acc, response) => [...acc, ...response.products], [] as Product[])
    );
  }
  loadMoreProducts() {
    const current = this.loadMore.value;
    this.loadMore.next({ limit: current.limit, skip: current.skip + current.limit });
  }
}
