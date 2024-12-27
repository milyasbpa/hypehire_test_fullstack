import { MenuItemComponent } from "@/core/module/app/redux/store/menuSlice.app";

export const filterFlatList = (
  rootId: string,
  allMenus: MenuItemComponent[]
): MenuItemComponent[] => {
  const result: MenuItemComponent[] = [];
  const visited = new Set<string>();

  // Recursive function to find children
  function findChildren(parentId: string | null) {
    allMenus.forEach((menu) => {
      if (menu.parentId === parentId && !visited.has(menu.id)) {
        visited.add(menu.id);
        result.push(menu);
        findChildren(menu.id); // Recurse to find deeper children
      }
    });
  }

  // Add the root node to the result and find its children
  const rootNode = allMenus.find((menu) => menu.id === rootId);
  if (rootNode) {
    result.push(rootNode);
    visited.add(rootNode.id);
    findChildren(rootNode.id);
  }

  return result;
};
