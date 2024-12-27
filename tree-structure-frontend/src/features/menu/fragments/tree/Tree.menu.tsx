"use client";
import {
  setExpandedNodes,
  setNewMenu,
} from "@/core/module/app/redux/store/menuSlice.app";
import { RootState } from "@/core/module/app/redux/store/store.app";
import Tree from "@/core/ui/components/tree/Tree.component";
import { filterFlatList } from "@/core/utils/tree";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";

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

  const handleAddMenu = (parentId: string) => {
    const newMenu = {
      id: uuidV4(),
      name: "",
      parentId: parentId,
      depth: (menuItems.find((item) => item.id === parentId)?.depth ?? 0) + 1,
      createdAt: "",
      updatedAt: "",
    };

    dispatch(setNewMenu(newMenu));
  };

  return (
    <Tree
      expandedNodes={expandedNodes}
      items={filteredData}
      onToggle={handleToggleMenu}
      onAdd={handleAddMenu}
    />
  );
};
