import { SendEmailForm } from "@/components/send-email/form";
import { SendNewsletterPostForm } from "@/components/send-email/newsletter-post-form";
import { SendPostForm } from "@/components/send-email/post-form";
import { Toaster } from "@/components/ui/toaster";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SendIcon, PencilIcon, ArrowLeftIcon } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Send() {
  let defaultValue = "newsletter"
  const searchParams = new URLSearchParams(window.location.search)
  const postDataEncoded = searchParams.get("p")

  let postData = {}
  if (postDataEncoded) {
    try {
      postData = JSON.parse(postDataEncoded)
      defaultValue = "post"
    } catch (error) { }
  }

  const [state, setState] = useState([defaultValue])

  return (
    <>
      <main className="mb-20 mt-10 max-w-xl mx-auto px-4 space-y-8 relative">
        <div>
          <Link to="/">
            <p className="flex items-center gap-x-2 font-bold text-muted-foreground">
              <ArrowLeftIcon className="size-4" />
              Home
            </p>
          </Link>
          <p className="text-xl font-black mb-4 pb-1 border-b mt-6">Send email</p>
        </div>
        <ToggleGroup size="lg" type="multiple" className="justify-start bg-muted/40 rounded-lg p-2 gap-x-2" defaultValue={[defaultValue]} onValueChange={setState}>
          <ToggleGroupItem variant="outline" value="newsletter" aria-label="Toggle Newsletter">
            <SendIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem variant="outline" value="post" aria-label="Toggle Post">
            <PencilIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="border p-4 rounded-lg bg-muted/20">
          {
            state.length === 2 ? (
              <>
                <p className="font-bold text-lg mb-6">Newsletter & Post</p>
                <SendNewsletterPostForm {...postData}></SendNewsletterPostForm>
              </>
            ) : (
              <>
                {
                  state[0] === "post" ? (
                    <>
                      <p className="font-bold text-lg mb-6">Post</p>
                      <SendPostForm {...postData}></SendPostForm>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-lg mb-6">Newsletter</p>
                      <SendEmailForm></SendEmailForm>
                    </>
                  )
                }</>
            )
          }
        </div>
      </main>
      <Toaster />
    </>
  )
}