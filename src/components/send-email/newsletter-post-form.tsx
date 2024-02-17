import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"
import { sendEmail } from "@/services/send-email.service"

const formSchema = z.object({
  title: z.string().min(2).max(40),
  preview: z.string().min(2).max(100),
  text: z.string().min(2),
  post_title: z.string(),
  post_description: z.string(),
  post_link: z.string(),
})

export function SendNewsletterPostForm({ title = "", description = "", link = "" }: any) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      preview: "",
      text: "",
      post_title: title,
      post_description: description,
      post_link: link
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendEmail({
        title: values.title,
        preview: values.preview,
        text: values.text,
        post: {
          title: values.post_title,
          description: values.post_description,
          link: values.post_link
        }
      })
      form.reset()
      toast({
        description: "Email sent successfully",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: (error as any).message ?? "Internal Server Error",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-muted-foreground">Title</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preview"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-muted-foreground">Preview</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Write a message" {...field}></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="post_title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-muted-foreground">Title</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="post_link"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-muted-foreground">Link</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="post_description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel className="text-muted-foreground">Description</FormLabel>
                <FormControl className="col-span-3">
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">
            <PaperPlaneIcon className="size-4 mr-2" />
            Send
          </Button>
        </div>
      </form>
    </Form>
  )
}
