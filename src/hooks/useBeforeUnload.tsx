// src/hooks/useBeforeUnload.ts
import { useEffect } from "react";

const useBeforeUnload = (value: boolean) => {
   useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
         let returnValue;
         if (value) {
            returnValue = "Are you sure you want to leave?";
            event.returnValue = returnValue;
         }
         return returnValue;
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
         window.removeEventListener("beforeunload", handleBeforeUnload);
      };
   }, [value]);
};

export default useBeforeUnload;
