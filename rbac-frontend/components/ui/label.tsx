"use client"

import * as React from "react"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  // TODO: Implement Label component
  return <label className={className} {...props} />;
}

export { Label };
