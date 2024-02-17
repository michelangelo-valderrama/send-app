import { Articles } from "@/components/articles";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="mb-20 mt-10 max-w-xl mx-auto px-4 space-y-8 relative">
        <div>
          <p className="text-xl font-black mb-4 pb-1 border-b">Articles</p>
          <div><Articles /></div>
        </div>
        <div className="fixed bottom-0 right-0 pb-8 w-full">
          <div className="max-w-xl mx-auto flex justify-end px-4">
            <Link to="send">
              <Button className="gap-x-2">
                <PaperPlaneIcon className="size-4" />
                Write a new email
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  )
}
