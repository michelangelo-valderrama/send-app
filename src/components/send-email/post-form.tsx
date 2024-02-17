import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
})

export function SendPostForm({ title = "", description = "", link = "" }: any) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
      link
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    form.reset()
    toast({
      description: "Email sent successfully",
    })
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
          name="link"
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
          name="description"
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
