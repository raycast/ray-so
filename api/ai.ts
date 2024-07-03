export type Model =
  | "openai-gpt-3.5-turbo-instruct"
  | "openai-gpt-3.5-turbo"
  | "openai-gpt-4"
  | "openai-gpt-4-turbo"
  | "anthropic-claude-haiku"
  | "anthropic-claude-opus"
  | "anthropic-claude-sonnet"
  | "perplexity-sonar-medium-online"
  | "perplexity-sonar-small-online"
  | "llama2-70b"
  | "mixtral-8x7b"
  | "codellama-70b-instruct";

export type AiModel = {
  id: Model;
  name: string;
  description: string;
  availability: "public" | "beta" | "internal" | "deprecated";
  features: string[];
  suggestions: string[];
  abilities: {
    image_generation: {
      model: string;
    };
    web_search: {
      toggleable: boolean;
    };
  };
  in_better_ai_subscription: boolean;
  model: string;
  provider: string;
  provider_name: string;
  provider_brand: string;
  speed: number;
  intelligence: number;
  requires_better_ai: boolean;
  context: number;
};

export async function getAvailableAiModels() {
  const res = await fetch("https://raycast.com/api/v1/ai/models");
  const models = await res.json();
  return models.models as AiModel[];
}
