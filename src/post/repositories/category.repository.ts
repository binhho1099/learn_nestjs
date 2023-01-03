import { BaseRepository } from 'src/base.repository';
import { Category } from '../models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectModel('Category')
    private readonly CategoryModel: Model<Category>,
  ) {
    super(CategoryModel);
  }
}
