import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
    ) {}

    async all(): Promise<UserDocument[]> {
        return this.UserModel.find();
    }
    async find(id: string | Types.ObjectId): Promise<UserDocument> {
        return await this.UserModel.findById(new Types.ObjectId(id));
    }
    async findByName(uname: string): Promise<UserDocument> {
        return await this.UserModel.findOne({ uname });
    }
    async create(info: User): Promise<UserDocument> {
        const passd = await bcrypt.hash(info.passd, 10);
        info.passd = passd;
        console.log(9, info);
        const user = new this.UserModel(info);

        return await user.save();
    }
}
