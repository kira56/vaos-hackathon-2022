import { EventUserDao } from '../daos/event-user.dao'

export class EventUserService {
  private static eventUser = new EventUserDao()

  static async create(userId: string, eventId: string): Promise<void> {
    await this.eventUser.save({
      event: {
        connect: {
          id: eventId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      moderator: true,
    })
  }
}
