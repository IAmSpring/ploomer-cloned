export type CategoryType = 'expansion' | 'compression' | 'conversion' | 'seeker' | 'action' | 'reasoning'

export interface AIExample {
  prompt: string
  response: string
  explanation: string
}

export interface AICategory {
  id: CategoryType
  title: string
  description: string
  useCase: string
  examples: AIExample[]
  bestPractices: string[]
}

export const AI_CATEGORIES: AICategory[] = [
  {
    id: 'expansion',
    title: 'Expansion Prompts',
    description: 'Generates detailed content, explanations, and ideas from concise inputs',
    useCase: 'Content creation, brainstorming, detailed explanations',
    examples: [
      {
        prompt: "Explain how photosynthesis works like I'm a junior developer",
        response: "Imagine photosynthesis as a microservice that takes in CO2, water, and sunlight as API inputs...",
        explanation: "This prompt expands a complex topic into simple, detailed explanations using familiar developer concepts"
      }
    ],
    bestPractices: [
      'Be specific about the desired detail level',
      'Include context about the target audience',
      'Specify the tone and style'
    ]
  },
  {
    id: 'compression',
    title: 'Compression Prompts',
    description: 'Distills and summarizes complex information into concise formats',
    useCase: 'Summarization, key points extraction, content reduction',
    examples: [
      {
        prompt: "Summarize the key concepts of React hooks in 3 bullet points",
        response: "• Hooks let you use state in functional components\n• useEffect handles side effects and lifecycle events\n• Custom hooks enable logic reuse between components",
        explanation: "This prompt compresses complex documentation into essential points"
      }
    ],
    bestPractices: [
      'Specify the desired output format',
      'Indicate the level of detail to retain',
      'Define the target length or constraints'
    ]
  },
  {
    id: 'conversion',
    title: 'Conversion Prompts',
    description: 'Transforms content between different formats and styles',
    useCase: 'Format conversion, language translation, style adaptation',
    examples: [
      {
        prompt: "Convert this JSON to a TypeScript interface",
        response: "interface User { id: string; name: string; roles: string[]; }",
        explanation: "This prompt transforms data between different technical formats"
      }
    ],
    bestPractices: [
      'Clearly specify input and output formats',
      'Include any special formatting requirements',
      'Mention preservation of specific elements'
    ]
  },
  {
    id: 'seeker',
    title: 'Seeker Prompts',
    description: 'Finds and retrieves specific information from content',
    useCase: 'Information extraction, pattern matching, content analysis',
    examples: [
      {
        prompt: "Find all API endpoints that handle user authentication",
        response: "Found: POST /api/auth/login, POST /api/auth/register, GET /api/auth/verify",
        explanation: "This prompt extracts specific technical information from a larger codebase"
      }
    ],
    bestPractices: [
      'Be specific about what to find',
      'Provide context for the search',
      'Specify the desired output format'
    ]
  },
  {
    id: 'action',
    title: 'Action Prompts',
    description: 'Executes commands and performs specific tasks',
    useCase: 'Code generation, automation, task execution',
    examples: [
      {
        prompt: "Generate a React component for a user profile card",
        response: "export function UserProfile({ name, avatar, role }) { ... }",
        explanation: "This prompt generates functional code based on requirements"
      }
    ],
    bestPractices: [
      'Provide clear requirements',
      'Specify any constraints or dependencies',
      'Include expected input/output formats'
    ]
  },
  {
    id: 'reasoning',
    title: 'Reasoning Prompts',
    description: 'Provides analysis, judgments, and insights',
    useCase: 'Code review, architecture decisions, performance analysis',
    examples: [
      {
        prompt: "Review this authentication implementation for security issues",
        response: "Found potential issues: 1. Password hashing not using bcrypt...",
        explanation: "This prompt analyzes code for specific concerns and provides recommendations"
      }
    ],
    bestPractices: [
      'Define the scope of analysis',
      'Specify evaluation criteria',
      'Request specific types of insights'
    ]
  }
] 