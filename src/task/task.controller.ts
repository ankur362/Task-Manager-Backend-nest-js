import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Post('create')
  async createTask(@Body() createTaskData: any) {
    return this.taskService.createTask(createTaskData);
  }

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }


  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskData: Partial<Task>): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskData);
  }
  
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }

 
  @Get('search/category')
  async searchTasksByCategory(@Query('category') category: string) {
    return this.taskService.searchTasksByCategory(category);
  }
  @Post(':id/complete')
  async completeTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.completeTask(id);
  }
}
