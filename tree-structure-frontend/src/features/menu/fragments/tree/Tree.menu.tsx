"use client";
import {
  MenuItemComponent,
  setExpandedNodes,
} from "@/core/module/app/redux/store/menuSlice.app";
import { RootState } from "@/core/module/app/redux/store/store.app";
import Tree from "@/core/ui/components/tree/Tree.component";
import { buildTree } from "@/core/utils/tree";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const TreeMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const activeMenu = useSelector((state: RootState) => state.menu.activeMenu);

  const treeData = buildTree(menuItems);
  const parentTreeData = treeData.filter((item) => !item.parentId);

  const expandedNodes = useSelector(
    (state: RootState) => state.menu.expandedNodes
  );

  if (!activeMenu) {
    return null;
  }

  const treeFilteredData = filterFlatList(activeMenu.id, parentTreeData);

  const handleToggleMenu = (id: string) => {
    dispatch(
      setExpandedNodes({
        ...expandedNodes,
        [id]: !expandedNodes[id],
      })
    );
  };

  function filterFlatList(
    rootId: string,
    allMenus: MenuItemComponent[]
  ): MenuItemComponent[] {
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
  }

  return (
    <Tree
      expandedNodes={expandedNodes}
      items={treeFilteredData}
      onToggle={handleToggleMenu}
    />
  );
};
