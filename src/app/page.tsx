import { Braces, Database, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DbCheck } from "@/components/db-check";
import { FloatingCard } from "@/components/floating-card";

const stack = [
  { label: "Next.js", icon: Layers },
  { label: "Tailwind CSS", icon: Sparkles },
  { label: "Zod", icon: ShieldCheck },
  { label: "Prisma", icon: Database },
  { label: "TypeScript", icon: Braces },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-950 p-4 sm:p-8">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-b from-white to-neutral-50 px-6 py-20 sm:px-12">
        {/* dotted background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle,#00000014_1px,transparent_1px)] [background-size:22px_22px]"
          aria-hidden
        />

        {/* decorative floating mockups — hidden below lg */}
        <FloatingCard title="prisma/schema.prisma" className="left-8 top-14 -rotate-6">
          <p>
            <span className="text-violet-500">datasource</span> db {"{"}
          </p>
          <p className="pl-3 text-neutral-400">provider = &quot;postgresql&quot;</p>
          <p>{"}"}</p>
        </FloatingCard>

        <FloatingCard title="terminal" className="right-8 top-14 rotate-6">
          <p className="text-emerald-500">$ npm run dev</p>
          <p className="text-neutral-400">▲ ready on :3000</p>
        </FloatingCard>

        <FloatingCard title="lib/validations/ping.ts" className="left-10 bottom-14 rotate-3">
          <p>
            z.<span className="text-violet-500">object</span>({"{"}
          </p>
          <p className="pl-3 text-neutral-400">message: z.string()</p>
          <p>{"}"}</p>
        </FloatingCard>

        <FloatingCard title="DATABASE_PROVIDER" className="right-10 bottom-14 -rotate-3">
          <p className="text-neutral-400">postgresql</p>
          <p className="text-neutral-300">mongodb</p>
        </FloatingCard>

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-neutral-200 bg-white px-3 py-1 text-neutral-600 shadow-sm"
          >
            <Sparkles className="size-3.5 text-violet-500" />
            Full-Stack Starter Kit
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
            Ship Full-Stack Apps
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Without the Setup Tax
            </span>
          </h1>

          <p className="max-w-lg text-balance text-neutral-500 sm:text-lg">
            Next.js, Tailwind, Zod and Prisma — wired for PostgreSQL or MongoDB. Clone it, drop in
            a connection string, and start building features on day one.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {stack.map(({ label, icon: Icon }) => (
              <Badge
                key={label}
                variant="secondary"
                className="gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-neutral-600"
              >
                <Icon className="size-3.5" />
                {label}
              </Badge>
            ))}
          </div>

          <Card className="mt-4 w-full max-w-md border-neutral-200 bg-white/80 shadow-lg shadow-black/[0.03] backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                Writes and reads back an example record using your DATABASE_URL.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DbCheck />
            </CardContent>
          </Card>

          <p className="pt-2 text-xs text-neutral-400">
            MIT licensed · built by{" "}
            <a
              href="https://vinaybhoure.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-500 underline underline-offset-2 hover:text-neutral-700"
            >
              Vinay Bhoure
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
