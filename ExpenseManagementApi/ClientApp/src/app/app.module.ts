import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { CreateExpenseComponent } from './Expense/create-expense/create-expense.component';
import { ExpenseListComponent } from './Expense/expense-list/expense-list.component';
import { UpdateExpenseComponent } from './Expense/update-expense/update-expense.component';
import { CreateCategoryComponent } from './Category/create-category/create-category.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { UpdateCategoryComponent } from './Category/update-category/update-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    RegisterUserComponent,
    CreateExpenseComponent,
    ExpenseListComponent,
    UpdateExpenseComponent,
    CreateCategoryComponent,
    CategoryListComponent,
    UpdateCategoryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'authentication/login', component: LoginComponent },
      { path: 'authentication/registration', component: RegisterUserComponent },

      { path: 'expense/create', component: CreateExpenseComponent},
      { path: 'expense/list', component: ExpenseListComponent},
      { path: 'expense/update/:id', component: UpdateExpenseComponent},

      { path: 'category/create', component: CreateCategoryComponent},
      { path: 'category/list', component: CategoryListComponent},
      { path: 'category/update/:id', component: UpdateCategoryComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
