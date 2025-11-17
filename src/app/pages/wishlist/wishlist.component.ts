import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {


  private readonly wishlistService=inject(WishlistService)
  private readonly toastrService=inject(ToastrService)


wishlistProducts: any[] = [];
wishIds: string[] = [];


ngOnInit(): void {
  this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res)
      this.wishlistProducts = res.data;
      this.wishIds = res.data.map((p:any) => p._id);
    }
  })
}

removeItem(id: string) {
  this.wishlistService.removeProduvtFromWishlust(id).subscribe({
    next: (res) => {
      this.wishlistProducts = this.wishlistProducts.filter(p => p._id !== id);
      this.toastrService.info("Removed from Wishlist");
    }
  });
}




}


