import { TabList } from "@/components/tab-content/tab-list";
import { TabsContent } from "@/components/ui/tabs";
import { TableTableContent } from "@/components/tab-content/result-tab-content";

export function ResultTabContent() {
  return (
    <>
      <TabList />
      <TableTableContent />
    </>
  );
}
