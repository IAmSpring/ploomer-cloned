import { OpenAI } from 'openai'
import { uiHelpers } from './ui-helpers'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export interface Tool {
  name: string
  description: string
  parameters: {
    type: string
    properties: Record<string, any>
    required?: string[]
  }
  execute: (args: any) => Promise<any>
}

export const tools: Tool[] = [
  {
    name: "navigate",
    description: "Navigate to a specific page in the application",
    parameters: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "The path to navigate to"
        },
        highlight: {
          type: "boolean",
          description: "Whether to highlight the navigation item"
        }
      },
      required: ["path"]
    },
    execute: async ({ path, highlight }) => {
      if (highlight) {
        const navItem = document.querySelector(`a[href="${path}"]`)
        if (navItem) uiHelpers.highlight(`a[href="${path}"]`)
      }
      window.location.href = path
      return `Navigated to ${path}`
    }
  },
  {
    name: "select_plan",
    description: "Select a specific pricing plan",
    parameters: {
      type: "object",
      properties: {
        plan: {
          type: "string",
          enum: ["community", "professional", "teams", "enterprise"],
          description: "The plan to select"
        },
        highlight: {
          type: "boolean",
          description: "Whether to highlight the plan"
        }
      },
      required: ["plan"]
    },
    execute: async ({ plan, highlight }) => {
      if (highlight) {
        uiHelpers.highlight(`#plan-${plan}`)
      }
      uiHelpers.scrollTo(`#plan-${plan}`)
      return `Selected ${plan} plan`
    }
  },
  {
    name: "show_feature",
    description: "Show and highlight a specific feature",
    parameters: {
      type: "object",
      properties: {
        feature: {
          type: "string",
          description: "The feature to highlight"
        },
        duration: {
          type: "number",
          description: "How long to highlight for (ms)"
        }
      },
      required: ["feature"]
    },
    execute: async ({ feature, duration = 2000 }) => {
      const selector = `[data-feature="${feature}"]`
      uiHelpers.highlight(selector)
      uiHelpers.scrollTo(selector)
      return `Highlighted feature: ${feature}`
    }
  },
  {
    name: "fill_form",
    description: "Fill out a form field",
    parameters: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "The input selector"
        },
        value: {
          type: "string",
          description: "The value to fill"
        },
        highlight: {
          type: "boolean",
          description: "Whether to highlight the field"
        }
      },
      required: ["selector", "value"]
    },
    execute: async ({ selector, value, highlight }) => {
      if (highlight) {
        uiHelpers.highlight(selector)
      }
      uiHelpers.fillInput(selector, value)
      return `Filled input ${selector} with value ${value}`
    }
  },
  {
    name: "click_element",
    description: "Click a button or link",
    parameters: {
      type: "object",
      properties: {
        selector: {
          type: "string",
          description: "The element selector"
        },
        highlight: {
          type: "boolean",
          description: "Whether to highlight before clicking"
        }
      },
      required: ["selector"]
    },
    execute: async ({ selector, highlight }) => {
      if (highlight) {
        uiHelpers.highlight(selector)
      }
      uiHelpers.clickButton(selector)
      return `Clicked element ${selector}`
    }
  }
]

export async function chat(messages: any[], toolNames: string[] = []) {
  try {
    const availableTools = toolNames.length 
      ? tools.filter(tool => toolNames.includes(tool.name))
      : tools

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant that guides users through the platform setup process.
          You can interact with the UI to help users navigate and complete tasks.
          Available tools: ${JSON.stringify(availableTools.map(t => 
            ({name: t.name, description: t.description, parameters: t.parameters})
          ))}`
        },
        ...messages
      ],
      tools: availableTools.map(tool => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters
        }
      })),
      tool_choice: "auto"
    })

    return response
  } catch (error) {
    console.error('OpenAI chat error:', error)
    return {
      choices: [{
        message: {
          content: "I'm having trouble connecting to the AI service. Please try again later.",
          role: "assistant"
        }
      }]
    }
  }
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.webm')
    formData.append('model', 'whisper-1')

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.text
  } catch (error) {
    console.error('Audio transcription error:', error)
    return "Audio transcription failed. Please try typing your message instead."
  }
} 