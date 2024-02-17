import { cn } from "@/lib/utils";
import { Article } from "./articles";
import { Link } from "react-router-dom";

type Props = React.DetailsHTMLAttributes<HTMLElement> & Article

export function Article({ description, link, title, className }: Props) {
  const postDataEncoded = encodeURIComponent(JSON.stringify({ description, link, title }))
  return (
    <Link to={`send?p=${postDataEncoded}`}>
      <article className={cn("space-y-1 p-4 hover:bg-muted/30 transition", className)}>
        <p className="font-semibold text-base mb-2">{title}</p>
        {/* <p className="text-xs text-foreground">{date.toDateString()}</p> */}
        <div className="*:text-sm *:text-muted-foreground flex flex-col gap-y-1">
          <p>
            {description}
          </p>
          <p className="underline">{link}</p>
        </div>
      </article>
    </Link>
  )
}
