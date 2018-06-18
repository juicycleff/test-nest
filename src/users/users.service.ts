import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  findAll(): User[] {
    // throw new Error("Method not implemented.");
    return null;
  }
  findOneById(id: string): User {
    // throw new Error("Method not implemented.");
    return null;
  }
  create(user: User): User {
    // throw new Error("Method not implemented.");
    return null;
  }

  /**
   * @description: Assign new value in the user found in the database.
   * @param {User} user
   * @param {User} newValue
   * @return {User}
   * @private
   */
  private _assign(user: User, newValue: User): User {
    for (const key of Object.keys(user)) {
      if (user[key] !== newValue[key]) user[key] = newValue[key];
    }

    return user as User;
  }
}
