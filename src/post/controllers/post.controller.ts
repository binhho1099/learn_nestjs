import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Req,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPost() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(req.user, post);
  }

  @Put(':id')
  async UpdatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.replacePost(id, post);
  }

  // @Delete(':id')
  // async deletePost(@Param('id') id: string) {
  //   return this.postService.deletePost(id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/all')
  async getPostUser(@Req() req: any) {
    await req.user.populate(['posts']);
    return req.user.posts;
  }

  @Get('get/category')
  async getByCategory(@Query('category_id') category_id) {
    return await this.postService.getByCategory(category_id);
  }
}
