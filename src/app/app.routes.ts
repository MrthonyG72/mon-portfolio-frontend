import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Notfound } from './notfound/notfound';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Anzouan Gomis Thony Axel · Portfolio'
  },
  {
    path: 'not-found',
    component: Notfound
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];
