"use client";
import {
  MenuItemComponent,
  setExpandedNodes,
} from "@/core/module/app/redux/store/menuSlice.app";
import { RootState } from "@/core/module/app/redux/store/store.app";
import Tree from "@/core/ui/components/tree/Tree.component";
import { buildTree, getChildren } from "@/core/utils/tree";
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

  const treeFilteredData = getChildren(activeMenu, parentTreeData);

  const handleToggleMenu = (id: string) => {
    dispatch(
      setExpandedNodes({
        ...expandedNodes,
        [id]: !expandedNodes[id],
      })
    );
  };

  return (
    <Tree
      expandedNodes={expandedNodes}
      items={treeFilteredData}
      onToggle={handleToggleMenu}
    />
  );
};
