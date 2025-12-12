import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// An interface that describes the properties that describes the user object.
interface ticketAttrs {
  title: string;
  price: string;
  userId: string;
}

// An interface that describes the properties that the user model has.
interface ticketModel extends mongoose.Model<ticketDoc> {
  build(attrs: ticketAttrs): ticketDoc;
}

// An interface that describes the properties that the User document has(single user has)
interface ticketDoc extends mongoose.Document {
  title: string;
  price: string;
  userId: string;
  version: number;
  orderId?: string;
  //   createdAt: string;
  //   updatedAt: string;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret as any).id = ret._id;
        delete (ret as any)._id;
      },
    },
  }
);
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: ticketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<ticketDoc, ticketModel>("User", ticketSchema);

// const buildUser = (attrs: ticketAttrs) => {
//   return new User(attrs);
// };

export { Ticket };
