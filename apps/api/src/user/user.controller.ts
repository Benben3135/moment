// src/user/user.controller.ts
import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':clerkId')
  async findOne(@Param('clerkId') clerkId: string) {
    return this.userService.findByClerkId(clerkId);
  }

  @Put(':clerkId')
  async update(@Param('clerkId') clerkId: string, @Body() updateData: any) {
    return this.userService.update(clerkId, updateData);
  }
}