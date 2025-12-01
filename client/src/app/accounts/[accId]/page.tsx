import { DialogModal } from "@/app/components/modal/DialogModal";
import { SheetApp } from "@/app/components/sheet/SheetApp";
import PostTableApp from "@/app/components/table/PostTableApp";
import { dialogPropsFromAccount } from "@/domain/props/dialog.data";

export default async function PostPage({
  params,
}: {
  params: Promise<{ accId: string }>;
}) {
  const accountId = (await params).accId;
  // return <div>The dynamic route is {accountId}</div>;
  return (
    <div>
      <SheetApp>
        
        <PostTableApp></PostTableApp>
      </SheetApp>
    </div>
  );
}
