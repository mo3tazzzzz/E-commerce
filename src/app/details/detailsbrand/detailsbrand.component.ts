import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-detailsbrand',
  imports: [RouterLink],
  templateUrl: './detailsbrand.component.html',
  styleUrl: './detailsbrand.component.scss'
})
export class DetailsbrandComponent implements OnInit {
   private readonly activatedRoute = inject(ActivatedRoute)
  private readonly brandsService = inject(BrandsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)

  brandID:any;
  brandData:IBrands []=[]
  prodID:any
  wishIds: string[] = [];
  wishlistProducts: any[] = [];



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({

      next:(res)=>{
         this.brandID = res.get('id')
         this.brandsService.getBrandsSpecf(this.brandID).subscribe({
          next:(res)=>{
           console.log(res)
            this.brandData = res.data 

          },
          error:(err)=>{
            console.log(err)
            

          }
         })
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



