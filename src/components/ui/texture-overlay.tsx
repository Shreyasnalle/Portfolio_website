import { cn } from "@/lib/utils";

interface TextureOverlayProps {
  opacity?: number;
  className?: string;
}

export function TextureOverlay({
  opacity = 0.6,
  className,
}: TextureOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_4px_4px,rgba(0,0,0,0.35)_1px,transparent_0)] bg-[length:8px_8px]",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
