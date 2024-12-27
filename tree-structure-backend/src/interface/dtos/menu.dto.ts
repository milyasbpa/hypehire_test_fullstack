export class MenuDto {
  id: string;
  name: string;
  parentId?: string | null;
  depth: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateMenuDto {
  name: string;
  parentId?: string | null;
  depth: number;
}

export class UpdateMenuDto {
  name?: string;
  parentId?: string | null;
  depth?: number;
}
