"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const profileFormSchema = z.object({
  id: z.number().optional(),
  pageUUID: z.string().trim().min(1, { message: "You must enter a UUID" }),
  pageName: z
    .string().trim()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must not be longer than 30 characters.",
    }),
  accessToken: z.string().trim().min(1, { message: "You must enter a TOKEN" }),
});
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export default function ProfileForm({
  onHandleSubmit,
  isBtn = false,
  formRef,
}: {
  onHandleSubmit: (data: ProfileFormValues) => void;
  isBtn: boolean;
  formRef?: React.RefObject<ReturnType<
    typeof useForm<ProfileFormValues>
  > | null>;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      pageName: "",
      pageUUID: "",
      accessToken: "",
      // email: "",
      // bio: "",
    },
    mode: "onChange",
  });
  if (formRef) formRef.current = form;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onHandleSubmit)}
        className="w-2/3 space-y-6"
      >
        {/* Fanpage name */}
        <FormField
          control={form.control}
          name="pageName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* UUID */}
        <FormField
          control={form.control}
          name="pageUUID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UUID</FormLabel>
              <FormControl>
                <Input placeholder="uuid" {...field} />
              </FormControl>
              <FormDescription>Nhập ID fanpage</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Access token */}
        <FormField
          control={form.control}
          name="accessToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Token</FormLabel>
              <FormControl>
                <Input type="password" placeholder="token" {...field} />
              </FormControl>
              <FormDescription>
                Không chia sẻ token cho bất cứ ai và không nhập access token vào
                một trang web lạ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isBtn && <Button type="submit">Update profile</Button>}
      </form>
    </Form>
  );
}
