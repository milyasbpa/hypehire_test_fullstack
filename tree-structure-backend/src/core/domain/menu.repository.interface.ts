import { Menu } from './menu.entity';

export interface MenuRepository {
  findAll(): Promise<Menu[]>;
  findById(id: string): Promise<Menu | null>;
  create(menu: Partial<Menu>): Promise<Menu>;
  update(id: string, menu: Partial<Menu>): Promise<Menu>;
  delete(id: string): Promise<Menu>;
}
