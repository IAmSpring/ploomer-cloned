export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base text-gray-500">
          © {new Date().getFullYear()} SaaS Platform. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 