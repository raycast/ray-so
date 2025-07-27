export interface Tool {
  id: number;
  name: string;
  icon: string;
  color?: string;
  url?: string;
}

export type CategoryType =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'infra'
  | 'devops';

export const tools: Record<CategoryType, Tool[]> = {
  frontend: [
    {
      id: 1,
      name: 'React',
      icon: '/icons/react.svg',
      url: 'https://react.dev',
    },
    {
      id: 2,
      name: 'Next.js',
      icon: '/icons/nextjs.svg',
      url: 'https://nextjs.org',
    },
    {
      id: 3,
      name: 'Vue',
      icon: '/icons/vue.svg',
      url: 'https://vuejs.org',
    },
    {
      id: 4,
      name: 'Angular',
      icon: '/icons/angular.svg',
      url: 'https://angular.io',
    },
    {
      id: 5,
      name: 'Svelte',
      icon: '/icons/svelte.svg',
      url: 'https://svelte.dev',
    },
    {
      id: 6,
      name: 'Tailwind',
      icon: '/icons/tailwind.svg',
      url: 'https://tailwindcss.com',
    },
    {
      id: 7,
      name: 'JavaScript',
      icon: '/icons/javascript.svg',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      id: 8,
      name: 'TypeScript',
      icon: '/icons/typescript.svg',
      url: 'https://www.typescriptlang.org',
    },
    {
      id: 9,
      name: 'jQuery',
      icon: '/icons/jquery.svg',
      url: 'https://jquery.com',
    },
    {
      id: 10,
      name: 'Bootstrap',
      icon: '/icons/bootstrap.svg',
      url: 'https://getbootstrap.com',
    },
    {
      id: 11,
      name: 'Vite',
      icon: '/icons/vite.svg',
      url: 'https://vitejs.dev',
    },
    {
      id: 12,
      name: 'Nuxt.js',
      icon: '/icons/nuxt.svg',
      url: 'https://nuxt.com',
    },
  ],
  backend: [
    {
      id: 13,
      name: 'Node.js',
      icon: '/icons/nodejs.svg',
      url: 'https://nodejs.org',
    },
    {
      id: 14,
      name: 'Go',
      icon: '/icons/go.svg',
      url: 'https://go.dev',
    },
    {
      id: 15,
      name: 'Python',
      icon: '/icons/python.svg',
      url: 'https://www.python.org',
    },
    {
      id: 16,
      name: 'Java',
      icon: '/icons/java.svg',
      url: 'https://www.oracle.com/java/',
    },
    {
      id: 17,
      name: 'C#',
      icon: '/icons/csharp.svg',
      url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
    },
    {
      id: 18,
      name: 'Ruby',
      icon: '/icons/ruby.svg',
      url: 'https://www.ruby-lang.org',
    },
    {
      id: 19,
      name: 'PHP',
      icon: '/icons/php.svg',
      url: 'https://www.php.net',
    },
    {
      id: 20,
      name: 'Rust',
      icon: '/icons/rust.svg',
      url: 'https://www.rust-lang.org',
    },
    {
      id: 21,
      name: 'Express.js',
      icon: '/icons/express.png',
      url: 'https://expressjs.com',
    },
    {
      id: 22,
      name: 'Django',
      icon: '/icons/django.svg',
      url: 'https://www.djangoproject.com',
    },
    {
      id: 23,
      name: 'Laravel',
      icon: '/icons/laravel.svg',
      url: 'https://laravel.com',
    },
    {
      id: 24,
      name: 'Spring Boot',
      icon: '/icons/springboot.svg',
      url: 'https://spring.io/projects/spring-boot',
    },
    {
      id: 25,
      name: 'Ruby on Rails',
      icon: '/icons/rails.svg',
      url: 'https://rubyonrails.org',
    },
    {
      id: 26,
      name: 'FastAPI',
      icon: '/icons/fastapi.png',
      url: 'https://fastapi.tiangolo.com',
    },
  ],
  database: [
    {
      id: 27,
      name: 'PostgreSQL',
      icon: '/icons/postgresql.svg',
      url: 'https://www.postgresql.org',
    },
    {
      id: 28,
      name: 'MySQL',
      icon: '/icons/mysql.svg',
      url: 'https://www.mysql.com',
    },
    {
      id: 29,
      name: 'SQLite',
      icon: '/icons/sqlite.svg',
      url: 'https://www.sqlite.org',
    },
    {
      id: 30,
      name: 'MongoDB',
      icon: '/icons/mongodb.svg',
      url: 'https://www.mongodb.com',
    },
    {
      id: 31,
      name: 'Redis',
      icon: '/icons/redis.svg',
      url: 'https://redis.io',
    },
    {
      id: 32,
      name: 'Elasticsearch',
      icon: '/icons/elasticsearch.svg',
      url: 'https://www.elastic.co',
    },
    {
      id: 33,
      name: 'Supabase',
      icon: '/icons/supabase.svg',
      url: 'https://supabase.com',
    },
    {
      id: 34,
      name: 'Firebase',
      icon: '/icons/firebase.svg',
      url: 'https://firebase.google.com',
    },
    {
      id: 35,
      name: 'DynamoDB',
      icon: '/icons/dynamodb.svg',
      url: 'https://aws.amazon.com/dynamodb',
    },
  ],
  infra: [
    {
      id: 36,
      name: 'AWS',
      icon: '/icons/aws.png',
      url: 'https://aws.amazon.com',
    },
    {
      id: 37,
      name: 'GCP',
      icon: '/icons/gcp.svg',
      url: 'https://cloud.google.com',
    },
    {
      id: 38,
      name: 'Azure',
      icon: '/icons/azure.svg',
      url: 'https://azure.microsoft.com',
    },
    {
      id: 39,
      name: 'Vercel',
      icon: '/icons/vercel.svg',
      url: 'https://vercel.com',
    },
    {
      id: 40,
      name: 'Netlify',
      icon: '/icons/netlify.svg',
      url: 'https://netlify.com',
    },
    {
      id: 41,
      name: 'Cloudflare',
      icon: '/icons/cloudflare.svg',
      url: 'https://cloudflare.com',
    },
  ],
  devops: [
    {
      id: 42,
      name: 'Docker',
      icon: '/icons/docker.svg',
      url: 'https://www.docker.com',
    },
    {
      id: 43,
      name: 'Kubernetes',
      icon: '/icons/kubernetes.svg',
      url: 'https://kubernetes.io',
    },
    {
      id: 44,
      name: 'GitHub',
      icon: '/icons/github.svg',
      url: 'https://github.com',
    },
    {
      id: 45,
      name: 'Jenkins',
      icon: '/icons/jenkins.svg',
      url: 'https://jenkins.io',
    },
    {
      id: 46,
      name: 'Terraform',
      icon: '/icons/terraform.svg',
      url: 'https://terraform.io',
    },
    {
      id: 47,
      name: 'Grafana',
      icon: '/icons/grafana.svg',
      url: 'https://grafana.com',
    },
  ],
};
