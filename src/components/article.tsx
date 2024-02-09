import { cn } from "@/lib/utils";
import { Article } from "./articles";

type Props = React.DetailsHTMLAttributes<HTMLElement> & Article

export function Article({ description, link, title, className }: Props) {
  return (
    <article className={cn("space-y-1 p-4 hover:bg-muted/30 transition", className)}>
      <p className="font-semibold text-base mb-2">{title}</p>
      {/* <p className="text-xs text-foreground">{date.toDateString()}</p> */}
      <div className="*:text-sm *:text-muted-foreground flex flex-col gap-y-1">
        <p>
          {description}
        </p>
        <p>
          <a href={link} target="_blank" className="underline">{link}</a>
        </p>
      </div>
    </article>
  )
}
