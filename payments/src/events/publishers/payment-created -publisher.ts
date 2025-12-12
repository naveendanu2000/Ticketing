import { PaymentCreatedEvent, Publisher, Subjects } from "@ndprojects/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
