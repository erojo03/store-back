import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.categories.create({ data: createCategoryDto });
  }

  async createMany(createCategoryDto: CreateCategoryDto[]) {
    return await this.prisma.categories.createMany({ data: createCategoryDto });
  }

  async findAll() {
    return await this.prisma.categories.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.categories.findUnique({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.categories.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.categories.delete({ where: { id } });
  }
}
