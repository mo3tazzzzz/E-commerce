import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorisService {

   constructor(private httpClient:HttpClient) { }


  getCategoris():Observable<any>{
   return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategory(id:string):Observable<any>{
   return this.httpClient.get(`${environment.baseUrl}/api/v1/products?category[in]=${id}`)
  }
}
