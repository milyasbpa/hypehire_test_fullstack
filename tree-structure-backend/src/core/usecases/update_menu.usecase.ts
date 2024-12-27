import { MenuRepository } from '../domain/menu.repository.interface';
import { Menu } from '../domain/menu.entity';

export class UpdateMenuUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(id: string, menuData: Partial<Menu>): Promise<Menu> {
    if (!id) {
      throw new Error('Menu ID is required for updating');
    }
    const menu = await this.menuRepository.findById(id);
    if (!menu) {
      throw new Error(`Menu with ID ${id} not found`);
    }
    return this.menuRepository.update(id, menuData);
  }
}
