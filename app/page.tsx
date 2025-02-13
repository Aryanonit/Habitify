"use client"

import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import ErrorBoundary from "@/components/error-boundary"

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<LoadingSkeleton />}>
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

