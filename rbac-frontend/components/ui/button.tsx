import * as React from "react"

function Button({ className, ...props }: React.ComponentProps<"button">) {
  // TODO: Implement Button component
  return <button className={className} {...props} />;
}

export { Button };
