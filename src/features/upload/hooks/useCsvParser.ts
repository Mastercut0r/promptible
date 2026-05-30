import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { type ColumnMapping, type ParsedBook, APP_FIELDS, STANDARD_HEADERS } from '../types'

interface UseCsvParserResult {
  headers: string[]
  mapping: ColumnMapping
  setMapping: (mapping: ColumnMapping) => void
  parseBooks: () => ParsedBook[]
  isReady: boolean
}

export function useCsvParser(file: File | null): UseCsvParserResult {
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, string>[]>([])
  const emptyMapping = (): ColumnMapping => Object.fromEntries(APP_FIELDS.map((field) => [field, ''])) as ColumnMapping 
  const [mapping, setMapping] = useState<ColumnMapping>(emptyMapping)

  useEffect(() => {
    if (!file) return

    setHeaders([])
    setRows([])
    setMapping({} as ColumnMapping)

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedHeaders = result.meta.fields ?? []
        setHeaders(parsedHeaders)
        setRows(result.data)

        const autoMapping = {} as ColumnMapping
        for (const field of APP_FIELDS) {
          const standard = STANDARD_HEADERS[field]
          autoMapping[field] = parsedHeaders.includes(standard) ? standard : ''
        }
        setMapping(autoMapping)
      },
    })
  }, [file])

  const parseBooks = (): ParsedBook[] =>
    rows.map((row) => ({
      asin: mapping.asin && row[mapping.asin] ? row[mapping.asin] : '',
      title: mapping.title ? (row[mapping.title] ?? '') : '',
      authors: mapping.authors ? (row[mapping.authors] ?? '') : '',
      genre: mapping.genre ? (row[mapping.genre] ?? '') : '',
      myRating: mapping.myRating ? (row[mapping.myRating] ?? '') : '',
    }))

  return { headers, mapping, setMapping, parseBooks, isReady: headers.length > 0 }
}
