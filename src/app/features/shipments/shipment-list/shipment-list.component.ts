import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ShipmentService } from '../../../core/services/shipment.service';
import { Shipment, PaginatedResponse } from '../../../core/models/shipment.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './shipment-list.component.html',
  styleUrl: './shipment-list.component.css'
})
export class ShipmentListComponent implements OnInit {
  shipments: Shipment[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 0;
  totalItems = 0;

  constructor(
    private shipmentService: ShipmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.loading = true;
    this.shipmentService.getShipments(this.currentPage).subscribe({
      next: (response: PaginatedResponse<Shipment>) => {
        this.shipments = response.data;
        this.currentPage = response.current_page;
        this.totalPages = response.last_page;
        this.totalItems = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading shipments:', error);
        this.loading = false;
      }
    });
  }

  viewShipment(id: number): void {
    this.router.navigate(['/shipments', id]);
  }

  editShipment(id: number): void {
    this.router.navigate(['/shipments', id, 'edit']);
  }

  toggleActive(shipment: Shipment): void {
    const action = shipment.is_active ? 
      this.shipmentService.deactivateShipment(shipment.id) :
      this.shipmentService.activateShipment(shipment.id);

    action.subscribe({
      next: () => {
        this.loadShipments();
      },
      error: (error) => {
        console.error('Error toggling shipment status:', error);
        alert('Error al cambiar el estado del envío');
      }
    });
  }

  deleteShipment(id: number): void {
    if (confirm('¿Estás seguro de eliminar este envío?')) {
      this.shipmentService.deleteShipment(id).subscribe({
        next: () => {
          this.loadShipments();
        },
        error: (error) => {
          console.error('Error deleting shipment:', error);
          alert('Error al eliminar el envío');
        }
      });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadShipments();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadShipments();
    }
  }
}
