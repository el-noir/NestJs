import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('blogs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // ADMIN and EMPLOYEE can create
  @Post()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  // All authenticated users can view
  @Get()
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.USER)
  findAll() {
    return this.blogsService.findAll();
  }

  // All authenticated users can view single blog
  @Get(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.USER)
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  // ADMIN and EMPLOYEE can update
  @Patch(':id')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  // Only ADMIN can delete
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
