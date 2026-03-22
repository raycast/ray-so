import React from "react";
import View from "@/components/view";
import ThemeControl from "./themes";
import PaddingControl from "./padding";
import LanguageControl from "./language";
import OptionsControl from "./options";
import FontFaceControl from "./font-face";
import SliderControl from "./slide-control";
import { Card, CardPanel } from "@/components/ui/card";

const Controls: React.FC = () => {
  // const elementState = useAtomValue(currentElementAtom);

  // React.useEffect(() => {
  //   console.log("elm", elementState);
  // }, [elementState]);

  return (
    <div className="flex flex-col gap-2 fixed bottom-4 left-1/2 -translate-x-1/2">
      <View className="flex items-center justify-center">
        <SliderControl />
      </View>
      <Card className="w-full bg-card/75 backdrop-blur-3xl">
        <CardPanel className="flex flex-row gap-3 p-3">
          <ThemeControl />
          <PaddingControl />
          <LanguageControl />
          <FontFaceControl />
          <OptionsControl />
        </CardPanel>
      </Card>
    </div>
  );
};

export default Controls;
