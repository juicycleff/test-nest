import { Injectable, UseGuards } from '@nestjs/common';
import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription,
  ResolveProperty,
} from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as uuidv4 from 'uuid/v4';
import { PubSub } from 'graphql-subscriptions';
import { getUserId, getUser } from 'common/utils';
import { UsersService } from 'users/users.service';
import { AuthService } from './auth.service';
import { User } from 'users/interfaces';
import { findUserById, findUserByEmail } from 'databases/dataloaders/user';
import {
  PasswordTooShortError,
  MissingDataError,
  UserEmailExistsError,
  UserNotFoundError,
  UserEmailUnconfirmedError,
  UserDeletedError,
  InvalidOldPasswordError,
} from 'common/apollo-errors';
import { createDocument, findOneDocument, updateDocument } from 'databases/dataloaders';
import { JwtAuthPayload } from './interfaces/jwt-payload.interface';

const pubSub = new PubSub();

function generateToken(user: any, ctx: any) {
  return jwt.sign({ userId: user._id }, 'KLSKDJUY$%@!&^&^@#!&^%!@$Vgdgsdf_()900*&%^$%#@@hf156176');
}

function validatePassword(value: string) {
  if (value.length <= 8) {
    throw new PasswordTooShortError();
  }
}

function getHashedPassword(value: string) {
  return bcrypt.hash(value, 10);
}

const UserType = {
  avatar: '',
  headerImage: '',
  facebookAuthId: '',
  twitterAuthId: '',
  linkedInAuthId: '',
  inviteAccepted: false,
  resetToken: '',
  inviteToken: '',
  verified: false,
  isSuper: false,
  bio: '',
  completedProfile: 1,
};

@Resolver('AuthPayload')
export class AuthResolvers {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation()
  async login(obj, {email, password}: any, context, info): Promise<JwtAuthPayload> {
    // tslint:disable-next-line:no-console
    console.log(email);
    const user = await findUserByEmail.load(email);
    if (!user) {
      // tslint:disable-next-line:no-console
      console.log(user);
      throw new UserNotFoundError();
    }

    // tslint:disable-next-line:no-console
    console.log(user);

    // tslint:disable-next-line:no-console
    console.log(email);

    if (!user.inviteAccepted) {
      // throw new UserInviteNotAcceptedError();
    }

    if (user.deletedAt) {
      throw new UserDeletedError();
    }

    if (!user.emailConfirmed) {
      // throw new UserEmailUnconfirmedError();
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UserNotFoundError();
    }

    const data = {
      collection: 'user',
      documentHandle: {
        _id: user._id,
      },
      data: {
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    await updateDocument.load(data);

    return {
      token: generateToken(user, context),
      user,
    };
  }

  @Mutation()
  async signup(obj, args: any, context, info): Promise<any> {
    if (!args.email) {
      throw new MissingDataError();
    }

    const userExists = await findUserByEmail.load(args.email);
    if (userExists) {
      throw new UserEmailExistsError();
    }

    validatePassword(args.password);
    const hashedPassword = await getHashedPassword(args.password);
    const emailConfirmToken = uuidv4();

    const newUser = await createDocument.load(
      {
        type: 'user',
        data: {
            ...UserType,
            ...args,
            password: hashedPassword,
            emailConfirmToken,
            emailConfirmed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
      },
    );

    /*if (ctx.mailer) {
      console.log('EMAIL OCN', emailConfirmToken);
    }*/

    const user = await findUserById.load(newUser._id);

    return {
      token: generateToken(user, context),
      user,
    };
  }

  @Mutation()
  async changePassword(obj, { oldPassword, newPassword }: { oldPassword: string; newPassword: string }, context, info): Promise<any> {
    const user = await getUser(context);

    const valid = await bcrypt.compare(user.password, oldPassword);
    if (!valid) {
      throw new InvalidOldPasswordError();
    }

    validatePassword(newPassword);
    const password = await getHashedPassword(newPassword);

    const newUser = await context.db.mutation.updateUser({
      where: { id: user.id },
      data: { password },
    });

    return {
      id: newUser!.id,
    };
  }

  /**
   * Resolver Properties
   */
  @ResolveProperty('user')
  async user({ user: { _id } }: any, args: any, context, info): Promise<User> {
    // const id = getUserId(context);
    const data = {type: 'user', id: _id};
    return findOneDocument.load(data);
  }
}
