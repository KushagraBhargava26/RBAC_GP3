"use client"

import * as React from "react"

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement Avatar component
  return <div className={className} {...props} />;
}

function AvatarImage({ className, ...props }: React.ComponentProps<"img">) {
  // TODO: Implement AvatarImage component
  return <img className={className} {...props} />;
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement AvatarFallback component
  return <div className={className} {...props} />;
}

export { Avatar, AvatarImage, AvatarFallback };
