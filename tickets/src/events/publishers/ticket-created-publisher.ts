import { Publisher, Subjects, TicketCreatedEvent } from "@ndprojects/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
