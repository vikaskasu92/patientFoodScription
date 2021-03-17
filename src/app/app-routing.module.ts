import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'shoppingcart',
    loadChildren: () => import('./shoppingcart/shoppingcart.module').then( m => m.ShoppingcartPageModule)
  },
  {
    path: 'on-boarding',
    loadChildren: () => import('./on-boarding/on-boarding.module').then( m => m.OnBoardingPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'grocery-list',
    loadChildren: () => import('./grocery-list/grocery-list.module').then( m => m.GroceryListPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
