const notesService = require('../src/notesService')

beforeEach(() => {
  notesService.resetNotes()
})

describe('notes service unit tests', () => {
  test('generateId returns max id plus one', () => {
    const nextId = notesService.generateId([
      { id: 2 },
      { id: 6 },
      { id: 4 }
    ])

    expect(nextId).toBe(7)
  })

  test('createNoteData returns error when content is missing', () => {
    const result = notesService.createNoteData({})

    expect(result).toEqual({ error: 'content missing' })
  })

  test('createNoteData sets important to false by default', () => {
    const result = notesService.createNoteData({ content: 'test note' }, [{ id: 1 }])

    expect(result).toEqual(expect.objectContaining({
      content: 'test note',
      important: false,
      id: 2
    }))
  })
})
