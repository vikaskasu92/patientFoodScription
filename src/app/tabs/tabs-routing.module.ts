import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'meals',
        loadChildren: () => import('../meals/meals.module').then( m => m.MealsPageModule)
      },
      {
        path: 'message-dietitian',
        loadChildren: () => import('../message-dietitian/message-dietitian.module').then( m => m.MessageDietitianPageModule)
      },
      {
        path: 'grocery-list',
        loadChildren: () => import('../grocery-list/grocery-list.module').then( m => m.GroceryListPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/meals',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/meals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
