import { CSSProperties } from "react";

/* ---------------------------------- */
/* Utilities */
/* ---------------------------------- */

export type AnyRecord = Record<string, unknown>;

/* ---------------------------------- */
/* Enums */
/* ---------------------------------- */

export enum InitialValues {
  SLIDE_ID = "initial_slide_id",
  ELEMENT_ID = "initial_element_id",
}

export enum BACKGROUND_TYPE {
  COLOR = "color",
  GRADIENT = "gradient",
  IMAGE = "image",
  VIDEO = "video",
  PATTERN = "pattern",
}

export enum ELEMENTS {
  CODE = "ELEMENT::CODE",
  TEXT = "ELEMENT::TEXT",
  IMAGE = "ELEMENT::IMAGE",
  ICON = "ELEMENT::ICON",
  WATERMARK = "ELEMENT::WATERMARK",
  USERINFO = "ELEMENT::USERINFO",
}

export enum HeaderVariants {
  FILLED = "filled",
  OUTLINE = "outline-solid",
  FLAT = "flat",
}

export enum HeaderInputType {
  ICON = "icon",
  INPUT = "input",
  ICON_AND_INPUT = "icon_input",
  NONE = "none",
}

/* ---------------------------------- */
/* Base Types */
/* ---------------------------------- */

export type StyleObject = CSSProperties & AnyRecord;

/* ---------------------------------- */
/* Element Types */
/* ---------------------------------- */

export type ElementProperties = {
  language?: string;
  theme?: string;
  darkMode?: boolean;
  transparent?: boolean;
  showLineNumbers?: boolean;
  highlightedLines?: number[];
  // glassmorphism?: {
  //   opacity: number;
  //   enabled: boolean;
  //   blur: number;
  // };
} & AnyRecord;

export type ElementType = {
  id?: string;
  type?: ELEMENTS;
  content?: unknown;
  style?: StyleObject;
  header?: SlideHeaderType;
  watermark?: SlideWatermarkType;
  properties?: ElementProperties;
};

/* ---------------------------------- */
/* Background */
/* ---------------------------------- */

export type SlideBackgroundTypes = {
  type?: BACKGROUND_TYPE;

  style?: {
    width?: number;
    height?: number;
    size?: string;
    position?: string;
    repeat?: string;
  } & AnyRecord;

  properties?: {
    watermark?: boolean;
    aspectRatio?: string;
    source?: string;
  } & AnyRecord;
};

/* ---------------------------------- */
/* Header */
/* ---------------------------------- */

export type SlideHeaderType = {
  variant?: HeaderVariants;
  type?: string;
  theme?: string;
  input?: HeaderInputType;
  position?: "left" | "center" | "right";

  style?: {
    background?: string;
  } & AnyRecord;

  properties?: {
    colors?: {
      name: string;
      hex: string;
    }[];

    title?: {
      text?: string;
      icon?: string;
    };
  } & AnyRecord;
};

/* ---------------------------------- */
/* Watermark */
/* ---------------------------------- */

export type SlideWatermarkType = {
  text?: string;
  image?: string;

  style?: {
    opacity?: number;
    fontSize?: string;
    color?: string;
    position?: string;
  } & AnyRecord;
};

/* ---------------------------------- */
/* Slide */
/* ---------------------------------- */

export type SlideTypes = {
  id: string;
  name: string;
  background?: SlideBackgroundTypes;
  elements: ElementType[];
};

/* ---------------------------------- */
/* State */
/* ---------------------------------- */

export type SlideStateType = {
  slides: SlideTypes[];
} & AnyRecord;

export type EditorState = {
  slides: Record<string, SlideTypes>;
  elements: Record<string, ElementType>;
  slideElements: Record<string, string[]>;
};

/* ---------------------------------- */
/* Actions */
/* ---------------------------------- */

export type SlideActionType = {
  createSlide: (slide: SlideTypes) => void;

  updateSlide: (id: string, slide: Partial<Omit<SlideTypes, "id" | "elements">>) => void;

  deleteSlide: (id: string) => void;

  duplicateSlide: (id: string) => void;

  createSlideElement: (slideId: string, element: ElementType) => void;

  updateSlideElement: (slideId: string, elementId: string, element: Partial<ElementType>) => void;

  deleteSlideElement: (slideId: string, elementId: string) => void;

  duplicateSlideElement: (slideId: string, elementId: string) => void;

  reset: () => void;
};

/* ---------------------------------- */
/* Fonts */
/* ---------------------------------- */

export type Font = {
  id: string;
  name: string;
  fontFamily: string;
};

/* ---------------------------------- */
/* Theme */
/* ---------------------------------- */

export type Theme = {
  id: string;
  name: string;

  background: {
    from: string;
    to: string;
  };

  icon?: string;
  iconUrl?: string;
  font?: string;

  group: string;

  hidden?: boolean;

  /**
   * @deprecated
   */
  partner?: boolean;

  lineNumbers?: boolean;
  lineNumbersToggleable?: boolean;

  syntax: { light: CSSProperties; dark?: CSSProperties } | { light?: CSSProperties; dark: CSSProperties };
};
