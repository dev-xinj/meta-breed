import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
  EditableTrigger,
} from "@/components/ui/editable";
 /* Những thuộc tính không cần thiết để props boolean */
export function EditableApp() {
  return (
    <Editable defaultValue="Click to edit" placeholder="Enter your text here">
      {/* <EditableLabel>Fruit</EditableLabel> */}
      <EditableArea className="">
        <EditablePreview />
        <EditableInput />
      </EditableArea>
      {/* <EditableTrigger asChild>
        <Button size="sm" className="w-fit">
          Edit
        </Button>
      </EditableTrigger> */}
      <EditableToolbar>
        <EditableSubmit asChild>
          <Button size="sm">Save</Button>
        </EditableSubmit>
        <EditableCancel asChild>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </EditableCancel>
      </EditableToolbar>
    </Editable>
  );
}