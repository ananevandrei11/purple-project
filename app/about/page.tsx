import { ContentPage } from '@/layout';
import { getMarkdownContent } from '@/markdown/getMarkdownContent';
import { notFound } from 'next/navigation';

export default async function About(): Promise<JSX.Element> {
  const parsedContent = await getMarkdownContent('about.md');

  if (!parsedContent) {
    return notFound();
  }

  return <ContentPage html={parsedContent} />;
}
