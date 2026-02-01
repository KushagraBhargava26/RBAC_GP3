import * as React from "react"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement Card component
  return <div className={className} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement CardHeader component
  return <div className={className} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement CardTitle component
  return <div className={className} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement CardDescription component
  return <div className={className} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement CardContent component
  return <div className={className} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  // TODO: Implement CardFooter component
  return <div className={className} {...props} />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
