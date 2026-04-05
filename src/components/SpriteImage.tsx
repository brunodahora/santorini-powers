import { useState } from "react";

import { type ExpansionId } from "../data/powers";
import { getSpriteStyle } from "../lib/sprite";
import { cn } from "../lib/utils";

interface SpriteImageProps {
  expansion: ExpansionId;
  row: number;
  col: number;
  /** Display size in CSS pixels (component is always square). Defaults to 120. */
  size?: number;
  alt: string;
  className?: string;
}

export function SpriteImage({
  expansion,
  row,
  col,
  size = 120,
  alt,
  className,
}: SpriteImageProps) {
  const [imgError, setImgError] = useState(false);
  const style = getSpriteStyle(expansion, row, col, size);

  if (imgError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-sm text-muted-foreground",
          className,
        )}
        style={{ width: style.width, height: style.height }}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <div
      className={cn("shrink-0", className)}
      style={style}
      role="img"
      aria-label={alt}
      ref={(el) => {
        if (!el) return;
        const url = style.backgroundImage.slice(5, -2); // strip url('...')
        const img = new Image();
        img.onerror = () => setImgError(true);
        img.src = url;
      }}
    />
  );
}
