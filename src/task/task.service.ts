import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.model';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  // ✅ Create Task
  async createTask(createTaskData: {
    title: string;
    description: string;
    due_date: string;
    priority: string;
    completed_task: boolean;
    category: string;
  }): Promise<Task> {
    const { title, description, due_date, priority, completed_task, category } = createTaskData;

    if (!title || !description || !due_date || !priority || !category) {
      throw new BadRequestException('All fields are required');
    }

    const existingTask = await this.taskModel.findOne({ title });
    if (existingTask) {
      throw new BadRequestException('Task already exists.');
    }

    const newTask = new this.taskModel({
      title,
      description,
      due_date,
      priority,
      completed_task,
      category,
    });

    return newTask.save();
  }


  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }


  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

 
  async updateTask(id: string, updateTaskData: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskData, { new: true }).exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }
  async deleteTask(taskId: string): Promise<{ message: string }> {
    const task = await this.taskModel.findByIdAndDelete(taskId).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return { message: 'Task deleted successfully' };
  }

  async searchTasksByCategory(category: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ category }).exec();
    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found for this category');
    }
    return tasks;
  }
  async completeTask(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    
    if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
    }

    
    task.Completed_task = !task.Completed_task;

    const updatedTask = await task.save(); 

    return updatedTask;
  }
}
