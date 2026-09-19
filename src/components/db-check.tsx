"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Status = "idle" | "loading" | "success" | "error";

export function DbCheck() {
  const [status, setStatus] = useState<Status>("idle");
  const [detail, setDetail] = useState("");
  const [latency, setLatency] = useState<number | null>(null);

  async function checkConnection() {
    setStatus("loading");
    setDetail("");
    setLatency(null);
    try {
      const res = await fetch("/api/health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "pong" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setLatency(typeof data.latencyMs === "number" ? data.latencyMs : null);
        setDetail(`Connected via ${data.provider}`);
      } else {
        setStatus("error");
        setDetail(data.error ?? "Connection failed");
      }
    } catch (err) {
      setStatus("error");
      setDetail(err instanceof Error ? err.message : "Network error");
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        size="lg"
        onClick={checkConnection}
        disabled={status === "loading"}
        className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-white shadow-lg shadow-violet-500/30 hover:opacity-90"
      >
        {status === "loading" && <Loader2 className="animate-spin" />}
        Check DB Connection
      </Button>

      {status !== "idle" && (
        <Badge
          variant={
            status === "success" ? "success" : status === "error" ? "destructive" : "secondary"
          }
        >
          {status === "success" && <CheckCircle2 className="mr-1 size-3.5" />}
          {status === "error" && <XCircle className="mr-1 size-3.5" />}
          {status === "loading" ? "Checking..." : detail}
          {status === "success" && latency !== null ? ` · ${latency}ms` : ""}
        </Badge>
      )}
    </div>
  );
}
