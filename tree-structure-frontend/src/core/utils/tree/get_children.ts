import { MenuItemComponent } from "@/core/module/app/redux/store/menuSlice.app";

// Recursive function to get all children
export const getChildren = (
  menu: MenuItemComponent,
  allMenus: MenuItemComponent[]
): MenuItemComponent[] => {
  const children = allMenus.filter((item) => item.parentId === menu.id);
  return children.reduce(
    (acc, child) => acc.concat(child, getChildren(child, allMenus)),
    [menu]
  );
};
