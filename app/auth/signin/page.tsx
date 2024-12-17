"use client"

import { signIn } from "next-auth/react"

const DEV_USERS = [
  {
    title: "Super Admin",
    email: "superadmin@dev.local",
    password: "devpassword123",
    description: "Full system access with all permissions"
  },
  {
    title: "Admin",
    email: "admin@dev.local",
    password: "devpassword123",
    description: "Management access with limited override abilities"
  },
  {
    title: "User",
    email: "user@dev.local",
    password: "devpassword123",
    description: "Basic access with standard features"
  }
]

export default function SignIn() {
  const handleDemoLogin = async (email: string, password: string) => {
    await signIn("dev-credentials", {
      email,
      password,
      callbackUrl: "/"
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Development Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose a demo account to explore the platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {DEV_USERS.map((user) => (
              <div
                key={user.email}
                className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => handleDemoLogin(user.email, user.password)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {user.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{user.description}</p>
                <p className="mt-2 text-xs text-gray-400">
                  Email: {user.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 