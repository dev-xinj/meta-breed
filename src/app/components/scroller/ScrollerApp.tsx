import { Scroller } from "@/components/ui/scroller";
import { EditableApp } from "../editable/EditableApp";
import { Button } from "@/components/ui/button";
import { ContentComments } from "@/domain/model/interact.types";

export function ScrollerApp({ rows }: { rows: ContentComments[] }) {
  return (
    <div>
      <Button className="ml-4">Advance</Button>
      <Scroller className="flex h-60 w-full flex-col gap-2.5 p-4">
        {rows.map((row, index) => {
          return (
            <div
              key={row.id}
              className="flex h-40 flex-col rounded-md bg-accent p-4"
            >
              <EditableApp key={row.id} row={row.content}></EditableApp>
            </div>
          );
        })}
      </Scroller>
    </div>
  );
}
