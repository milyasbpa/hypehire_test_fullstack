import Tree from "@/core/ui/components/Tree.component";
import Image from "next/image";

type MenuItem = {
  id: string;
  name: string;
  parentId: string | null; // `null` for root items
  depth: number;
  children?: MenuItem[]; // For nesting
};

export default function Home() {
  const menuItems: MenuItem[] = [
    { id: "1", name: "System Management", parentId: null, depth: 1 },
    { id: "2", name: "Systems", parentId: "1", depth: 2 },
    { id: "3", name: "System Code", parentId: "2", depth: 3 },
    { id: "5", name: "API Lis", parentId: "1", depth: 2 },
    { id: "4", name: "Code Registration", parentId: "3", depth: 4 },
  ];

  return (
    <div className="grid grid-cols-1 items-start justify-items-start min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Menus</h1>
      <Tree items={menuItems} />
    </div>
  );
}
