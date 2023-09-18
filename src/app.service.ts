import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const groupName = 'HarkTech';
    const projectParticipants = [
      'ST VIL JONAS',
      'Participant 2',
      'Participant 3',
    ];

    return `Welcome to the NestJS API of ${groupName} project! Participants: ${projectParticipants.join(
      ', ',
    )}.`;
  }
}
