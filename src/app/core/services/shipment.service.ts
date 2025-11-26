import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Shipment, ShipmentCreateRequest, PaginatedResponse, Merchandise, Third } from '../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = `${environment.apiUrl}/shipments`;

  constructor(private http: HttpClient) { }

  getShipments(page: number = 1): Observable<PaginatedResponse<Shipment>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<PaginatedResponse<Shipment>>(this.apiUrl, { params });
  }

  getShipment(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  createShipment(shipment: ShipmentCreateRequest): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, shipment);
  }

  updateShipment(id: number, shipment: ShipmentCreateRequest): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/${id}`, shipment);
  }

  deleteShipment(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  activateShipment(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/activate`, {});
  }

  desactivateShipment(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/desactivate`, {});
  }

  getThirds(): Observable<Third[]> {
    return this.http.get<Third[]>(`${environment.apiUrl}/thirds`);
  }

  getMerchandises(): Observable<Merchandise[]> {
    return this.http.get<Merchandise[]>(`${environment.apiUrl}/merchandises`);
  }

  // Método público para rastreo (no requiere autenticación)
  getShipmentByTrackingNumber(trackingNumber: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${environment.apiUrl}/tracking/${trackingNumber}`);
  }
}
