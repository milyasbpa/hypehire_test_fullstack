import { MenuRepository } from '../domain/menu.repository.interface';
import { Menu } from '../domain/menu.entity';

export class CreateMenuUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(menuData: Partial<Menu>): Promise<Menu> {
    if (!menuData.name) {
      throw new Error('Menu name is required');
    }
    return this.menuRepository.create(menuData);
  }
}
