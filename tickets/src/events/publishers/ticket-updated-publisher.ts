import { Publisher, Subjects, TicketUpdatedEvent } from '@yangsworld/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
