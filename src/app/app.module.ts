import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';

// Import plugins
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AvatarModule } from 'ngx-avatar';
import { MatCarouselModule } from '@ngmodule/material-carousel';

// Import Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProductUserComponent } from './components/product-user/product-user.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductNewComponent } from './components/product-new/product-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostUserComponent } from './components/post-user/post-user.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CarDeployComponent } from './components/car-deploy/car-deploy.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { ModalCartComponent } from './components/modal-cart/modal-cart.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ModalActionsComponent } from './components/modal-actions/modal-actions.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DetailPaymentComponent } from './components/detail-payment/detail-payment.component';

// Import services
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { SuscribeService } from './services/suscribe.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { PostService } from './services/post.service';
import { PreviousRouteService } from './services/previousRouter.service';
import { CartService } from './services/cart.service';

// Import pipes
import { FilterPipe } from './pipes/filter.pipe';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterProductCategoryPipe } from './pipes/filter-product-category.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';

// Import material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';


import { HashLocationStrategy, LocationStrategy } from '@angular/common';

registerLocaleData(localeEs, 'es-Co');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    UserEditComponent,
    ProductUserComponent,
    ProductEditComponent,
    ProductNewComponent,
    PostNewComponent,
    PostUserComponent,
    PostDetailComponent,
    NotFoundComponent,
    PostEditComponent,
    PostListComponent,
    FilterPipe,
    FilterCategoryPipe,
    ProductListComponent,
    FilterProductCategoryPipe,
    FilterProductPipe,
    SearchProductComponent,
    CarDeployComponent,
    CartListComponent,
    ModalCartComponent,
    ModalDeleteComponent,
    ModalActionsComponent,
    ProductDetailComponent,
    DetailPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    AvatarModule,
    MatCarouselModule,
    MatBadgeModule
  ],
  providers: [UserService,
              SuscribeService,
              ProductService,
              CategoryService,
              PostService,
              PreviousRouteService,
              IdentityGuard,
              CartService,
              { provide: LOCALE_ID, useValue: 'es-Co' },
              {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
