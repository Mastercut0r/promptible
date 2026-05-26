import { useState, type DragEvent } from 'react'

export function useDropTarget(onDrop: (bookId: string) => void) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOver(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const bookId = e.dataTransfer.getData('text/plain')
    if (bookId) onDrop(bookId)
    setIsOver(false)
  }

  return { isOver, handleDragOver, handleDragLeave, handleDrop }
}
