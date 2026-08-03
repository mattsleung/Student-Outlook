import Image from "next/image";

type ArticleTitleImageProps = {
  alt: string;
  compact?: boolean;
  src: string;
};

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/Student-Outlook" : "";

export function ArticleTitleImage({ alt, compact = false, src }: ArticleTitleImageProps) {
  return (
    <div className={`article-title-image${compact ? " article-title-image-compact" : ""}`}>
      <Image alt={alt} fill sizes={compact ? "(max-width: 760px) 100vw, 33vw" : "(max-width: 900px) 100vw, 45vw"} src={`${basePath}${src}`} />
    </div>
  );
}
