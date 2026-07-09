import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    if (match[2]) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-[#1f5240]">
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      nodes.push(
        <em key={`${keyPrefix}-i-${i}`} className="italic">
          {match[3]}
        </em>,
      );
    }
    last = match.index + match[0].length;
    i++;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes.length > 0 ? nodes : [text];
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let blockKey = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blockKey++}`} className="my-2 list-disc space-y-1 ps-5">
        {listItems}
      </ul>,
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const bullet = /^[-*•]\s+(.+)/.exec(trimmed);
    const numbered = /^\d+\.\s+(.+)/.exec(trimmed);

    if (bullet) {
      listItems.push(
        <li key={`li-${listItems.length}`}>{renderInline(bullet[1], `li-${listItems.length}`)}</li>,
      );
      continue;
    }

    if (numbered) {
      flushList();
      blocks.push(
        <p key={`n-${blockKey++}`} className="my-1.5">
          {renderInline(numbered[0], `n-${blockKey}`)}
        </p>,
      );
      continue;
    }

    flushList();

    if (!trimmed) {
      blocks.push(<div key={`sp-${blockKey++}`} className="h-2" />);
      continue;
    }

    blocks.push(
      <p key={`p-${blockKey++}`} className="my-1.5 leading-relaxed">
        {renderInline(trimmed, `p-${blockKey}`)}
      </p>,
    );
  }

  flushList();
  return <div className="space-y-0.5">{blocks}</div>;
}
