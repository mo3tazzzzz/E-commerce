import { CategorisService } from './../../core/services/categoris/categoris.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { ProductsComponent } from '../products/products.component';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ICategoris } from '../../shared/interfaces/icategoris';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,UpperCasePipe,LowerCasePipe,TitleCasePipe,DatePipe,SlicePipe,CurrencyPipe,JsonPipe,SearchPipe,FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

 private readonly productsService=inject(ProductsService)
 private readonly categorisService=inject(CategorisService)
 private readonly cartService=inject(CartService)
 private readonly toastrService=inject(ToastrService)
 private readonly wishlistService=inject(WishlistService)

 
 
  
  // myData:any=new Date()
  // myProducts : IProduct[] =  []
  // myCategoris : ICategoris[] = []


  myProducts:WritableSignal<IProduct[]>=signal([])
  myCategoris:WritableSignal<ICategoris[]>=signal([])
  wishlistProducts: any[] = [];

  wishIds: string[] = [];
  
  searchItem:string='';

  
   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  mainSliderOptins: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    items:1,
responsive: {
    0: { items: 1 },
    640: { items: 1 },
    1024: { items: 1 }
    },
    nav: true,
  }
  

  ngOnInit(): void {

  this.callProducts()
  this.callCategoris()
  } 

  callProducts(){
    this.productsService.getProducts().subscribe({
    next:(res)=>{
      console.log(res.data)
     this.myProducts.set(res.data)
    },
    error:(err)=> {
      
    },

  }

  )
  }
  callCategoris(){
     this.categorisService.getCategoris().subscribe({
    next:(res)=>{
      console.log(res.data)
     this.myCategoris.set(res.data)
    },
    error:(err)=> {
      
    },

  } 

  )

  }

  addProductToCart(id:string):void{
    
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.success(res.message , 'FreshCart',{progressBar:true})
        this.cartService.cartNumber.set(res.numOfCartItems)
       
      },
      error:(err)=>{
        console.log(err)
      }
    })


  }

  removeItem(id: string) {
  if(this.wishIds.includes(id)) {
  this.wishlistService.removeProduvtFromWishlust(id).subscribe({
    next: (res) => {
       this.wishIds = this.wishIds.filter(id => id !== id);
      this.toastrService.info("Removed from Wishlist");
    }
  });
}else{
   this.wishlistService.addProductToWishlist(id).subscribe({
     next: (res) => {
    
       this.toastrService.success('Added to Wishlist');
       this.wishIds.push(id);
     }
     });
}
}
  

}
