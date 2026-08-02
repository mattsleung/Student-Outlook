import type { ReactNode } from "react";

function renderInlineMarkdown(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

export function MarkdownArticle({ source }: { source: string }) {
  const lines = source.split("\n");
  const content: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      content.push(
        <h2 key={`heading-${index}`}>
          {renderInlineMarkdown(line.slice(3), `heading-${index}`)}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }

      content.push(
        <ul key={`list-${index}`}>
          {items.map((item) => (
            <li key={item}>{renderInlineMarkdown(item, `list-${index}-${item}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;

    while (index < lines.length && lines[index].trim()) {
      const nextLine = lines[index].trim();
      if (nextLine.startsWith("## ") || nextLine.startsWith("- ")) break;
      paragraph.push(nextLine);
      index += 1;
    }

    content.push(
      <p key={`paragraph-${index}`}>
        {renderInlineMarkdown(paragraph.join(" "), `paragraph-${index}`)}
      </p>,
    );
  }

  return <div className="article-body">{content}</div>;
}
