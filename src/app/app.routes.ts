import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { ShipmentListComponent } from './features/shipments/shipment-list/shipment-list.component';
import { ShipmentDetailComponent } from './features/shipments/shipment-detail/shipment-detail.component';
import { ShipmentFormComponent } from './features/shipments/shipment-form/shipment-form.component';
import { TrackingPublicComponent } from './features/tracking/tracking-public.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tracking', pathMatch: 'full' },
  { path: 'tracking', component: TrackingPublicComponent }, // Ruta pública
  { path: 'login', component: LoginComponent },
  { 
    path: 'shipments', 
    canActivate: [authGuard],
    children: [
      { path: '', component: ShipmentListComponent },
      { path: 'create', component: ShipmentFormComponent },
      { path: ':id', component: ShipmentDetailComponent },
      { path: ':id/edit', component: ShipmentFormComponent }
    ]
  },
  { path: '**', redirectTo: '/tracking' }
];
