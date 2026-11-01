export type Model =
  | "raycast-ray1"
  | "raycast-ray1-mini"
  | "openai-gpt-5.4"
  | "openai-gpt-5.4-reasoning"
  | "openai-gpt-5.4-mini"
  | "openai-gpt-5.5"
  | "openai-gpt-5.5-instant"
  | "openai-gpt-5.6-terra"
  | "openai-gpt-5.6-luna"
  | "openai-gpt-6-astra"
  | "openai-gpt-6-sol"
  | "openai-gpt-6.1-sol"
  | "openai-gpt-6.1-terra"
  | "openai-gpt-6-luna"
  | "groq-openai/gpt-oss-20b"
  | "groq-openai/gpt-oss-120b"
  | "anthropic-claude-4-5-haiku"
  | "anthropic-claude-4-5-haiku-reasoning"
  | "anthropic-claude-haiku-5-5"
  | "anthropic-claude-sonnet-4-6"
  | "anthropic-claude-sonnet-4-6-reasoning"
  | "anthropic-claude-sonnet-5"
  | "anthropic-claude-sonnet-5-5"
  | "anthropic-claude-opus-5"
  | "anthropic-claude-opus-5-5"
  | "anthropic-claude-fable-5-1"
  | "perplexity-sonar"
  | "perplexity-sonar-pro"
  | "perplexity-sonar-reasoning-pro"
  | "gateway-meta/muse-spark-1.3"
  | "gateway-meta/muse-wonder-1.0"
  | "mistral-open-mistral-nemo"
  | "mistral-mistral-large-latest"
  | "mistral-mistral-medium-latest"
  | "mistral-mistral-small-latest"
  | "mistral-codestral-latest"
  | "google-gemini-4-argon"
  | "google-gemini-3.8-flash"
  | "google-gemini-3.7-flash"
  | "google-gemini-3.5-flash-lite"
  | "google-gemini-3.1-pro"
  | "xai-grok-4.7"
  | "xai-grok-4.6"
  | "gateway-zai/glm-5.2"
  | "gateway-zai/glm-5.3"
  | "gateway-zai/glm-5.3-flash"
  | "gateway-moonshotai/kimi-k2.7-code"
  | "gateway-moonshotai/kimi-k3"
  | "gateway-moonshotai/kimi-k3.1-pro"
  | "gateway-google/gemma-4-31b-it"
  | "gateway-thinkingmachines/inkling"
  | "gateway-thinkingmachines/inkling-small"
  | "gateway-deepseek/deepseek-v4-flash"
  | "gateway-deepseek/deepseek-v4.1-flash"
  | "gateway-deepseek/deepseek-v4-pro-0813"
  | "gateway-alibaba/qwen3.8-max";

export type AiModel = {
  id: Model;
  name: string;
  description: string;
  status: string | null;
  features: string[];
  suggestions: string[];
  capabilities: {
    web_search?: "full" | "always_on";
    image_generation?: "full";
  };
  in_better_ai_subscription: boolean;
  model: string;
  provider: string;
  provider_name: string;
  provider_brand: string;
  abilities: {
    web_search?: {
      toggleable: boolean;
      native?: boolean;
    };
    image_generation?: {
      model: string;
    };
    vision?: {
      formats: string[];
    };
    system_message?: {
      supported: boolean;
    };
    temperature?: {
      supported: boolean;
    };
    tools?: {
      supported: boolean;
      limit?: number;
    };
    reasoning_effort?: {
      supported: boolean;
      options: string[];
      default: string;
    };
    thinking?: {
      supported: boolean;
    };
    streaming?: {
      supported: boolean;
    };
    auto_model_high_reasoning?: {
      supported: boolean;
    };
  };
  availability: "public" | "beta" | "internal" | "deprecated";
  speed: number;
  intelligence: number;
  requires_better_ai: boolean;
  context: number;
};

export async function getAvailableAiModels() {
  const res = await fetch("https://www.raycast.com/api/v1/ai/models", {
    next: {
      revalidate: 24 * 3600,
    },
  });
  const data = await res.json();
  return data.models;
}
