const request = require('supertest')
const app = require('../src/app')
const notesService = require('../src/notesService')

beforeEach(() => {
  notesService.resetNotes()
})

describe('notes api integration tests', () => {
  test('GET /api/notes returns existing notes', async () => {
    const response = await request(app)
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(3)
  })

  test('POST /api/notes creates a new note', async () => {
    const newNote = { content: 'integration test note', important: true }

    const createResponse = await request(app)
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(createResponse.body.content).toBe(newNote.content)
    expect(createResponse.body.important).toBe(true)

    const listResponse = await request(app)
      .get('/api/notes')
      .expect(200)

    expect(listResponse.body).toHaveLength(4)
  })
})
