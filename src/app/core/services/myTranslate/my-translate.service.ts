import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { Inject, inject,Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private translateService : TranslateService , @Inject(PLATFORM_ID) private ID : Object) {
    
    if(isPlatformBrowser(ID)){
      translateService.setDefaultLang('en')

    let savedLang = localStorage.getItem('myLang')

    if(savedLang){
      translateService.use(savedLang!)
    }

    this.changeDirection()
    }


   }

   changeDirection(){
    if(localStorage.getItem('myLang')=='en'){
      document.documentElement.setAttribute('dir' , 'ltr')
      document.documentElement.setAttribute('lang' , 'en')

    }else if(localStorage.getItem('myLang')=='ar'){
      document.documentElement.setAttribute('dir' , 'rtl')
      document.documentElement.setAttribute('lang' , 'ar')
   }
}
   

   changeLang(lang:string):void{
    localStorage.setItem('myLang',lang)

    this.translateService.use(lang)

    this.changeDirection()

      const dropdown = document.getElementById('dropdown');
  if (dropdown) dropdown.classList.add('hidden');


   }


}
// function Inject(PLATFORM_ID: InjectionToken<Object>): (target: typeof MyTranslateService, propertyKey: undefined, parameterIndex: 1) => void {
//   throw new Error('Function not implemented.');
// }

