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
  // Initialize from sessionStorage if available (session persistence)
  const [data, setData] = useState<QuizData>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('quizData')
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

  // Save to sessionStorage whenever data changes (session persistence)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quizData', JSON.stringify(data))
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
      sessionStorage.removeItem('quizData')
    }
  }

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quizData', JSON.stringify(data))
    }
  }

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('quizData')
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
