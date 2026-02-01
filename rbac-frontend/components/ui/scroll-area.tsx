"use client"

import * as React from "react"

function ScrollArea({ className, children, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement ScrollArea component
  return <div className={className} {...props}>{children}</div>;
}

function ScrollBar({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement ScrollBar component
  return <div className={className} {...props} />;
}

export { ScrollArea, ScrollBar };
