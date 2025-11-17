import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { CategorisService } from '../../core/services/categoris/categoris.service';
import { ProductsService } from '../../core/services/product/products.service';
import { ICategoris } from '../../shared/interfaces/icategoris';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WishlistComponent } from '../wishlist/wishlist.component';
@Component({
  selector: 'app-products',
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
   private readonly productsService=inject(ProductsService)
 private readonly categorisService=inject(CategorisService)
 private readonly cartService=inject(CartService)
 private readonly toastrService=inject(ToastrService)
 private readonly wishlistService=inject(WishlistService)


 
  
  // myData:any=new Date()
  myProducts : IProduct[] =  []
  myCategoris : ICategoris[] = []
  wishIds: string[] = [];
  searchItem:string='';
  wishlistProducts: any[] = [];
  
   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
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
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    items:1,
    nav: true
  }
  
  ngOnInit(): void {

  this.callProducts()
  this.callCategoris()
  } 

  callProducts(){
    this.productsService.getProducts().subscribe({
    next:(res)=>{
      console.log(res.data)
     this.myProducts=res.data
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
     this.myCategoris=res.data
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
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }


  addToWishlist(id: string) {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastrService.success('Added to your Wishlist');
        this.wishIds.push(id); 
      }
    })
 
}
removeItem(id: string) {
  if(this.wishIds.includes(id)) {
  this.wishlistService.removeProduvtFromWishlust(id).subscribe({
    next: (res) => {
 this.wishIds = this.wishIds.filter(id => id !== id);      this.toastrService.info("Removed from Wishlist");
    }
  });
}else{
   this.wishlistService.addProductToWishlist(id).subscribe({
     next: (res) => {
      this.wishIds.push(id);
       this.toastrService.success('Added to Wishlist');
     }
     });
}
}

  

}



