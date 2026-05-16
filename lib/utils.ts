import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MutableRefObject, Ref, RefCallback } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Merge multiple refs (callback or object) for one DOM node — standard React pattern. */
export function mergeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref != null)
        (ref as MutableRefObject<T | null>).current = value;
    }
  };
}
