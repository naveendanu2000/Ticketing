import { TicketUpdatedEvent, Listener, Subjects } from "@ndprojects/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
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

    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
