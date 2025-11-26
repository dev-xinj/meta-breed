import { Scroller } from "@/components/ui/scroller";
import { EditableApp } from "../editable/EditableApp";
import { Button } from "@/components/ui/button";

export function ScrollerApp() {
  return (
    <div>
        <Button className="ml-4">Advance</Button>
      <Scroller className="flex h-60 w-full flex-col gap-2.5 p-4">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index} className="flex h-40 flex-col rounded-md bg-accent p-4">
            <EditableApp></EditableApp>
          </div>
        ))}
      </Scroller>
    </div>
  );
}
