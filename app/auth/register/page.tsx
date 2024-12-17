"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // In development, auto sign in with test account after registration
      if (process.env.NODE_ENV === 'development') {
        const result = await signIn("credentials", {
          email: "test@example.com",
          password: "test123",
          redirect: false
        })

        if (result?.error) {
          setError("Registration failed")
        } else {
          router.push('/dashboard')
        }
      }
      // In production, this would call your registration API
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Registration Form */}
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
            <h1 className="mt-6 text-3xl font-bold">Create an Account</h1>
            <p className="mt-2 text-sm text-gray-600">
              By signing up you agree with our{" "}
              <Link href="/terms" className="text-[#FFD666] hover:text-[#FFD666]/90">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#FFD666] hover:text-[#FFD666]/90">
                privacy policy
              </Link>
              .
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}

          {/* Social Sign Up Buttons - Disabled in Dev */}
          <div className="space-y-3 mb-6">
            <button 
              type="button"
              disabled 
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              <i className="fab fa-google"></i>
              Sign up with Google
            </button>
            <button 
              type="button"
              disabled 
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              <i className="fab fa-linkedin"></i>
              Sign up with LinkedIn
            </button>
            <button 
              type="button"
              disabled 
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              <i className="fab fa-github"></i>
              Sign up with GitHub
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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FFD666] focus:border-[#FFD666]"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`far ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFD666] hover:bg-[#FFD666]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD666]"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-medium text-[#FFD666] hover:text-[#FFD666]/90">
              Sign in
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