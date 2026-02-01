import * as React from "react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  // TODO: Implement Input component
  return <input type={type} className={className} {...props} />;
}

export { Input };
