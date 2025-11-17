import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { IBrandss } from '../../shared/interfaces/ibrandss';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService=inject(BrandsService)
 
 myBrands : IBrandss[] = []
//  categorisService: any;
  ngOnInit(): void {
    this.callBrands()
    }
   
    
  
 callBrands(){
     this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      console.log(res.data)
     this.myBrands=res.data
    },
    error:(err)=> {
      
    },
    

  }
)}



 
}

