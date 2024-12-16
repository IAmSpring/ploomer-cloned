"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Section {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="text-sm">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li 
            key={section.id}
            style={{ paddingLeft: `${(section.level - 2) * 1}rem` }}
          >
            <Link
              href={`#${section.id}`}
              className={`
                block py-1 transition-colors
                ${activeSection === section.id 
                  ? "text-[#FFD666]" 
                  : "text-gray-600 hover:text-gray-900"}
              `}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 