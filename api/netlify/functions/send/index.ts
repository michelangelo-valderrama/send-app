import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import NewsletterEmail, {
  type NewsletterEmailOptions,
} from "../../../emails/newsletter"
import { Resend } from "resend"

const { X_TOKEN, RESEND_API_KEY, RESEND_AUDIENCE_ID } = process.env

const resend = new Resend(RESEND_API_KEY)

function validateToken(token?: string) {
  if (!token) {
    throw "missing x-token header"
  }
  if (token !== X_TOKEN) {
    throw "invalid token"
  }
}

async function getContacts() {
  const resp = await resend.contacts.list({
    audienceId: RESEND_AUDIENCE_ID!,
  })
  if (resp.error) throw resp.error.message
  return resp.data?.data.filter((c) => !c.unsubscribed) ?? []
}

async function sendEmails(contacts: any[], data: NewsletterEmailOptions) {
  const me = "Imangelo <hi@imangelo.dev>"
  const subject = "links" in data ? "Nuevo artículo" : data.title
  const resp = await resend.batch.send(
    contacts.map((c) => ({
      from: me,
      to: c.email,
      subject,
      react: NewsletterEmail(data, c.first_name),
    }))
  )
  if (resp.error) throw resp.error.message
  return resp.data?.data ?? ""
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {
    // validate access
    const token = event.headers["x-token"]
    validateToken(token)

    const body = event.body
    if (!body) throw "body is required"
    const bodyParser = JSON.parse(body)

    const { post, link, description, title, preview, text } = bodyParser
    if (
      (!link && !description && !title) ||
      (!post && !title && !preview && !text) ||
      (!title && !preview && !text)
    ) {
      throw "Invalid body"
    }

    // get contacts
    const contacts = await getContacts()

    // send emails
    const ids = await sendEmails(contacts, bodyParser)

    // response
    return {
      statusCode: 200,
      body: JSON.stringify(ids),
      headers: {
        "Content-Type": "application/json",
      },
    }
  } catch (error) {
    console.error(error)
    throw new Error(JSON.stringify(error))
  }
}

export { handler }
