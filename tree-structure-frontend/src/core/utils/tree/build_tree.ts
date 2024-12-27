import { MenuItemComponent } from "@/core/module/app/redux/store/menuSlice.app";

// Helper function to sort and build a nested tree
export type MenuItem = MenuItemComponent;
export const buildTree = (items: MenuItem[]): MenuItem[] => {
  const map: Record<string, MenuItem> = {};
  const roots: MenuItem[] = [];

  // Sort items by parentId and depth
  const sortedItems = [...items].sort((a, b) => {
    if (a.parentId === b.parentId) {
      return a.depth - b.depth;
    }
    return (a.parentId ?? "").localeCompare(b.parentId ?? "");
  });

  // Build a map of items
  sortedItems.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // Create tree structure
  sortedItems.forEach((item) => {
    if (item.parentId === null) {
      roots.push(map[item.id]);
    } else if (map[item?.parentId ?? ""]) {
      map[item?.parentId ?? ""].children!.push(map[item.id]);
    }
  });

  return roots;
};
