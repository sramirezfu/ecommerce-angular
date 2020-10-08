import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProductUserComponent }  from './components/product-user/product-user.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductNewComponent } from './components/product-new/product-new.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostUserComponent } from './components/post-user/post-user.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { DetailPaymentComponent } from './components/detail-payment/detail-payment.component';
import { IdentityGuard } from './services/identity.guard';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'inicio', component:HomeComponent},
  {path: 'registrarse', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'logout/:sure', component:LoginComponent},
  {path: 'editar/usuario', component:UserEditComponent, canActivate:[IdentityGuard]},
  {path: 'productos/usuario/:id/:page', component:ProductUserComponent},
  {path: 'editar/producto/:id', component: ProductEditComponent, canActivate:[IdentityGuard]},
  {path: 'crear/producto', component:ProductNewComponent, canActivate:[IdentityGuard]},
  {path: 'detalle/producto/:id', component:ProductDetailComponent},
  {path: 'catalogo/:page/:type', component:ProductListComponent},
  {path: 'ofertas/:page/:type', component:ProductListComponent},
  {path: 'buscar/:producto/:page', component:SearchProductComponent},
  {path: 'categoria/:category/:page', component:SearchProductComponent},
  {path: 'crear/articulo', component:PostNewComponent, canActivate:[IdentityGuard]},
  {path: 'articulos/usuario/:id/:page', component:PostUserComponent},
  {path: 'detalle/articulo/:id', component:PostDetailComponent},
  {path: 'editar/articulo/:id', component:PostEditComponent, canActivate:[IdentityGuard]},
  {path: 'tutoriales/:page', component:PostListComponent},
  {path: 'lista/carro', component:CartListComponent},
  {path: 'detalle/pago', component:DetailPaymentComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
