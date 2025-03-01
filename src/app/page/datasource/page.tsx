// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import DataSourceTree from "@/components/tree/datasource-tree";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={"h-[500px] w-[100px] overflow-hidden"}>
      <DataSourceTree />
    </div>
  );
}
