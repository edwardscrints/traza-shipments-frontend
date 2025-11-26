import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShipmentService } from '../../../core/services/shipment.service';
import { Shipment, Third, Merchandise, ShipmentCreateRequest } from '../../../core/models/shipment.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-shipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  //                      ↑ IMPORTANTE: Agregar ReactiveFormsModule
  templateUrl: './shipment-form.component.html',
  styleUrl: './shipment-form.component.css'
})
export class ShipmentFormComponent implements OnInit {
  shipmentForm: FormGroup;
  loading = false;
  editMode = false;
  shipmentId?: number;
  errorMessage = '';
  
  thirds: Third[] = [];
  merchandises: Merchandise[] = [];
  
  statusOptions = [
    'En Alistamiento',
    'Asignado a Vehiculo',
    'En Transito',
    'Despacho Finalizado',
    'Cancelado',
    'Devuelto'
  ];

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.shipmentForm = this.fb.group({
      tracking_number: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      status: ['En Alistamiento', Validators.required],
      remesa: [''],
      manifiesto: [''],
      date_manifiesto: [''],
      plate: [''],
      weight: [null],
      declared_price: [null],
      is_active: [true],
      observation: [''],
      third_id_driver: [null, Validators.required],
      third_id_remite: [null, Validators.required],
      third_id_destin: [null, Validators.required],
      merchandise_id: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadThirds();
    this.loadMerchandises();
    
    // Detectar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.shipmentId = +params['id'];
        this.loadShipment();
      }
    });
  }

  loadThirds(): void {
    this.shipmentService.getThirds().subscribe(thirds => {
      this.thirds = thirds;
    });
  }

  loadMerchandises(): void {
    this.shipmentService.getMerchandises().subscribe(merchandises => {
      this.merchandises = merchandises;
    });
  }

  loadShipment(): void {
  if (!this.shipmentId) return;  // Si no hay ID, salir
  
  this.loading = true;
  this.shipmentService.getShipment(this.shipmentId).subscribe({
    next: (shipment: Shipment) => {
      // LLENAR EL FORMULARIO CON LOS DATOS EXISTENTES
      this.shipmentForm.patchValue({
        tracking_number: shipment.tracking_number,
        origin: shipment.origin,
        destination: shipment.destination,
        status: shipment.status,
        third_id_driver: shipment.third_id_driver,
        third_id_remite: shipment.third_id_remite,
        third_id_destin: shipment.third_id_destin,
        merchandise_id: shipment.merchandise_id,
        remesa: shipment.remesa,
        manifiesto: shipment.manifiesto,
        date_manifiesto: shipment.date_manifiesto,
        plate: shipment.plate,
        weight: shipment.weight,
        declared_price: shipment.declared_price,
        observation: shipment.observation,
        is_active: shipment.is_active
      });
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

  onSubmit(): void {
    // 1. VALIDAR EL FORMULARIO
    if (this.shipmentForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.shipmentForm.controls).forEach(key => {
        this.shipmentForm.get(key)?.markAsTouched();
      });
      alert('Por favor completa todos los campos requeridos');
      return;  // Salir del método
    }

    // 2. PREPARAR LOS DATOS
    this.loading = true;
    this.errorMessage = '';
    const formData: ShipmentCreateRequest = this.shipmentForm.value;

    // 3. DECIDIR: ¿CREAR O ACTUALIZAR?
    if (this.editMode && this.shipmentId) {
      // ACTUALIZAR ENVÍO EXISTENTE
      this.shipmentService.updateShipment(this.shipmentId, formData).subscribe({
        next: () => {
          this.loading = false;
          alert('Envío actualizado exitosamente');
          this.router.navigate(['/shipments', this.shipmentId]);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al actualizar';
        }
      });
    } else {
      // CREAR NUEVO ENVÍO
      this.shipmentService.createShipment(formData).subscribe({
        next: (shipment) => {
          this.loading = false;
          alert('Envío creado exitosamente');
          this.router.navigate(['/shipments', shipment.id]);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al crear';
        }
      });
    }
  }

  cancel(): void {
    if (this.editMode && this.shipmentId) {
      // Si estábamos editando, volver al detalle
      this.router.navigate(['/shipments', this.shipmentId]);
    } else {
      // Si estábamos creando, volver a la lista
      this.router.navigate(['/shipments']);
    }
  }
}

