"use client";
import { setExpandedNodes } from "@/core/module/app/redux/store/menuSlice.app";
import { RootState } from "@/core/module/app/redux/store/store.app";
import Tree from "@/core/ui/components/tree/Tree.component";
import { buildTree, filterFlatList } from "@/core/utils/tree";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const TreeMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const activeMenu = useSelector((state: RootState) => state.menu.activeMenu);

  const sortedData = [...menuItems].sort((a, b) => {
    // First, compare by depth to ensure the hierarchy level is respected.
    if (a.depth !== b.depth) {
      return a.depth - b.depth;
    }

    // If depth is the same, compare by parentId (null or valid parent).
    if (a.parentId !== b.parentId) {
      return (a.parentId || "").localeCompare(b.parentId || "");
    }

    // Finally, compare by id when both depth and parentId are the same.
    return a.id.localeCompare(b.id);
  });

  const expandedNodes = useSelector(
    (state: RootState) => state.menu.expandedNodes
  );

  if (!activeMenu) {
    return null;
  }

  const filteredData = filterFlatList(activeMenu.id, sortedData);

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
      items={filteredData}
      onToggle={handleToggleMenu}
    />
  );
};
