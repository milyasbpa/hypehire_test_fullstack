"use client";
import { MenuItemComponent } from "@/core/module/app/redux/store/menuSlice.app";
import React from "react";
import clsx from "clsx";
import { Chevron } from "../../icons/chevron";

export type MenuItem = MenuItemComponent;

type TreeProps = {
  items: MenuItem[];
  expandedNodes?: Record<string, boolean>;
  onAdd?: (parentId: string) => void;
  onToggle?: (id: string) => void;
};

const Tree: React.FC<TreeProps> = ({
  items = [],
  expandedNodes = {},
  onAdd = () => {},
  onToggle = () => {},
}) => {
  // Helper function to toggle node expansion
  const toggleNode = (id: string) => {
    onToggle(id);
  };

  // Helper function to sort and build a nested tree
  const buildTree = (items: MenuItem[]): MenuItem[] => {
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

  const renderTree = (nodes: MenuItem[]) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes[node.id] ?? false;
      const hasChildren = node.children && node.children.length > 0;
      return (
        <li
          key={node.id}
          className={`relative tree-node ${
            node.parentId === null ? "parent-null" : ""
          }`}
        >
          <div
            className="flex items-center gap-2"
            style={{
              paddingLeft: `${(node.depth - 1) * 16}px`,
            }}
          >
            {hasChildren && (
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => toggleNode(node.id)}
              >
                {isExpanded ? (
                  <div>
                    <Chevron
                      className={clsx("w-[1rem] h-[1rem]", "stroke-[#101828]")}
                    />
                  </div>
                ) : (
                  <div className={clsx("-rotate-90")}>
                    <Chevron
                      className={clsx("w-[1rem] h-[1rem]", "stroke-[#101828]")}
                    />
                  </div>
                )}
              </button>
            )}
            <span>{node.name}</span>
            {onAdd && (
              <button className="text-blue-500" onClick={() => onAdd(node.id)}>
                +
              </button>
            )}
          </div>
          {/* {node.children && <ul>{renderTree(node.children)}</ul>} */}
          {hasChildren && isExpanded && (
            <ul className="pl-4">{renderTree(node.children!)}</ul>
          )}
        </li>
      );
    });
  };

  const treeData = buildTree(items);

  return <ul className="tree-container">{renderTree(treeData)}</ul>;
};

export default Tree;
