import * as React from "react"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  // TODO: Implement Badge component
  return <span className={className} {...props} />;
}

export { Badge };
