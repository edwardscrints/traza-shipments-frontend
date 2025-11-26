import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShipmentService } from '../../core/services/shipment.service';
import { Shipment } from '../../core/models/shipment.model';

@Component({
  selector: 'app-tracking-public',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tracking-public.component.html',
  styleUrl: './tracking-public.component.css'
})
export class TrackingPublicComponent {
  trackingNumber: string = '';
  shipment: Shipment | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  searched: boolean = false;
  userEmail: string = ''; // Email para funcionalidad futura

  constructor(private shipmentService: ShipmentService) {}

  searchShipment(): void {
    if (!this.trackingNumber.trim()) {
      this.errorMessage = 'Por favor ingrese un número de seguimiento';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.shipment = null;
    this.searched = false;

    this.shipmentService.getShipmentByTrackingNumber(this.trackingNumber).subscribe({
      next: (response) => {
        this.shipment = response;
        this.loading = false;
        this.searched = true;
      },
      error: (error) => {
        console.error('Error al buscar el envío:', error);
        this.errorMessage = error.status === 404 
          ? 'No se encontró un envío con ese número de seguimiento'
          : 'Error al buscar el envío. Por favor intente nuevamente.';
        this.loading = false;
        this.searched = true;
      }
    });
  }

  clearSearch(): void {
    this.trackingNumber = '';
    this.shipment = null;
    this.errorMessage = '';
    this.searched = false;
    this.userEmail = '';
  }

  printShipmentDetails(): void {
    window.print();
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'En Alistamiento': 'status-preparing',
      'Asignado a Vehiculo': 'status-assigned',
      'En Transito': 'status-transit',
      'Despacho Finalizado': 'status-delivered',
      'Cancelado': 'status-cancelled',
      'Devuelto': 'status-returned'
    };
    return statusMap[status] || 'status-default';
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      'En Alistamiento': '📦',
      'Asignado a Vehiculo': '🚛',
      'En Transito': '🚚',
      'Despacho Finalizado': '✅',
      'Cancelado': '❌',
      'Devuelto': '↩️'
    };
    return iconMap[status] || '📋';
  }
}
