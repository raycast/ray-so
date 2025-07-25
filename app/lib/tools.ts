export interface Tool {
  id: number;
  name: string;
  icon: string;
  color?: string;
  url?: string;
}

export type CategoryType = "frontend" | "backend" | "database" | "infra" | "devops";

export const tools: Record<CategoryType, Tool[]> = {
  frontend: [
    {
      id: 1,
      name: "React",
      icon: "/icons/react.svg",
      url: "https://react.dev",
    },
    {
      id: 2,
      name: "Next.js",
      icon: "/icons/nextjs.svg",
      url: "https://nextjs.org",
    },
    {
      id: 3,
      name: "Vue",
      icon: "/icons/vue.svg",
      url: "https://vuejs.org",
    },
    {
      id: 4,
      name: "Angular",
      icon: "/icons/angular.svg",
      url: "https://angular.io",
    },
    {
      id: 5,
      name: "Svelte",
      icon: "/icons/svelte.svg",
      url: "https://svelte.dev",
    },
    {
      id: 6,
      name: "Tailwind CSS",
      icon: "/icons/tailwind.svg",
      url: "https://tailwindcss.com",
    },
    {
      id: 7,
      name: "JavaScript",
      icon: "/icons/javascript.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      id: 8,
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      url: "https://www.typescriptlang.org",
    },
  ],
  backend: [
    {
      id: 9,
      name: "Node.js",
      icon: "/icons/nodejs.svg",
      url: "https://nodejs.org",
    },
    {
      id: 10,
      name: "Go",
      icon: "/icons/go.svg",
      url: "https://go.dev",
    },
    {
      id: 11,
      name: "Python",
      icon: "/icons/python.svg",
      url: "https://www.python.org",
    },
  ],
  database: [
    {
      id: 12,
      name: "PostgreSQL",
      icon: "/icons/postgresql.svg",
      url: "https://www.postgresql.org",
    },
    {
      id: 13,
      name: "MySQL",
      icon: "/icons/mysql.svg",
      url: "https://www.mysql.com",
    },
    {
      id: 14,
      name: "SQLite",
      icon: "/icons/sqlite.svg",
      url: "https://www.sqlite.org",
    },
    {
      id: 15,
      name: "MongoDB",
      icon: "/icons/mongodb.svg",
      url: "https://www.mongodb.com",
    },
    {
      id: 16,
      name: "Redis",
      icon: "/icons/redis.svg",
      url: "https://redis.io",
    },
  ],
  infra: [
    {
      id: 17,
      name: "AWS",
      icon: "/icons/aws.svg",
      url: "https://aws.amazon.com",
    },
    {
      id: 18,
      name: "Google Cloud",
      icon: "/icons/gcp.svg",
      url: "https://cloud.google.com",
    },
    {
      id: 19,
      name: "Azure",
      icon: "/icons/azure.svg",
      url: "https://azure.microsoft.com",
    },
  ],
  devops: [
    {
      id: 20,
      name: "Docker",
      icon: "/icons/docker.svg",
      url: "https://www.docker.com",
    },
    {
      id: 21,
      name: "Kubernetes",
      icon: "/icons/kubernetes.svg",
      url: "https://kubernetes.io",
    },
  ],
};
