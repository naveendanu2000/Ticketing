import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@ndprojects/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
