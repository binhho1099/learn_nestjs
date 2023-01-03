import { BaseRepository } from 'src/base.repository';
import { Post } from '../models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {
    super(postModel);
  }
}
