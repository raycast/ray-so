import {
  BrandAnthropicIcon,
  BrandMetaIcon,
  BrandMistralIcon,
  BrandOpenaiIcon,
  BrandPerplexityIcon,
} from "@raycast/icons";
import { Preset } from "../presets";

export default function ModelIcon({ model }: { model: Preset["model"] }) {
  let component = null;
  if (model?.includes("openai")) {
    component = <BrandOpenaiIcon />;
  }

  if (model?.includes("anthropic")) {
    component = <BrandAnthropicIcon />;
  }

  if (model?.includes("perplexity")) {
    component = <BrandPerplexityIcon />;
  }

  if (model?.includes("llama")) {
    component = <BrandMetaIcon />;
  }

  if (model?.includes("mixtral")) {
    component = <BrandMistralIcon />;
  }

  return component;
}
