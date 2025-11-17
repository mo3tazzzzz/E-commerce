import { CheckoutComponent } from './../../../pages/checkout/checkout.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor( private httpClient:HttpClient) { }
  mytoken=localStorage.getItem('myToken')!

  checkoutSession(id:string , shippingData:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
         "shippingAddress":shippingData
      } ,
      
    )
  }

  getAllOrders(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`,
     
    
        
    )
  }


}
