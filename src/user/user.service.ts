import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.model';
import { ImageUploadService } from 'src/image-upload/image-upload.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly imageUploadService: ImageUploadService
  ) {}

  async signUp(userData: {
    img: Express.Multer.File;
    email: string;
    password: string;
    mobile: number;
    username: string;
    name: string;  
    image: string;
}): Promise<User> {
    const { img, email, password, mobile, username, name } = userData;

    
    if (!name || !email || !password || !mobile || !username) {
      throw new BadRequestException('All fields (name, email, password, mobile, username) are required');
    }

    if (!img) {
      throw new BadRequestException('Image file is required');
    }

    
    const imageUrl = await this.imageUploadService.uploadImage(img.buffer);
    userData.image = imageUrl;

   
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new BadRequestException('Email or username already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      name,    
      email,
      password: hashedPassword,
      mobile,
      username,
      image: imageUrl, 
    });

    return newUser.save();
}

async signIn(signInData: { emailOrusername: string; password: string }) {
    const { emailOrusername, password } = signInData;
  
    if (!emailOrusername || !password) {
      throw new BadRequestException('Email/Username and password are required');
    }
  
    const user = await this.userModel.findOne({
      $or: [{ email: emailOrusername }, { username: emailOrusername }],
    }).exec();
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }
    console.log("sedfdfgrsr")
    return { message: 'Login successful', user };
  }
  

}
