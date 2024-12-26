import { AppContainer } from "@/core/module/app/container";
import Tree from "@/core/ui/components/tree/Tree.component";
import { MenuContainer } from "@/features/menu/container";
import clsx from "clsx";

export default function Home() {
  return (
    <AppContainer>
      <MenuContainer />
    </AppContainer>
  );
}
