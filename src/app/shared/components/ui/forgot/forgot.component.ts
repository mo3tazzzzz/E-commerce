import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotService } from '../../../../core/services/forgot/forgot.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

  private readonly forgotService=inject(ForgotService)
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  step:number=1

  forgotPassForm :  FormGroup=new FormGroup ({
    email: new FormControl(null,[Validators.required])
  })
  verifyCodeForm :  FormGroup=new FormGroup ({
    resetCode: new FormControl(null,[Validators.required])
  })
  resetPassForm :  FormGroup=new FormGroup ({
    email: new FormControl(null,[Validators.required]),
    newPassword: new FormControl(null,[Validators.required])
  })



  forgotPass(){

    let emailValue=this.forgotPassForm.get('email')?.value
    
    this.resetPassForm.get('email')?.patchValue(emailValue)

    this.forgotService.forgotPass(this.forgotPassForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.statusMsg == 'success'){
          this.step=2
        }

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  verifyCode(){
    this.forgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status == 'Success'){
          this.step=3
        }

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

   resetPass(){
    debugger
    this.forgotService.resetPass(this.resetPassForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        
        localStorage.setItem('myToken', res.token)

        this.authService.getUserData()


        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 1000);
        

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
