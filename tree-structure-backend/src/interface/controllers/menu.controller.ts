import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Menu } from '../../core/domain/menu.entity';
import { GetMenusUseCase } from '../../core/usecases/get_menus.usecase';
import { GetMenuByIdUseCase } from '../../core/usecases/get_menu_by_id.usecase';
import { CreateMenuUseCase } from '../../core/usecases/create_menu.usecase';
import { UpdateMenuUseCase } from '../../core/usecases/update_menu.usecase';
import { DeleteMenuUseCase } from '../../core/usecases/delete_menu.usecase';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly getMenusUseCase: GetMenusUseCase,
    private readonly getMenuByIdUseCase: GetMenuByIdUseCase,
    private readonly createMenuUseCase: CreateMenuUseCase,
    private readonly updateMenuUseCase: UpdateMenuUseCase,
    private readonly deleteMenuUseCase: DeleteMenuUseCase,
  ) {}

  @Get()
  async getAllMenus(): Promise<Menu[]> {
    return this.getMenusUseCase.execute();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string): Promise<Menu | null> {
    return this.getMenuByIdUseCase.execute(id);
  }

  @Post()
  async createMenu(@Body() menuData: Partial<Menu>): Promise<Menu> {
    return this.createMenuUseCase.execute(menuData);
  }

  @Put(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() menuData: Partial<Menu>,
  ): Promise<Menu> {
    return this.updateMenuUseCase.execute(id, menuData);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: string): Promise<Menu> {
    return this.deleteMenuUseCase.execute(id);
  }
}
