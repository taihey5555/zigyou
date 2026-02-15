"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const params = useSearchParams();
  const errorParam = params.get("error");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage("ログインに失敗しました。");
      return;
    }
    window.location.href = "/admin/inquiries";
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-16">
        <h1 className="text-2xl font-semibold">管理者ログイン</h1>
        {errorParam === "forbidden" && (
          <Card className="border-red-200 bg-red-50 p-3 text-sm text-red-700">
            権限がありません。
          </Card>
        )}
        {message && (
          <Card className="border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {message}
          </Card>
        )}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
