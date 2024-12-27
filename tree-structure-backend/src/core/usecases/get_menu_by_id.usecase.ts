import { MenuRepository } from '../domain/menu.repository.interface';
import { Menu } from '../domain/menu.entity';

export class GetMenuByIdUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(id: string): Promise<Menu | null> {
    if (!id) {
      throw new Error('Menu ID is required to fetch details');
    }
    return this.menuRepository.findById(id);
  }
}
