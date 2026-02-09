"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Users, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            RBAC AI Assistant
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Secure, intelligent document search powered by Role-Based Access Control.
          Get answers from your enterprise documents with complete security.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Secure Access</h3>
            <p className="text-sm text-gray-500">Role-based permissions ensure you only see what you&apos;re authorized to access.</p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Smart Search</h3>
            <p className="text-sm text-gray-500">AI-powered RAG system retrieves relevant documents instantly.</p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="font-semibold mb-2">Multi-Department</h3>
            <p className="text-sm text-gray-500">Access documents across Finance, HR, Marketing, Engineering & more.</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button
            size="lg"
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center text-gray-600 text-sm">
        © 2024 RBAC AI. Enterprise-grade security for your documents.
      </footer>
    </main>
  );
}
