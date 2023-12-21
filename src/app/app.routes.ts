import { FruitComponent } from './pages/fruits/form/fruit.component';
import { FruitsComponent } from './pages/fruits/fruits.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: FruitsComponent,
  },
  {
    path: 'new',
    component: FruitComponent,
  },
  {
    path: ':id',
    component: FruitComponent,
  },
];
