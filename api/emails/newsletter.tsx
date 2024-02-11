import * as React from "react";
import {
  Button,
  Html,
  Head,
  Preview,
  Tailwind,
  Container,
  Body,
  Heading,
  Section,
  Text,
  Img
} from "@react-email/components";

export interface Post {
  title: string,
  description: string,
  link: string
}

export type NewsletterEmailOptions = Post |
{ title: string, text: string, preview: string } |
{ post: Post, title: string, text: string, preview: string }
export default function NewsletterEmail(options: NewsletterEmailOptions, firstName: string) {
  let title = ""
  let preview = ""
  let text = ""
  let post: Post | undefined = undefined

  if ("link" in options) {
    title = `Nuevo artículo: ${options.title}`
    preview = options.description
    text = `
      <strong>¡Hola ${firstName}!</strong>
      Solo te interrumpo para avisarte de mi último artículo :>
    `
    post = {
      title: options.title,
      description: options.description,
      link: options.link
    }
  } else if ("post" in options) {
    title = options.title
    preview = options.preview
    text = options.text
    post = {
      title: options.post.title,
      description: options.post.description,
      link: options.post.link
    }
  } else {
    title = options.title
    preview = options.preview
    text = options.text
  }

  return (<Html lang="es">
    <Head>
      <title>{title}</title>
    </Head>
    <Preview>{preview}</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#e4e4e7] rounded-lg my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Section className="mt-[32px]">
            <Img
              src="https://imangelo.dev/images/icons/icon-512-light.png"
              width="60"
              height="60"
              alt="Vercel"
              className="my-0 mx-auto"
            />
          </Section>
          <Section className="mb-4">
            <Heading className="text-black text-2xl text-center p-0 my-[20px] mx-0">
              {title}
            </Heading>
            {
              text?.split("\n").map((t, i) => (
                <Text
                  key={i}
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: t }}
                />
              ))
            }
          </Section>
          {
            post && (
              <Section className="border border-solid rounded-lg px-2.5 py-4">
                <Text className="text-black font-semibold my-0 text-base mb-2">{post.title}</Text>
                <Text className="mt-0 text-sm">{post.description}</Text>
                <Button href={post.link} className="rounded-md text-sm font-medium bg-[#18181b] text-[#fafafa] shadow px-4 py-2">
                  Ir al artículo
                </Button>
              </Section>
            )
          }
        </Container>
      </Body>
    </Tailwind>
  </Html>)
}
