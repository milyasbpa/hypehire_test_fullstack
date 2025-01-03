import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MenuRepository } from '../../../core/domain/menu.repository.interface';
import { Menu } from '../../../core/domain/menu.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaMenuRepository implements MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findById(id: string): Promise<Menu | null> {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async create(menu: Menu): Promise<Menu> {
    return this.prisma.menu.create({
      data: {
        ...menu,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        depth: !menu.parentId ? 1 : menu.depth,
      },
    });
  }

  async update(id: string, menu: Partial<Menu>): Promise<Menu> {
    return this.prisma.menu.update({ where: { id }, data: menu });
  }

  async delete(id: string): Promise<Menu> {
    return this.prisma.menu.delete({ where: { id } });
  }
}
