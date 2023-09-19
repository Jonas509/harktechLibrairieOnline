import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const groupName = 'HarkTech';
    const projectParticipant = [
      'ST VIL JONAS',
      'PIERRE MAX-RICO',
      'EUGENNE JENNIE',
      'PAULMAR LOURDELIN',
      'NAPOLEON CHRISLY',
      'DORIVAL CHEDNER',
      'ADAMS ROTCHILD',
    ];

    return `Welcome to the NestJS API of ${groupName} project! Participants: ${projectParticipant.join(
      ', ',
    )}.`;
  }
}
