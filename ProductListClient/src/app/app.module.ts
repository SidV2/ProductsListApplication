import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './store/reducers/product-list-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//Angular Materials Imports
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EffectsModule } from '@ngrx/effects';
import { ProductListEffects } from './store/effects/product-list-effects';
import { ProductListUiComponent } from './components/product-list/product-list-ui/product-list-ui.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductListUiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ productsState: productsReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
    }),
    EffectsModule.forRoot([ProductListEffects]),
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
