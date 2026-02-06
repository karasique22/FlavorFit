import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/common/decorators';
import { CreateOrderInput } from './orders.input';
import { Order } from './orders.models';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'myOrders' })
  @Auth()
  async getMyOrders(@CurrentUser('id') userId: string) {
    return this.ordersService.findAll(userId);
  }

  @Mutation(() => Order)
  @Auth()
  createOrder(
    @CurrentUser('id') userId: string,
    @Args('input') input: CreateOrderInput,
  ) {
    return this.ordersService.create(userId, input);
  }
}
