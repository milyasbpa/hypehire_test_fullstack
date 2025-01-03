"use client";
import { MenuItemComponent } from "@/core/module/app/redux/store/menuSlice.app";
import React from "react";
import clsx from "clsx";
import { Chevron } from "../../icons/chevron";
import { buildTree } from "@/core/utils/tree";
import SVGIcon from "../../icons";

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
            {!hasChildren && (
              <button
                className={clsx(
                  "flex items-center justify-center",
                  "w-[26px] h-[26px]",
                  "bg-[#253BFF]",
                  "rounded-[50%]",
                  "cursor-pointer"
                )}
                onClick={() => onAdd(node.id)}
              >
                <SVGIcon
                  name="Trailing"
                  className={clsx(
                    "w-[0.875rem] h-[0.875rem]",
                    "stroke-[white]"
                  )}
                />
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
