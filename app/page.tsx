import type { Metadata } from 'next';

import { Code } from './code';
import { BASE_URL } from '@/utils/common';

const title = 'Create and share your tech stack';
const description =
  'Create and share your tech stack. Choose from a range of tech stacks, and share your tech stack with your friends.';

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
  keywords:
    'generate, create, convert, source, code, snippet, image, picture, share, export',
};

export default function Page() {
  return <Code />;
}
