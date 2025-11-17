import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {


  constructor(private readonly httpClient:HttpClient) { }
   myToken=localStorage.getItem('myToken')

  getAllBrands():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`)
  }
  getBrandsSpecf(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products?brand[in]=${id}`)
  }
}
