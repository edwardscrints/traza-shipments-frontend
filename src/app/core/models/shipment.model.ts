export interface Third {
  id: number;
  third_name: string;
  document_type: string;
  third_type: string;
  third_address: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Merchandise {
  id: number;
  mercan_name: string;
  mercan_type: string;
  mercan_rndc_id: string;
  mercan_califi: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Shipment {
  id: number;
  tracking_number: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  remesa?: string | null;
  manifiesto?: string | null;
  date_manifiesto?: string | null;
  plate?: string | null;
  weight?: number | null;
  declared_price?: number | null;
  is_active: boolean;
  observation?: string | null;
  third_id_driver: number;
  third_id_remite: number;
  third_id_destin: number;
  merchandise_id: number;
  created_by: number;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  // Relaciones
  conductor?: Third;
  remitente?: Third;
  destinatario?: Third;
  mercancia?: Merchandise;
  creator?: any;
  updater?: any;
}

export type ShipmentStatus = 
  | 'En Alistamiento'
  | 'Asignado a Vehiculo'
  | 'En Transito'
  | 'Despacho Finalizado'
  | 'Cancelado'
  | 'Devuelto';

export interface ShipmentCreateRequest {
  tracking_number: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  remesa?: string;
  manifiesto?: string;
  date_manifiesto?: string;
  plate?: string;
  weight?: number;
  declared_price?: number;
  is_active?: boolean;
  observation?: string;
  third_id_driver: number;
  third_id_remite: number;
  third_id_destin: number;
  merchandise_id: number;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
