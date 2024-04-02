import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class ValidateOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async validateOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    const paidAt = new Date();
    order.setPaidAt(paidAt);

    return await this.orderRepository.update(order);
  }
}
