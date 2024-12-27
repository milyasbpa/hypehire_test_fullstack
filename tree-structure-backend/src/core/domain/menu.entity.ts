export class Menu {
  id: string;
  name: string;
  parentId?: string | null;
  depth: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Menu>) {
    Object.assign(this, partial);
  }
}
