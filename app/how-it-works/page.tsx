"use client"

import { useState } from 'react'
import { AI_CATEGORIES, CategoryType } from '@/app/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function HowItWorksPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('expansion')

  const currentCategory = AI_CATEGORIES.find(cat => cat.id === activeCategory)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        How Our AI Works
      </h1>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {AI_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              px-6 py-3 rounded-full transition-colors
              ${activeCategory === category.id 
                ? 'bg-[#FFD666] text-black' 
                : 'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Category Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            <h2>{currentCategory?.title}</h2>
            <p className="lead">{currentCategory?.description}</p>
            
            <h3>Use Cases</h3>
            <p>{currentCategory?.useCase}</p>

            <h3>Examples</h3>
            <div className="space-y-8">
              {currentCategory?.examples.map((example, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">Prompt</h4>
                    <p className="font-mono text-sm">{example.prompt}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500">Response</h4>
                    <p className="font-mono text-sm">{example.response}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Explanation</h4>
                    <p className="text-sm">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3>Best Practices</h3>
            <ul>
              {currentCategory?.bestPractices.map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 