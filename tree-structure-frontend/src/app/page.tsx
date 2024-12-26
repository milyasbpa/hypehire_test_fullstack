import { AppContainer } from "@/core/module/app/container";
import { MenuContainer } from "@/features/menu/container";

export default function Home() {
  return (
    <AppContainer>
      <MenuContainer />
    </AppContainer>
  );
}
