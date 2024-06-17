import gridItem1Light from "@themes/assets/grid-item-1-light.jpg";
import gridItem2Light from "@themes/assets/grid-item-2-light.jpg";
import gridItem3Light from "@themes/assets/grid-item-3-light.jpg";
import gridItem4Light from "@themes/assets/grid-item-4-light.jpg";
import gridItem5Light from "@themes/assets/grid-item-5-light.jpg";
import gridItem1Dark from "@themes/assets/grid-item-1-dark.jpg";
import gridItem2Dark from "@themes/assets/grid-item-2-dark.jpg";
import gridItem3Dark from "@themes/assets/grid-item-3-dark.jpg";
import gridItem4Dark from "@themes/assets/grid-item-4-dark.jpg";
import gridItem5Dark from "@themes/assets/grid-item-5-dark.jpg";

const images = {
  light: [gridItem1Light.src, gridItem2Light.src, gridItem3Light.src, gridItem4Light.src, gridItem5Light.src],
  dark: [gridItem1Dark.src, gridItem2Dark.src, gridItem3Dark.src, gridItem4Dark.src, gridItem5Dark.src],
};

export function Grid({ mode }: { mode: "light" | "dark" }) {
  return (
    <div className="py-1 px-2 text-[--text]">
      <div className="p-2 text-xs leading-none font-medium tracking-[0.1px] text-[--text-600]">Grid</div>
      <div className="grid grid-cols-5 gap-2 px-2">
        <div>
          <div
            className="rounded-lg w-[138px] h-[138px] mb-1"
            style={{
              backgroundImage: `url(${images[mode][0]})`,
              boxShadow: `inset 0 0 0 2px var(--selection)`,
            }}
          />
          <div className="text-sm">Troopie Loop</div>
          <div className="text-xs text-[--text-600]">512×512</div>
        </div>
        <div>
          <div className="rounded-lg w-[138px] h-[138px] mb-1" style={{ backgroundImage: `url(${images[mode][1]})` }} />
          <div className="text-sm">Milkey Rave</div>
          <div className="text-xs text-[--text-600]">512×512</div>
        </div>
        <div>
          <div className="rounded-lg w-[138px] h-[138px] mb-1" style={{ backgroundImage: `url(${images[mode][2]})` }} />
          <div className="text-sm">Gaze</div>
          <div className="text-xs text-[--text-600]">512×512</div>
        </div>
        <div>
          <div className="rounded-lg w-[138px] h-[138px] mb-1" style={{ backgroundImage: `url(${images[mode][3]})` }} />
          <div className="text-sm">Burning Orbet</div>
          <div className="text-xs text-[--text-600]">512×512</div>
        </div>
        <div>
          <div className="rounded-lg w-[138px] h-[138px] mb-1" style={{ backgroundImage: `url(${images[mode][4]})` }} />
          <div className="text-sm">Moon</div>
          <div className="text-xs text-[--text-600]">512×512</div>
        </div>
      </div>
    </div>
  );
}
