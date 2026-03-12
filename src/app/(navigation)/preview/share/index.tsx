/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from '@heroui/react';
import React from 'react';
import { wallpaperOptions } from './config';
import UIView from '@/app-kit/source/UIView';
import { headerIcon } from '@/components/style/header';
import MaskWallpaper, { MaskWallpaperHandlers } from '@/plugins/mask-wallpaper';
import { useImmer } from 'use-immer';
import { COLORS } from './colors';
import { set } from 'lodash';
import grad from '@/json/ui-gradients.json';
import CodingLines from '../widget/aside/primary/coding-lines';
import useSlideEditor from '@/store/hooks/use-editor';
import { BACKGROUND_TYPE } from '@/typings/enums';
import backgroundPurify from '@/utils/background-purify';
import { IonCloseOutline } from '@/app-kit/icons/IonCloseOutline';
import { SolarShareLinear } from '@/app-kit/icons/SolarShareLinear';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@/app-kit/ui/dialog';
import { Button } from '@/app-kit/ui/button';
import { SolarLinkMinimalistic2Linear } from '@/app-kit/icons/SolarLinkMinimalistic2Linear';
import { SolarSquareShareLineLinear } from '@/app-kit/icons/SolarSquareShareLineLinear';

const MORE_COLORS = COLORS.concat(
  grad.map((item) => ({
    text: item?.name,
    colors: item?.gradient?.map((xx) => xx?.color),
  })),
);

// Enums for tabs
enum TabsEnum {
  PATTERNS = 'patterns',
  COLORS = 'colors',
}

type ShareWidgetProps = object;

