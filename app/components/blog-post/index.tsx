"use client"

import Image from "next/image"
import Link from "next/link"
import ReactMarkdown, { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"
import type { ComponentPropsWithoutRef } from 'react'

interface BlogPostProps {
  title: string
  content: string
  author: string
  date: string
  readTime: string
  image: string
}

type CodeComponentProps = ComponentPropsWithoutRef<'code'> & {
  inline?: boolean
  className?: string
}

export function BlogPost({ title, content, author, date, readTime, image }: BlogPostProps) {
  const components: Partial<Components> = {
    code: function CodeComponent({ inline, className, children }: CodeComponentProps) {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      if (inline) {
        return <code className={className}>{children}</code>
      }

      return (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0 }}
        >
          {String(children || '').replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    }
  }

  return (
    <article>
      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-8">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden">
            <Image
              src="/images/authors/guillaume.jpg"
              alt={author}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-gray-600">Technical Writer</div>
          </div>
        </div>
      </header>

      <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown components={components}>
          {content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 pt-8 border-t">
        <Link 
          href="/blog"
          className="text-[#FFD666] hover:text-[#FFC933] font-medium"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  )
} 