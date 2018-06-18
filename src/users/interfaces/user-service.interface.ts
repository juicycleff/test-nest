'use strict';
import { User } from '../interfaces/index';

export interface IUserService {
    findAll(options: any): Promise<Array<User>>;
    findById(id: number): Promise<User | null>;
    findOne(options: object): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: number, newValue: User): Promise<User | null>;
    delete(id: number): Promise<void>;
}