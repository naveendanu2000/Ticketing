import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { Listener, TicketCreatedEvent, Subjects } from "@ndprojects/common";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {
      id: string;
      title: string;
      price: string;
      userId: string;
      version: number;
    },
    msg: Message
  ): Promise<void> {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}
