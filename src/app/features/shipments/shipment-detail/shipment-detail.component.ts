import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShipmentService } from '../../../core/services/shipment.service';
import { Shipment } from '../../../core/models/shipment.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-shipment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './shipment-detail.component.html',
  styleUrl: './shipment-detail.component.css'
})
export class ShipmentDetailComponent implements OnInit {
  shipment: Shipment | null = null;
  loading = false;
  shipmentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shipmentId = +params['id'];
      this.loadShipment();
    });
  }

  loadShipment(): void {
    this.loading = true;
    this.shipmentService.getShipment(this.shipmentId).subscribe({
      next: (shipment) => {
        this.shipment = shipment;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading shipment:', error);
        this.loading = false;
        alert('Error al cargar el envío');
        this.router.navigate(['/shipments']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/shipments']);
  }

  editShipment(): void {
    this.router.navigate(['/shipments', this.shipmentId, 'edit']);
  }
}
