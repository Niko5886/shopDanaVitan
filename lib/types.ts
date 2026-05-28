export interface OrderEmailData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  product: string;
  size: string;
  price: string;
  courierLabel: string;
  deliveryLabel: string;
  deliveryDetails: string | undefined;
  orderDate?: string;
}
