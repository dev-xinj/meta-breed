/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scroller } from "@/components/ui/scroller";
import { EditableApp } from "../editable/EditableApp";
export type DynamicRow = Record<string, any>;
export function ScrollerApp({ rows }: { rows: any[] }) {
  return (
    <div>
      {/* <Button className="ml-4">Advance</Button> */}
      <Scroller className="flex h-60 w-100 flex-col gap-2.5 p-4">
        {rows.map((row) => {
          return (
            <div
              key={row.id}
              className="flex h-40 flex-col rounded-md bg-accent p-4"
            >
              <EditableApp row={row.title}></EditableApp>
            </div>
          );
        })}
      </Scroller>
    </div>
  );
}
