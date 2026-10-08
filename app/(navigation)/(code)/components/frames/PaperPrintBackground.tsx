import { HalftoneCmyk } from "@paper-design/shaders-react";
import { useAtomValue } from "jotai";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { exportSizeAtom } from "../../store/image";

// The source repeats at a fixed CSS size; the shader supplies the print texture.
const pattern = `
  <defs>
    <filter id="ink-edge" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="12" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <pattern id="print" width="600" height="720" patternUnits="userSpaceOnUse">
      <rect width="600" height="720" fill="#fff" />
      <g fill="#d39143" font-family="monospace" font-size="14" letter-spacing="0.7" opacity="0.85" transform="rotate(-7 300 360)">
        <text x="-32" y="30">Paper Mono — for the love of design</text>
        <text x="330" y="67">Aa Bb Cc / 0123456789</text>
        <text x="16" y="104">Regular · Medium · Bold</text>
        <text x="358" y="142">points, paths, pixels.</text>
        <text x="-36" y="181">The quick brown fox jumps</text>
        <text x="250" y="219">over the lazy dog. 012345</text>
        <text x="32" y="262">abcdefghijklmnopqrstuvwxyz</text>
        <text x="357" y="301">paper.design / mono</text>
        <text x="-25" y="341">FOR THE LOVE OF DESIGN</text>
        <text x="289" y="385">type, texture &amp; a little ink</text>
        <text x="20" y="429">Hamburgefontsiv 0123456789</text>
        <text x="364" y="469">a glyph at a time.</text>
        <text x="-48" y="510">Light / Regular / Medium</text>
        <text x="252" y="550">{ form follows function; }</text>
        <text x="15" y="592">Paper Mono — specimen no. 01</text>
        <text x="344" y="635">Aa Bb Cc / 0123456789</text>
        <text x="-20" y="676">Making room for good ideas.</text>
        <text x="310" y="713">for the love of design</text>
      </g>
      <g fill="none" stroke="#dfa45d" opacity="0.48" stroke-width="0.8">
        <path d="M18 4V165H222M10 13H184M399 18V151H588M380 159H590M28 356V493H191M406 325H580V486M12 601H202V708M320 581V701H582" />
        <path d="M12 91H24M12 131H24M393 69H405M393 109H405M574 373H586M574 413H586M196 650H208M314 639H326" />
      </g>
      <g fill="none" stroke="#dc9b50" stroke-width="12" opacity="0.75">
        <path d="M82 98C82 61 142 59 142 98V147M142 107H108C72 107 75 149 108 149C129 149 142 134 142 118" />
        <path d="M441 237V353M441 313C460 278 510 289 510 323C510 364 456 371 441 343" />
        <path d="M178 570C132 542 105 578 105 617C105 657 146 679 181 650" />
      </g>
      <g fill="#4383cc" filter="url(#ink-edge)">
        <path d="M428 29C453 8 483 25 487 54C491 79 468 91 476 119C483 146 526 148 526 179C526 209 497 220 478 201C458 180 461 160 446 138C422 103 398 94 407 64C410 49 420 42 428 29Z" opacity="0.78" />
        <path d="M474 86C525 80 549 116 536 157C524 189 539 219 565 245L558 262C512 229 509 198 518 160C527 122 509 107 477 105Z" opacity="0.48" />
        <path d="M18 203C3 182 6 163 23 154C39 174 35 192 18 203ZM25 226C39 201 57 197 69 208C62 229 45 237 25 226ZM15 252C-2 234 2 215 11 210C30 222 31 239 15 252Z" opacity="0.52" />
        <path d="M32 478C58 455 76 468 75 491C73 515 45 522 53 547C62 571 92 565 106 590C119 615 104 638 83 631C58 623 63 600 43 586C22 571 12 549 22 526C32 504 16 496 32 478Z" opacity="0.82" />
        <path d="M77 591C126 595 137 636 164 660C187 681 229 662 246 697L236 708C212 681 185 708 153 681C120 653 119 618 78 610Z" opacity="0.7" />
        <path d="M551 552C531 516 513 504 487 503C494 525 511 544 551 552ZM554 571C528 561 502 566 490 587C518 595 540 590 554 571ZM574 606C560 579 565 557 585 547C597 570 592 590 574 606Z" opacity="0.62" />
      </g>
      <g fill="none" stroke="#4383cc" stroke-width="3" opacity="0.65">
        <path d="M472 68C441 113 492 189 540 267S511 398 574 465M31 505C14 566 69 594 104 627M486 489C535 516 555 563 588 649" />
      </g>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#print)" />`;

const contextAttributes = { preserveDrawingBuffer: true };

const PaperPrintBackground = ({ className }: { className: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const exportSize = useAtomValue(exportSizeAtom);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (width > 0 && height > 0) {
        setSize((previous) => (previous.width === width && previous.height === height ? previous : { width, height }));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const image = useMemo(
    () =>
      `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">${pattern}</svg>`)}`,
    [size],
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {size.width > 0 && size.height > 0 && (
        <HalftoneCmyk
          width="100%"
          height="100%"
          image={image}
          colorBack="#faf9f3"
          colorC="#479bd6"
          colorM="#cc7996"
          colorY="#e9b65c"
          colorK="#363b43"
          size={0.12}
          gridNoise={0.35}
          type="ink"
          softness={0.55}
          contrast={1}
          floodC={0.035}
          floodM={0.015}
          floodY={0.025}
          floodK={0}
          gainC={0.05}
          gainM={0}
          gainY={0.05}
          gainK={-0.4}
          grainMixer={0.3}
          grainOverlay={0.08}
          grainSize={0.3}
          fit="cover"
          minPixelRatio={exportSize}
          maxPixelCount={32_000_000}
          webGlContextAttributes={contextAttributes}
        />
      )}
    </div>
  );
};

export default PaperPrintBackground;
