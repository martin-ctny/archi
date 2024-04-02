import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class RemoveOrderService {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async removeOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    try {
      await this.orderRepository.delete(orderId);
    } catch (error) {
      throw new Error('Error deleting order');
    }
  }
}
