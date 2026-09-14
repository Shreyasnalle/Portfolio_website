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
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.35)_1px,transparent_0)] bg-[length:8px_8px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)]",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
