import { OrderItem } from 'src/order/domain/entity/order-item.entity';
import { OrderStatus } from 'src/order/types/order.types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  constructor(customerName: string, orderItems: OrderItem[]) {
    this.customerName = customerName;
    this.orderItems = orderItems;
  }

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  shippingAddress: string | null;

  @Column({ nullable: true })
  shippingAddressSetAt: Date | null;

  @Column()
  status: OrderStatus = OrderStatus.CART;

  @Column({ nullable: true })
  paidAt: Date;

  getOrderTotalPrice(): number {
    return this.orderItems.reduce(
      (totalPrice, orderItem) => totalPrice + orderItem.getTotalPrice(),
      0,
    );
  }

  setShippingAddress(shippingAddress: string): void {
    if (shippingAddress === '') {
      throw new Error('Shipping address is required');
    }

    if (shippingAddress.length > 100) {
      throw new Error(
        'Shipping address must be less than or equal to 100 characters',
      );
    }

    this.shippingAddress = shippingAddress;
    this.shippingAddressSetAt = new Date();
    this.status = 'SHIPPING_ADDRESS_SET';
  }

  setPaidAt(paidAt: Date): void {
    this.paidAt = paidAt;
    this.status = 'PAID';
  }
}
