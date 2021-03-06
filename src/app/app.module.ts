import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AboutUsComponent} from './components/aboutus/aboutus.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {ListingComponent} from './components/listing/listing.component';
import {HowItWorksComponent} from './components/how-it-works/how-it-works.component';
import {NewsComponent} from './components/news/news.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {ServicesComponent} from './components/services/services.component';
import {ListingDetailsComponent} from './components/listing-details/listing-details.component';
import {NewsDetailsComponent} from './components/news-details/news-details.component';
import {RegisterComponent} from './components/register/register.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {BrandService} from './services/brand.service';
import {TypeService} from './services/type.service';
import {CategoryService} from './services/category.service';
import {ListingService} from './services/listing.service';
import {ArrayFilter} from './pipes/array.filter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewsService} from './services/news.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {AuthService} from './services/auth.service';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AgmCoreModule} from '@agm/core';
import {SubscriptionService} from './services/subscription.service';
import {DataService} from './services/data.service';
import {SubscriptionComponent} from './components/subscription/subscription.component';
import {FeaturedListingResolve} from './resolvers/featuredlisting.resolve';
import {FeaturedNewsResolve} from './resolvers/featurednews.resolve';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileComponent} from './components/profile/profile.component';
import {ToastModule, ToastOptions} from 'ng2-toastr';
import {ToasterConfigurations} from './configurations/toaster-configurations';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    HomeComponent,
    ListingComponent,
    HowItWorksComponent,
    NewsComponent,
    ContactUsComponent,
    ServicesComponent,
    ListingDetailsComponent,
    NewsDetailsComponent,
    RegisterComponent,
    ReservationComponent,

    // Filters
    ArrayFilter,

    BreadcrumbComponent,
    SubscriptionComponent,
    ProfileComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgOtJJNsjw5UcukGWEw6HyGiyxnz_aHj8',
      libraries: ['places']
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ToastModule.forRoot()
  ],
  providers: [
    BrandService,
    TypeService,
    CategoryService,
    ListingService,
    NewsService,
    AuthService,
    SubscriptionService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    FeaturedListingResolve,
    FeaturedNewsResolve,
    {provide: ToastOptions, useClass: ToasterConfigurations},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {
}
