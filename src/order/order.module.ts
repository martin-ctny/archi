import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';
import { CreateOrderService } from 'src/order/domain/use-case/create-order.service.service';
import OrderRepository from 'src/order/infrastructure/order.repository';
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },
  ],
})
export class ArticleModule {}
