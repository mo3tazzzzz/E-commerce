import { Routes, CanActivateFn } from '@angular/router';
import { BlankComponent } from './layout/blank/blank.component';
import { AuthComponent } from './layout/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { CategorisComponent } from './pages/categoris/categoris.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path:"" , component:BlankComponent , canActivate: [authGuard] , title:"blank !" , children:[
        {path:"home" , loadComponent: () =>import("./pages/home/home.component").then( (c)=>c.HomeComponent) , title:"home !"},
        {path:"cart" , loadComponent: () =>import("./pages/cart/cart.component").then( (c)=>c.CartComponent) , title:"cart !"},
        {path:"products" , loadComponent: () =>import("./pages/products/products.component").then( (c)=>c.ProductsComponent) , title:"products !"},
        {path:"categoris" , loadComponent: () =>import("./pages/categoris/categoris.component").then( (c)=>c.CategorisComponent) , title:"categoris !"},
        {path:"brands" , loadComponent: () =>import("./pages/brands/brands.component").then( (c)=>c.BrandsComponent) , title:"brands !"},
        {path:"allorders" , loadComponent: () =>import("./pages/allorders/allorders.component").then( (c)=>c.AllordersComponent) , title:"allorders !"},
        {path:"wishlist" , loadComponent: () =>import("./pages/wishlist/wishlist.component").then( (c)=>c.WishlistComponent) , title:"wishlist !"},
        {path:"chekout/:id" , loadComponent: () =>import("./pages/checkout/checkout.component").then( (c)=>c.CheckoutComponent) , title:"chekout !"},
        {path:"details/:id" , loadComponent: () =>import("./details/detailsprod/details.component").then( (c)=>c.DetailsComponent) , title:"detailsprod !"},
        {path:"detailsbrand/:id" , loadComponent: () =>import("./details/detailsbrand/detailsbrand.component").then( (c)=>c.DetailsbrandComponent) , title:"detailsbrand !"},
        {path:"detailscateg/:id" , loadComponent: () =>import("./details/detailscateg/detailscateg.component").then( (c)=>c.DetailscategComponent) , title:"detailscateg !"},

    ]},

    {path:"" , component:AuthComponent , canActivate:[loggedGuard], title:"auth !" , children:[
         {path:"login" , loadComponent: () =>import("./pages/login/login.component").then( (c)=>c.LoginComponent) , title:"login !"},
          {path:"register" , loadComponent: () =>import("./pages/register/register.component").then( (c)=>c.RegisterComponent) , title:"register !"},
          {path:"forgot" , loadComponent: () =>import("./shared/components/ui/forgot/forgot.component").then( (c)=>c.ForgotComponent) , title:"forgot !"},
          {path:"**" , loadComponent: () =>import("./pages/not-found/not-found.component").then( (c)=>c.NotFoundComponent) , title:"notFound !"},

    ]},
];
