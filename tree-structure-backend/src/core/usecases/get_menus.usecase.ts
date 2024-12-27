import { MenuRepository } from '../domain/menu.repository.interface';
import { Menu } from '../domain/menu.entity';

export class GetMenusUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  execute(): Promise<Menu[]> {
    return this.menuRepository.findAll();
  }
}
