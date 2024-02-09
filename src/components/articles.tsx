import { useEffect, useState } from "react";
import { Article } from "./article";

export interface Article {
  title: string
  link: string
  description: string
  // date: Date
}

async function getArticles() {
  const parser = new DOMParser()
  const articles: Article[] = []

  const resp = await fetch("https://imangelo.dev/rss.xml")
  const text = await resp.text()

  const xml = parser.parseFromString(text, "text/xml")
  const [, ...titles] = [...xml.getElementsByTagName("title")]
  const [, ...links] = [...xml.getElementsByTagName("link")]
  const [, ...descriptions] = [...xml.getElementsByTagName("description")]
  // const dates = [...xml.getElementsByTagName("pubDate")]

  for (let i = 0; i < links.length; i++) {
    articles.push({
      title: titles[i].innerHTML,
      link: links[i].innerHTML,
      description: descriptions[i].innerHTML,
      // date: new Date(dates[i].innerHTML)
    })
  }
  return articles
}

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    getArticles().then((a: Article[]) => {
      setArticles(a)
    })
  }, [])

  return (
    <>
      {articles.map((article, i) => (
        <Article className="my-4" key={i} {...article} />
      ))}
    </>
  )
}
