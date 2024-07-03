export type Model =
  | "openai-gpt-3.5-turbo-instruct"
  | "openai-gpt-3.5-turbo"
  | "openai-gpt-4"
  | "openai-gpt-4-turbo"
  | "openai-gpt-4o"
  | "anthropic-claude-haiku"
  | "anthropic-claude-opus"
  | "anthropic-claude-sonnet"
  | "perplexity-sonar-medium-online"
  | "perplexity-sonar-small-online"
  | "perplexity-codellama-70b-instruct"
  | "groq-llama2-70b-4096"
  | "groq-llama3-70b-8192"
  | "groq-mixtral-8x7b-32768";

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
