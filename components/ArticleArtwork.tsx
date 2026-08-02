import type { ArticleAccent } from "@/lib/articles";

type ArticleArtworkProps = {
  accent: ArticleAccent;
  symbol: string;
  compact?: boolean;
};

export function ArticleArtwork({ accent, symbol, compact = false }: ArticleArtworkProps) {
  return (
    <div
      className={`article-artwork artwork-${accent}${compact ? " artwork-compact" : ""}`}
      aria-hidden="true"
    >
      <span className="artwork-orbit" />
      <span className="artwork-dot artwork-dot-one" />
      <span className="artwork-dot artwork-dot-two" />
      <span className="artwork-number">{symbol}</span>
      <span className="artwork-word">OUTLOOK</span>
    </div>
  );
}