const ShareWidget: React.FC<ShareWidgetProps> = ({}) => {
  const ref = React.useRef<MaskWallpaperHandlers>(null);
  const [selectedTab, setSelectedTab] = React.useState<TabsEnum>(
    TabsEnum.PATTERNS,
  );

  const [state, setState] = useImmer(wallpaperOptions);
  const onChangeState = React.useCallback(
    (path: string, value: any) => {
      setState((draft) => {
        set(draft, path, value);
      });
    },
    [setState],
  );

  const { currentSlide } = useSlideEditor();

  const PROPERTIES = currentSlide?.background?.properties;
  const TYPE = currentSlide?.background?.type;

  const background = React.useMemo(() => {
    return backgroundPurify(TYPE as BACKGROUND_TYPE, PROPERTIES);
  }, [TYPE, PROPERTIES]);
  return (
    <Dialog modal>
      <DialogTrigger render={<Button variant="outline" />}>
        <SolarShareLinear className={headerIcon({})} />
        {/* Share */}
      </DialogTrigger>
      <DialogPopup showCloseButton={false} className={'max-w-5xl'}>
        <DialogHeader className="flex flex-row gap-1 justify-between items-center">
          <UIView>
            <DialogTitle>Share Your Snippets</DialogTitle>
            <DialogDescription>
              Create a preview link for your code snippet and share it with
              anyone — no download required.
            </DialogDescription>
          </UIView>
          <UIView className="flex items-center gap-2">
            {/* <CreatePasscode /> */}
            <Button variant="outline">
              <SolarSquareShareLineLinear />
            </Button>
            <Button variant="outline">
              <SolarLinkMinimalistic2Linear />
            </Button>
            <DialogClose render={<Button variant="outline" />}>
              <IonCloseOutline />
            </DialogClose>
          </UIView>
        </DialogHeader>
        <DialogPanel className="flex">
          <UIView className="flex flex-col justify-center items-center gap-2  border border-default-100 relative rounded-2xl overflow-hidden w-full min-h-96">
            <MaskWallpaper ref={ref} options={state} />
            <UIView className="z-10">
              <UIView
                className={
                  'flex items-center justify-center min-w-96 min-h-60 rounded-2xl shadow-lg border border-default-200'
                }
                style={{
                  background,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transition: '100ms ease-in',
                }}
              >
                <UIView
                  className={
                    'flex items-center justify-center bg-black/50 backdrop-blur-lg w-2/3 rounded-xl overflow-hidden p-2'
                  }
                >
                  <CodingLines />
                </UIView>
              </UIView>
            </UIView>
          </UIView>
          {/* <UIView className="flex flex-col gap-2 w-1/4">
            <UIView className="flex items-center justify-between">
              <Tabs
                fullWidth
                size="sm"
                variant="bordered"
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as TabsEnum)}
              >
                <Tab title="Patterns" key={TabsEnum.PATTERNS} />
                <Tab title="Colors" key={TabsEnum.COLORS} />
              </Tabs>
            </UIView>
            {selectedTab === TabsEnum.COLORS && (
              <UIView className="grid grid-cols-2 overflow-auto gap-2 max-h-96">
                {MORE_COLORS.map((color) => (
                  <Card
                    key={color.text}
                    isPressable
                    isFooterBlurred
                    className={`overflow-none relative border border-default-100 h-28 ${
                      state.colors === color.colors ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => onChangeState('colors', color.colors)}
                  >
                    <UIView
                      style={{
                        backgroundImage: `linear-gradient(45deg, ${color?.colors?.join(', ')})`,
                      }}
                      className="h-40 w-full"
                    ></UIView>
                    <CardFooter className="before:bg-white/10 border-white/20 border overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-default font-bold">
                        {color.text}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </UIView>
            )}
            {selectedTab === TabsEnum.PATTERNS && (
              <UIView className="grid grid-cols-2 overflow-auto gap-2 max-h-96">
                {PATTERNS.map((pattern) => (
                  <Card
                    key={pattern.path}
                    isPressable
                    isFooterBlurred
                    className={`overflow-none relative border border-default-100 h-28 ${
                      state.pattern === pattern.path ? 'ring-2 ring-accent' : ''
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(45deg, ${state?.colors?.join(', ')})`,
                    }}
                    onClick={() => onChangeState('pattern.image', pattern.path)}
                  >
                    <Image
                      alt={pattern.text}
                      src={pattern.path}
                      className="object-cover w-full mix-blend-multiply"
                      removeWrapper
                    />
                    <CardFooter className="before:bg-white/10 border-white/20 border overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-8px)] shadow-small ml-1 z-10">
                      <p className="text-xs text-default font-bold">
                        {pattern.text}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </UIView>
            )}
            <UIView className="flex flex-col gap-2 w-full">
              <Accordion variant="bordered">
                <AccordionItem
                  startContent={
                    <SolarTuningSquareLineDuotone className="h-4 w-4 opacity-80" />
                  }
                  key="1"
                  aria-label="Advanced Options"
                  title="Advanced Options"
                  classNames={{
                    title: 'text-sm',
                  }}
                >
                  <UIView className="flex flex-col gap-2">
                    <UIView className="flex gap-2">
                      <Checkbox
                        size="sm"
                        color="success"
                        isSelected={state.pattern?.mask}
                        onValueChange={() =>
                          onChangeState('pattern.mask', !state.pattern?.mask)
                        }
                      >
                        Mask
                      </Checkbox>
                      <Checkbox
                        size="sm"
                        color="success"
                        isSelected={state.animate}
                        onValueChange={() =>
                          onChangeState('animate', !state.animate)
                        }
                      >
                        Animate
                      </Checkbox>
                    </UIView>
                    <Slider
                      size="sm"
                      step={10}
                      minValue={128}
                      maxValue={768}
                      label="Size (px)"
                      color="foreground"
                      value={Number(state.pattern?.size?.replace('px', ''))}
                      onChange={(v) => onChangeState('pattern.size', `${v}px`)}
                    />
                    <Slider
                      size="sm"
                      step={0.1}
                      minValue={0}
                      maxValue={1}
                      label="Opacity"
                      color="foreground"
                      value={Number(state.pattern?.opacity)}
                      onChange={(v) => onChangeState('pattern.opacity', v)}
                    />
                    <span className="h-1" />
                  </UIView>
                </AccordionItem>
              </Accordion>
              <Divider />
              <Button
                variant="outline"
                onClick={() => setState(wallpaperOptions)}
              >
                Reset
              </Button>
            </UIView>
          </UIView> */}
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
};

export default ShareWidget;

{
  /* <Switch
                  size="sm"
                  isSelected={state.pattern?.mask}
                  onValueChange={() =>
                    onChangeState('pattern.mask', !state.pattern?.mask)
                  }
                  color="success"
                  aria-label="Theme Mode"
                  thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                      <Icon
                        icon={'solar:sun-2-bold-duotone'}
                        className={className}
                      />
                    ) : (
                      <Icon
                        icon={'solar:moon-stars-bold-duotone'}
                        className={className}
                      />
                    )
                  }
                >
                  Theme Mode
                </Switch>

                <Switch
                  size="sm"
                  color="success"
                  isSelected={state.animate}
                  onValueChange={() => onChangeState('animate', !state.animate)}
                >
                  Animate
                </Switch> */
}
{
  /* <Button
                  variant="bordered"
                  onClick={() => ref.current?.toNextPosition()}
                  isIconOnly
                >
                  <Icon icon={'solar:refresh-line-duotone'} />
                </Button> */
}
{
  /* <Button
                  variant="bordered"
                  onClick={() => setState(wallpaperOptions)}
                  isIconOnly
                >
                  <Icon icon={'solar:skip-previous-line-duotone'} />
                </Button>
                <Button
                  variant="bordered"
                  onClick={() => setState(wallpaperOptions)}
                  isIconOnly
                >
                  <Icon icon={'solar:skip-next-line-duotone'} />
                </Button> */
}
