import { Publisher, Subjects, TicketUpdatedEvent } from "@ndprojects/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}