"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface QuizData {
  step1_liked: string[]
  step2_disliked: string[]
  step3_allergy: {
    symptoms: string[]
    families: string[]
    ingredients: string[]
  }
}

interface QuizContextType {
  data: QuizData
  setStep: <K extends keyof QuizData>(step: K, value: QuizData[K]) => void
  clearQuiz: () => void
  isComplete: boolean
  saveToLocalStorage: () => void
  loadFromLocalStorage: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

const defaultData: QuizData = {
  step1_liked: [],
  step2_disliked: [],
  step3_allergy: {
    symptoms: [],
    families: [],
    ingredients: []
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available
  const [data, setData] = useState<QuizData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz-data')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return {
            step1_liked: parsed.step1_liked || [],
            step2_disliked: parsed.step2_disliked || [],
            step3_allergy: parsed.step3_allergy || {
              symptoms: [],
              families: [],
              ingredients: []
            }
          }
        } catch (e) {
          console.error('Failed to load quiz data:', e)
        }
      }
    }
    return defaultData
  })

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz-data', JSON.stringify(data))
    }
  }, [data])

  const setStep = <K extends keyof QuizData>(step: K, value: QuizData[K]) => {
    setData(prev => ({
      ...prev,
      [step]: value
    }))
  }

  const clearQuiz = () => {
    setData(defaultData)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('quiz-data')
      localStorage.removeItem('step1-liked')
      localStorage.removeItem('quiz-disliked')
      localStorage.removeItem('quiz-allergy')
    }
  }

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz-data', JSON.stringify(data))
    }
  }

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz-data')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setData({
            step1_liked: parsed.step1_liked || [],
            step2_disliked: parsed.step2_disliked || [],
            step3_allergy: parsed.step3_allergy || {
              symptoms: [],
              families: [],
              ingredients: []
            }
          })
        } catch (e) {
          console.error('Failed to load quiz data:', e)
        }
      }
    }
  }

  const isComplete = 
    data.step1_liked.length >= 3 &&
    data.step2_disliked.length >= 0 && // Optional
    (data.step3_allergy.symptoms.length > 0 ||
     data.step3_allergy.families.length > 0 ||
     data.step3_allergy.ingredients.length > 0)

  return (
    <QuizContext.Provider
      value={{
        data,
        setStep,
        clearQuiz,
        isComplete,
        saveToLocalStorage,
        loadFromLocalStorage
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
