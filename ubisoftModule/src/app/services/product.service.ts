import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../shared/product';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + 'product')
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }


  submitProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Product>(baseURL + 'product', product, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  submitImage(product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('image', product.image)
    return this.http.post<Product>(baseURL + 'file', formData)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
