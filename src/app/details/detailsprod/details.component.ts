import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService=inject(ToastrService)
  private readonly wishlistService=inject(WishlistService)

  prodID:any;
  prodData:IProduct | null=null;

  wishIds: string[] = [];
  wishlistProducts: any[] = [];

 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({

      next:(res)=>{
         this.prodID = res.get('id')
         this.productsService.getSpecificProduct(this.prodID).subscribe({
          next:(res)=>{
           
            this.prodData = res.data 
            
          },
          error:(err)=>{

          }
         })
      }

    })
    
    
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
      this.wishIds.push(id);
       this.toastrService.success('Added to Wishlist');
     }
     });
}
}

}
