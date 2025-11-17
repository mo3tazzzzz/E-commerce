import { computed, InputSignal, Signal, signal, WritableSignal } from '@angular/core';
// import { FlowbiteService } from './../../core/services/flowbite.service';
import {initFlowbite} from'flowbite';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart.service';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';




@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  constructor(private authService:AuthService , private cartService :CartService , private myTranslateService:MyTranslateService , private translateService:TranslateService){
    
  }
isLoggedIn:InputSignal<boolean> = input<boolean>(true)
numberOfItems:Signal<number> = computed(()=> this.cartService.cartNumber())

token=localStorage.getItem('myToken')

 ngOnInit(): void {
    initFlowbite();
    
    // this.cartService.cartNumber.subscribe({
    //   next:(value)=> {
    //     this.numberOfItems=value
    //   },
    // })

   if(this.token){
     this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems)
      },
      error:(err)=>{
        
      }
    })
   }
  }
  



  signOut(){
  this.authService.signOut()
  }

  changeLang(lang:string):void{
    this.myTranslateService.changeLang(lang)

  }

  currentLang(lang:string){
    return this.translateService.currentLang == lang
  }

}


