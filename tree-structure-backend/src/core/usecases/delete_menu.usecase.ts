import { MenuRepository } from '../domain/menu.repository.interface';
import { Menu } from '../domain/menu.entity';

export class DeleteMenuUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(id: string): Promise<Menu> {
    if (!id) {
      throw new Error('Menu ID is required for deletion');
    }
    const menu = await this.menuRepository.findById(id);
    if (!menu) {
      throw new Error(`Menu with ID ${id} not found`);
    }
    return this.menuRepository.delete(id);
  }
}
