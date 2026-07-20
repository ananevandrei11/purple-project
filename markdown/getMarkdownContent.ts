import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export async function getMarkdownContent(fileName: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'markdown', fileName);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const parsedContent = await remark().use(remarkHtml).process(fileContent);
    return parsedContent?.toString();
  } catch (error) {
    console.error(error);
    return null;
  }
}
