export interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderEmailData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  courierLabel: string;
  deliveryLabel: string;
  deliveryDetails: string | undefined;
  orderDate?: string;
}
