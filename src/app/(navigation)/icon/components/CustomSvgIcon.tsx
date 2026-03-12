import parseHtmlAsReact, { DOMNode, Element, attributesToProps, domToReact } from "html-react-parser";

type PropTypes = {
  svgSource: string;
} & React.SVGProps<SVGSVGElement>;

const CustomSvgIcon: React.FC<PropTypes> = ({ svgSource, ...props }) => {
  const result = parseHtmlAsReact(svgSource, {
    replace: (node) => {
      if (node.type === "tag" && "name" in node && node.name === "svg") {
        const svgProps = attributesToProps(node.attribs);
        return <svg {...{ ...svgProps, ...props }}>{domToReact((node as Element).children as DOMNode[])}</svg>;
      }
    },
  });
  if (result instanceof Array) {
    return <>{result}</>;
  } else if (typeof result === "string") {
    return null;
  } else {
    return result;
  }
};

export default CustomSvgIcon;
