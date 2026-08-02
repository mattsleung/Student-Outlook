import type { ReactNode } from "react";

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
      content.push(<h2 key={`heading-${index}`}>{line.slice(3)}</h2>);
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
            <li key={item}>{item}</li>
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

    content.push(<p key={`paragraph-${index}`}>{paragraph.join(" ")}</p>);
  }

  return <div className="article-body">{content}</div>;
}
