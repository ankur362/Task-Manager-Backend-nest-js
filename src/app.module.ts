import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './task/task.model';
import { User } from './user/user.model';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Ankur:Ankur123@cluster0.wrcfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  TaskModule,
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
