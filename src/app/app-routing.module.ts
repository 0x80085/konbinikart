import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { GroceryListEditableComponent } from './groceries/grocery-list-editable/grocery-list-editable.component'
import { GroceryItemDetailComponent } from './groceries/grocery-item-detail/grocery-item-detail.component'
import { GroceryListTranslatedComponent } from './groceries/grocery-list-translated/grocery-list-translated.component'
import { GroceryListComponent } from './groceries/grocery-list/grocery-list.component'
import { GroceryItemDetailEditableComponent } from './groceries/grocery-item-detail-editable/grocery-item-detail-editable.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent  },
  { path: 'about', component: AboutComponent  },

  { path: 'groceries', component: GroceryListComponent },
  { path: 'edit-groceries', component: GroceryListEditableComponent },
  { path: 'groceries-translated', component: GroceryListTranslatedComponent },
  
  { path: 'grocery-item/:id', component: GroceryItemDetailComponent },
  { path: 'edit-grocery-item/:id', component: GroceryItemDetailEditableComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
