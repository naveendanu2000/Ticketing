import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

// abc is the client id, this should be unique for all the clients

stan.on("connect", async () => {
  console.log("Publisher connected to nats");

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // });

  // stan.publish("ticket:created", data, () => {
  //   console.log("Event Published!");
  // });

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (error) {
    console.log(error);
  }
});

//stan is client;
