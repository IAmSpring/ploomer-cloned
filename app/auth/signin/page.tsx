"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError("Invalid credentials")
      } else {
        router.push(callbackUrl)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email: "test@example.com",
        password: "test123",
        redirect: false
      })

      if (result?.error) {
        setError("Demo login failed")
      } else {
        router.push(callbackUrl)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Sign In Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 lg:px-12">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Ploomber logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Welcome Back</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}

          {/* Social Sign In Buttons - Disabled in Dev */}
          <div className="space-y-3 mb-6">
            <button 
              type="button"
              disabled 
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed hover:bg-gray-100"
            >
              <i className="fab fa-google text-lg"></i>
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
            <button 
              type="button"
              disabled 
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed hover:bg-gray-100"
            >
              <i className="fab fa-linkedin-in text-lg"></i>
              <span className="text-sm font-medium">Sign in with LinkedIn</span>
            </button>
            <button 
              type="button"
              disabled 
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed hover:bg-gray-100"
            >
              <i className="fab fa-github text-lg"></i>
              <span className="text-sm font-medium">Sign in with GitHub</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FFD666] focus:border-[#FFD666]"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FFD666] focus:border-[#FFD666]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFD666] hover:bg-[#FFD666]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD666]"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD666]"
            >
              Sign in with test account
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium text-[#FFD666] hover:text-[#FFD666]/90">
              Register now!
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link 
              href="https://ploomber.io/community/"
              target="_blank"
              className="inline-flex items-center px-4 py-2 border border-[#FFD666] rounded-md shadow-sm text-sm font-medium text-[#FFD666] hover:bg-[#FFD666]/10"
            >
              HAVE AN ISSUE? JOIN OUR SLACK
            </Link>
          </div>
        </div>

        {/* Right Side - Demo Section */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-50 p-12">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-8">
              Deploy any framework within minutes
            </h2>
            <div className="relative h-64">
              <Image
                src="/images/features-frameworks.png"
                alt="Framework Demo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 