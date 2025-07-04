import { useEffect, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  enabled?: boolean;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    enabled = true,
  }: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, root, rootMargin }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, root, rootMargin, enabled]);

  return isIntersecting;
}
