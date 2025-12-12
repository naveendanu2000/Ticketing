import { Publisher, OrderCancelledEvent, Subjects } from "@ndprojects/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
