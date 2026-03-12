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
  | "openai_o1-o3"
  | "openai_o1-o4-mini"
  | "openai_o1-o1"
  | "openai_o1-o3-mini"
  | "groq-openai/gpt-oss-20b"
  | "groq-openai/gpt-oss-120b"
  | "anthropic-claude-haiku"
  | "anthropic-claude-sonnet"
  | "anthropic-claude-3-7-sonnet-latest"
  | "anthropic-claude-3-7-sonnet-latest-reasoning"
  | "anthropic-claude-sonnet-4"
  | "anthropic-claude-opus-4"
  | "anthropic-claude-sonnet-4-reasoning"
  | "anthropic-claude-opus-4-reasoning"
  | "anthropic-claude-opus-4-1"
  | "anthropic-claude-opus-4-1-reasoning"
  | "perplexity-sonar"
  | "perplexity-sonar-pro"
  | "perplexity-sonar-reasoning"
  | "perplexity-sonar-reasoning-pro"
  | "groq-meta-llama/llama-4-scout-17b-16e-instruct"
  | "groq-llama-3.3-70b-versatile"
  | "groq-llama-3.1-8b-instant"
  | "together-meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"
  | "mistral-open-mistral-nemo"
  | "mistral-mistral-large-latest"
  | "mistral-mistral-medium-latest"
  | "mistral-mistral-small-latest"
  | "mistral-codestral-latest"
  | "groq-moonshotai/kimi-k2-instruct"
  | "groq-qwen/qwen3-32b"
  | "groq-deepseek-r1-distill-llama-70b"
  | "google-gemini-2.5-pro"
  | "google-gemini-2.5-flash"
  | "google-gemini-2.5-flash-lite"
  | "google-gemini-2.0-flash"
  | "together-Qwen/Qwen3-235B-A22B-Instruct-2507-tput"
  | "together-deepseek-ai/DeepSeek-R1"
  | "together-deepseek-ai/DeepSeek-V3"
  | "xai-grok-4"
  | "xai-grok-3"
  | "xai-grok-3-mini"
  | "xai-grok-2-latest";

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
