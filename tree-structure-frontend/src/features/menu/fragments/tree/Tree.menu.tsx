"use client";
import { setExpandedNodes } from "@/core/module/app/redux/store/menuSlice.app";
import { RootState } from "@/core/module/app/redux/store/store.app";
import Tree from "@/core/ui/components/tree/Tree.component";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const TreeMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const expandedNodes = useSelector(
    (state: RootState) => state.menu.expandedNodes
  );

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
      items={menuItems}
      onToggle={handleToggleMenu}
    />
  );
};
