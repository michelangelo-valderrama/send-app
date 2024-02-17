import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { sendEmail } from "@/services/send-email.service"

const formSchema = z.object({
  title: z.string().min(2).max(40),
  preview: z.string().min(2).max(100),
  text: z.string().min(2),
})

export function SendEmailForm() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      preview: "",
      text: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendEmail(values)
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
