import { useEffect } from "react";

type HotkeyHandler = (event: KeyboardEvent) => void;
type HotkeyMap = Record<string, HotkeyHandler>;

interface UseHotkeysOptions {
  enabled?: boolean;
}

export function useHotkeys(
  hotkeys: HotkeyMap,
  { enabled = true }: UseHotkeysOptions = {}
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = [
        event.ctrlKey && "ctrl",
        event.shiftKey && "shift",
        event.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join("+");

      const handler = hotkeys[key];
      if (handler) {
        handler(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hotkeys, enabled]);
}
