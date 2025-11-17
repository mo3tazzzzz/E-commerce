import { CategorisService } from './../../core/services/categoris/categoris.service';
import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { ICategoriss } from '../../shared/interfaces/icategoriss';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailscateg',
  imports: [RouterLink],
  templateUrl: './detailscateg.component.html',
  styleUrl: './detailscateg.component.scss'
})
export class DetailscategComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly categorisService=inject(CategorisService)
  private readonly wishlistService=inject(WishlistService)
  private readonly toastrService=inject(ToastrService)
  

  
  categID:any;
  categData:ICategoriss [] = []
  wishIds: string[] = [];
  wishlistProducts: any[] = [];

  ngOnInit(): void {
   
    this.activatedRoute.paramMap.subscribe({

      next:(res)=>{
         this.categID=res.get('id')
        console.log(res)
        this.categorisService.getSpecificCategory(this.categID).subscribe({
          next:(res)=>{
            console.log(res)
            this.categData=res.data
            
          },
          error:(err)=>{

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
