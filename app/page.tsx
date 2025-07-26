import type { Metadata } from 'next';

import { TechStacker } from './tech-stacker';
import { BASE_URL } from '@/utils/common';

const title = 'Create and share your tech stack';
const description = 'Create and share your tech stack.';

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    url: BASE_URL,
    title: title,
    description: description,
    images: [],
  },
  twitter: {
    title: title,
    description: description,
    images: [],
  },
  keywords: 'generate, create, tech, stack, image, picture, share, export',
};

export default function Page() {
  return <TechStacker />;
}
