import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@yangsworld/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
