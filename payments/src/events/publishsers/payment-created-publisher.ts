import { PaymentCreatedEvent, Publisher, Subjects } from '@yangsworld/common';

export class PaymenntCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
