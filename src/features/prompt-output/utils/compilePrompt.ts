import type { Book, AppRating } from '../../../shared/types'
import type { PromptLanguage } from '../../../store/usePromptSettingsStore'

interface RatingSection {
  rating: Exclude<AppRating, 'UNRATED'>
  heading: { EN: string; DE: string }
}

const SECTIONS: RatingSection[] = [
  {
    rating: 'LOVED',
    heading: {
      EN: 'I loved these books. Please recommend similar ones:',
      DE: 'Diese Bücher habe ich geliebt. Bitte empfiehl mir ähnliche:',
    },
  },
  {
    rating: 'NEUTRAL',
    heading: {
      EN: "These books were okay, but didn't particularly excite me:",
      DE: 'Diese Bücher waren in Ordnung, haben mich aber nicht besonders begeistert:',
    },
  },
  {
    rating: 'DISLIKED',
    heading: {
      EN: 'I did not like these books. Please avoid recommending similar topics and writing styles:',
      DE: 'Diese Bücher haben mir nicht gefallen. Bitte vermeide ähnliche Themen und Schreibstile:',
    },
  },
]

const INTRO = {
  EN: "I'm looking for new book recommendations. Here is my reading history with my personal ratings:",
  DE: 'Ich suche neue Buchempfehlungen. Hier ist meine Lesehistorie mit meinen persönlichen Bewertungen:',
}

const OUTRO = {
  EN: 'Based on my preferences above, please suggest 5 to 10 books I might enjoy. For each recommendation, briefly explain why it matches my taste.',
  DE: 'Basierend auf meinen Präferenzen, schlage mir bitte 5 bis 10 Bücher vor, die mir gefallen könnten. Erkläre bei jeder Empfehlung kurz, warum sie zu meinem Geschmack passt.',
}

const BY = { EN: 'by', DE: 'von' }

function formatBookList(books: Book[], lang: PromptLanguage): string {
  return books.map((b) => `- ${b.title} ${BY[lang]} ${b.author}`).join('\n')
}

export function compilePrompt(books: Book[], language: PromptLanguage): string {
  const grouped = new Map<string, Book[]>()
  for (const book of books) {
    if (book.rating === 'UNRATED') continue
    const list = grouped.get(book.rating) ?? []
    list.push(book)
    grouped.set(book.rating, list)
  }

  if (grouped.size === 0) return ''

  const parts: string[] = [INTRO[language]]

  for (const section of SECTIONS) {
    const sectionBooks = grouped.get(section.rating)
    if (!sectionBooks?.length) continue
    parts.push(`${section.heading[language]}\n${formatBookList(sectionBooks, language)}`)
  }

  parts.push(OUTRO[language])

  return parts.join('\n\n')
}
