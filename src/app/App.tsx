import { Articles } from "@/components/articles";
import { SendEmailModal } from "@/components/send-email/modal";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <>
      <main className="mb-20 mt-10 max-w-xl mx-auto px-4 space-y-8 relative">
        <div>
          <p className="text-xl font-black mb-4 pb-1 border-b">Articles</p>
          <div><Articles /></div>
        </div>
        <div className="fixed bottom-0 right-0 pb-8 w-full">
          <div className="max-w-xl mx-auto flex justify-end px-4">
            <SendEmailModal />
          </div>
        </div>
      </main>
      <Toaster />
    </>
  )
}
