"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      // Add error handling for password mismatch
      return
    }
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/"
    })
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
                width={260}
                height={90}
                className="h-8 w-auto"
              />
            </Link>
            <h1 className="mt-6 text-3xl font-bold">Welcome</h1>
            <p className="mt-2 text-sm text-gray-600">
              By signing up you agree with our{" "}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                privacy policy
              </Link>
              .
            </p>
          </div>

          {/* Social Sign In Buttons - Disabled in Dev */}
          <div className="space-y-3 mb-6">
            <button disabled className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed">
              <i className="fab fa-google"></i>
              Sign in with Google
            </button>
            <button disabled className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed">
              <i className="fab fa-linkedin"></i>
              Sign in with LinkedIn
            </button>
            <button disabled className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-50 cursor-not-allowed">
              <i className="fab fa-github"></i>
              Sign in with GitHub
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`far ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in now!
            </Link>
          </p>

          <div className="mt-6 text-center">
            <button className="inline-flex items-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50">
              HAVE AN ISSUE? JOIN OUR SLACK
            </button>
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
                src="/images/frameworks/streamlit.svg"
                alt="Framework Demo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 