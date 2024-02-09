import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { SendEmailForm } from "./form"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

export function SendEmailModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-x-2">
          <PaperPlaneIcon className="size-4" />
          Write a new email
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
        </DialogHeader>
        <SendEmailForm />
      </DialogContent>
    </Dialog>
  )
}
