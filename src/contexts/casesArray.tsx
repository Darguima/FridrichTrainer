import React, { createContext, useContext, useState } from 'react'

export interface fridichCaseSchema {
  name: string,
  solve: string,
  shuffle: string
}

export interface casesArraySchema {
  unsolved: Array<fridichCaseSchema>,
  solved: Array<fridichCaseSchema>,
}

interface CasesArrayContextData {
  casesArray: casesArraySchema,
  setCasesArray: React.Dispatch<React.SetStateAction<casesArraySchema>>
}

const CasesArrayContext = createContext<CasesArrayContextData>({} as CasesArrayContextData)

export const CasesArrayProvider: React.FC = ({ children }) => {
  const [casesArray, setCasesArray] = useState<casesArraySchema>({} as casesArraySchema)

  return (
    <CasesArrayContext.Provider value={{ casesArray, setCasesArray }}>
      {children}
    </CasesArrayContext.Provider>
  )
}

export default function useCasesArray () {
  const context = useContext(CasesArrayContext)

  return context
}
