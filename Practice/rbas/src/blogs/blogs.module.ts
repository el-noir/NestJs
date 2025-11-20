import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [BlogsController],
  providers: [BlogsService, RolesGuard],
})
export class BlogsModule {}
