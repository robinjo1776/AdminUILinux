export interface Location {
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  date: string;
  time: string;
  currency: string;
  equipment: string;
  pickup_po: string;
  phone: string;
  packages: string;
  weight: string;
  dimensions: string;
  notes: string;
}

export interface Charge {
  type: string;
  charge: number;
  percent: number;
}

export interface Order {
  id: number;
  customer: string;
  customer_ref_no: string;
  branch: string;
  booked_by: string;
  account_rep: string;
  sales_rep: string;
  customer_po_no: string;
  commodity: string;
  equipment: string;
  load_type: string;
  temperature: number;
  origin_location: Location[];
  destination_location: Location[];
  hot: boolean;
  team: boolean;
  air_ride: boolean;
  tarp: boolean;
  hazmat: boolean;
  currency: string;
  base_price: string;
  charges: Charge[];
  discounts: Charge[];
  gst: number;
  pst: number;
  hst: number;
  qst: number;
  final_price: number;
  notes: string;
  created_at: string;
  updated_at: string;
}
