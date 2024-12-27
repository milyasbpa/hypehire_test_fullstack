import { Module } from '@nestjs/common';
import { MenuController } from '../../../interface/controllers/menu.controller';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaMenuRepository } from '../../database/prisma/prisma_menu.repository';
import { GetMenusUseCase } from '../../../core/usecases/get_menus.usecase';
import { GetMenuByIdUseCase } from '../../../core/usecases/get_menu_by_id.usecase';
import { CreateMenuUseCase } from '../../../core/usecases/create_menu.usecase';
import { UpdateMenuUseCase } from '../../../core/usecases/update_menu.usecase';
import { DeleteMenuUseCase } from '../../../core/usecases/delete_menu.usecase';

@Module({
  controllers: [MenuController],
  providers: [
    PrismaService,
    PrismaMenuRepository,
    { provide: 'MenuRepository', useClass: PrismaMenuRepository },
    {
      provide: GetMenusUseCase,
      useFactory: (repo) => new GetMenusUseCase(repo),
      inject: ['MenuRepository'],
    },
    {
      provide: GetMenuByIdUseCase,
      useFactory: (repo) => new GetMenuByIdUseCase(repo),
      inject: ['MenuRepository'],
    },
    {
      provide: CreateMenuUseCase,
      useFactory: (repo) => new CreateMenuUseCase(repo),
      inject: ['MenuRepository'],
    },
    {
      provide: UpdateMenuUseCase,
      useFactory: (repo) => new UpdateMenuUseCase(repo),
      inject: ['MenuRepository'],
    },
    {
      provide: DeleteMenuUseCase,
      useFactory: (repo) => new DeleteMenuUseCase(repo),
      inject: ['MenuRepository'],
    },
  ],
})
export class MenuModule {}
