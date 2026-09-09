export type Model =
  | "raycast-ray1"
  | "raycast-ray1-mini"
  | "openai-gpt-5-mini"
  | "openai-gpt-5-nano"
  | "openai-gpt-4.1"
  | "openai-gpt-4.1-mini"
  | "openai-gpt-4.1-nano"
  | "openai-gpt-4"
  | "openai-gpt-4-turbo"
  | "openai-gpt-4o"
  | "openai-gpt-4o-mini"
  | "openai_o1-gpt-5"
  | "openai-gpt-5-reasoning"
  | "openai-gpt-5.1"
  | "openai-gpt-5.1-reasoning"
  | "openai-gpt-5.2"
  | "openai-gpt-5.2-reasoning"
  | "openai-gpt-5.2-instant"
  | "openai-gpt-5.3-instant"
  | "openai-gpt-5.3-codex"
  | "openai-gpt-5.4"
  | "openai-gpt-5.4-reasoning"
  | "openai-gpt-5.4-mini"
  | "openai-gpt-5.4-nano"
  | "openai-gpt-5.5"
  | "openai-gpt-5.5-instant"
  | "openai-gpt-5.6-sol"
  | "openai-gpt-5.6-terra"
  | "openai-gpt-5.6-luna"
  | "openai-gpt-6-astra"
  | "openai_o1-o3"
  | "openai_o1-o4-mini"
  | "openai_o1-o1"
  | "openai_o1-o3-mini"
  | "groq-openai/gpt-oss-20b"
  | "groq-openai/gpt-oss-120b"
  | "anthropic-claude-4-5-haiku"
  | "anthropic-claude-4-5-haiku-reasoning"
  | "anthropic-claude-sonnet-4-5"
  | "anthropic-claude-sonnet-4-6"
  | "anthropic-claude-sonnet-4-5-reasoning"
  | "anthropic-claude-sonnet-4-6-reasoning"
  | "anthropic-claude-sonnet-5"
  | "anthropic-claude-opus-4-7"
  | "anthropic-claude-opus-4-8"
  | "anthropic-claude-opus-5"
  | "perplexity-sonar"
  | "perplexity-sonar-pro"
  | "perplexity-sonar-reasoning-pro"
  | "mistral-open-mistral-nemo"
  | "mistral-mistral-large-latest"
  | "mistral-mistral-medium-latest"
  | "mistral-mistral-small-latest"
  | "mistral-codestral-latest"
  | "google-gemini-3.8-flash"
  | "google-gemini-3.7-flash"
  | "google-gemini-3.6-flash"
  | "google-gemini-3.5-flash"
  | "google-gemini-3.5-flash-lite"
  | "google-gemini-3.1-flash-lite"
  | "google-gemini-3-flash"
  | "google-gemini-3.1-pro"
  | "google-gemini-2.5-pro"
  | "google-gemini-2.5-flash"
  | "google-gemini-2.5-flash-lite"
  | "xai-grok-4.6"
  | "xai-grok-4.5"
  | "xai-grok-4.3"
  | "xai-grok-4.20"
  | "xai-grok-4.20-reasoning"
  | "gateway-zai/glm-5.2"
  | "gateway-zai/glm-5.3"
  | "gateway-zai/glm-5.3-flash"
  | "gateway-moonshotai/kimi-k2.7-code"
  | "gateway-moonshotai/kimi-k3"
  | "gateway-google/gemma-4-31b-it"
  | "gateway-thinkingmachines/inkling"
  | "gateway-thinkingmachines/inkling-small"
  | "gateway-deepseek/deepseek-v4-flash"
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
