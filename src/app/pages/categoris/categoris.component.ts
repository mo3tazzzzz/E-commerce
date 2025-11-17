import { Component, inject, OnInit } from '@angular/core';
import { ICategoris } from '../../shared/interfaces/icategoris';
import { CategorisService } from '../../core/services/categoris/categoris.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categoris',
  imports: [RouterLink],
  templateUrl: './categoris.component.html',
  styleUrl: './categoris.component.scss'
})
export class CategorisComponent implements OnInit{
 

 private readonly categorisService=inject(CategorisService)
 myCategoris : ICategoris[] = []
 categID:any;
//  categorisService: any;
  ngOnInit(): void {
    this.callCategoris()
    
  }
 callCategoris(){
     this.categorisService.getCategoris().subscribe({
    next:(res)=>{
      console.log(res.data)
     this.myCategoris=res.data
    },
    error:(err)=> {
      
    },
    

  })
}



}
