import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { IOrdoers } from '../../shared/interfaces/iordoers';
import { AuthService } from '../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly paymentService=inject(PaymentService)
  private readonly authService=inject(AuthService)

ordreData:IOrdoers[]=[]
id:string=''
token:any;

ngOnInit(): void {

 this.getUserId()
 this.callOrders(this.id)
 
}

getUserId(){
  this.token=jwtDecode(localStorage.getItem('myToken')!)
  console.log(this.token)
  this.id=this.token.id

}


  callOrders(id:string){

    this.paymentService.getAllOrders(id).subscribe({
       next:(res)=>{
      console.log(res)
      this.ordreData=res
    
    },
    error:(err)=> {
      
    },
    })
  }

}


// import { Component, inject, OnInit } from '@angular/core';
// import { PaymentService } from '../../core/services/payment/payment.service';
// import { IOrdoers } from '../../shared/interfaces/iordoers';

// @Component({
//   selector: 'app-allorders',
//   templateUrl: './allorders.component.html',
//   styleUrls: ['./allorders.component.scss']
// })
// export class AllordersComponent implements OnInit {

//   private readonly paymentService = inject(PaymentService);

//   ordreData: IOrdoers[] = [];
//   id: string = ''; // هنا هتحط الـ user id اللي في الـ localStorage مثلاً

//   ngOnInit(): void {
//     // لو انت حافظ الـ user id في localStorage
//     this.id = localStorage.getItem('mytokn') || '';  

//     if (this.id) {
//       this.callOrders(this.id);
//     } else {
//       console.error('User ID not found!');
//     }
//   }

//   callOrders(id: string) {
//     this.paymentService.getAllOrders(id).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.ordreData = res.data;
//       },
//       error: (err) => {
//         console.error(err);
//       },
//     });
//   }
// }
