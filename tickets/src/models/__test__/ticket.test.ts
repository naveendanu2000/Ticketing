import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // create an instance of the ticket
  const ticket = Ticket.build({
    title: "Concert",
    price: "2000",
    userId: "123",
  });

  // save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstInstance!.set({ price: "1000" });
  secondInstance!.set({ price: "3000" });

  // save the first fetched ticket
  await firstInstance!.save();
  // save the second fetched ticket and expect an error

  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }

  throw new Error("Should not reach this point.");
});

it("version number gets incremented by 1 when the data is saved", async () => {
  const ticket = Ticket.build({
    title: "Concert",
    price: "2000",
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
