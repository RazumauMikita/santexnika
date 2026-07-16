import { useCallback, useRef, useState } from "react";

export function useSubmitLock() {
  const lockRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const runLocked = useCallback(async (action: () => Promise<void>) => {
    if (lockRef.current) {
      return;
    }

    lockRef.current = true;
    setIsSubmitting(true);

    try {
      await action();
    } finally {
      lockRef.current = false;
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, runLocked };
}
