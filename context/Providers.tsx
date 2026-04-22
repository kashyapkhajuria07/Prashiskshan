"use client";

import { ReactNode } from "react";
import { MockDataProvider } from "./MockDataContext";

export function Providers({ children }: { children: ReactNode }) {
  return <MockDataProvider>{children}</MockDataProvider>;
}
