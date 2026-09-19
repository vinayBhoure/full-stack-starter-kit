import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DbCheck } from "@/components/db-check";

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Zod",
  "Prisma",
  "PostgreSQL / MongoDB",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="flex flex-col items-center gap-3 text-center">
        <Badge variant="outline">Full-Stack Starter Kit</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Built by Vinay Bhoure
        </h1>
        <p className="max-w-xl text-muted-foreground">
          A ready-to-clone Next.js starter with Tailwind, shadcn components, Zod validation, and a
          Prisma backend that works with either PostgreSQL (Neon) or MongoDB (Atlas).
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Database Connection</CardTitle>
          <CardDescription>
            Verifies your DATABASE_URL by writing and reading back an example record.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DbCheck />
        </CardContent>
      </Card>
    </div>
  );
}
