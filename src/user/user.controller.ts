import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';

class CreateSignupDto {
    name: string; 
  email: string;
  password: string;
  mobile: number;
  username: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('img'))
  async signUp(@UploadedFile() img: Express.Multer.File, @Body() userData: CreateSignupDto) {
    return this.userService.signUp({ img, ...userData, image: img.originalname });
  }

  @Post('signin')
  async signIn(@Body() signInData: { emailOrusername: string; password: string }) {
    return this.userService.signIn(signInData);
  }
  
}
