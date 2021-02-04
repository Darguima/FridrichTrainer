import React, { createContext, useContext, useState } from 'react'

export interface fridrichCaseSchema {
  name: string,
  solve: string,
  shuffle: string,
  solved: boolean
}

export interface casesArraySchema {
  unsolved: Array<fridrichCaseSchema>,
  solved: Array<fridrichCaseSchema>,
}

interface CasesArrayContextData {
  casesArray: casesArraySchema,
  setCasesArray: React.Dispatch<React.SetStateAction<casesArraySchema>>,
  caseOnScreen: fridrichCaseSchema,
  setCaseOnScreen: React.Dispatch<React.SetStateAction<fridrichCaseSchema>>
}

const CasesArrayContext = createContext<CasesArrayContextData>({} as CasesArrayContextData)

export const CasesArrayProvider: React.FC = ({ children }) => {
  const [casesArray, setCasesArray] = useState<casesArraySchema>({} as casesArraySchema)
  const [caseOnScreen, setCaseOnScreen] = useState<fridrichCaseSchema>({ name: 'Initial', shuffle: 'Initial', solve: 'Initial', solved: true })

  return (
    <CasesArrayContext.Provider value={{ casesArray, setCasesArray, caseOnScreen, setCaseOnScreen }}>
      {children}
    </CasesArrayContext.Provider>
  )
}

export default function useCasesArray () {
  const context = useContext(CasesArrayContext)

  return context
}
