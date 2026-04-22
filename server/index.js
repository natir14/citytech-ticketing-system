import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import XLSX from 'xlsx'
import { tickets as mockTickets } from '../src/data/mockTicketsData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname, '..', 'data')
const DB_PATH = path.join(DATA_DIR, 'tickets.xlsx')
const SHEET_NAME = 'Tickets'

const app = express()
const PORT = Number(process.env.PORT || 4000)

app.use(cors())
app.use(express.json())

const normalizeTicket = (ticket) => ({
  ...ticket,
  createdAt: ticket.createdAt ? new Date(ticket.createdAt).toISOString() : new Date().toISOString(),
  updatedAt: ticket.updatedAt ? new Date(ticket.updatedAt).toISOString() : new Date().toISOString(),
  comments: Array.isArray(ticket.comments)
    ? ticket.comments.map((comment) => ({
        ...comment,
        timestamp: comment.timestamp
          ? new Date(comment.timestamp).toISOString()
          : new Date().toISOString(),
      }))
    : [],
})

const ensureWorkbookExists = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  if (!fs.existsSync(DB_PATH)) {
    const workbook = XLSX.utils.book_new()
    const normalized = mockTickets.map(normalizeTicket)
    const sheet = XLSX.utils.json_to_sheet(normalized)
    XLSX.utils.book_append_sheet(workbook, sheet, SHEET_NAME)
    XLSX.writeFile(workbook, DB_PATH)
  }
}

const readTickets = () => {
  ensureWorkbookExists()
  const workbook = XLSX.readFile(DB_PATH)
  const sheet = workbook.Sheets[SHEET_NAME]
  if (!sheet) {
    return []
  }

  const rawTickets = XLSX.utils.sheet_to_json(sheet, { defval: null })
  return rawTickets.map((ticket) => {
    let parsedComments = []

    if (typeof ticket.comments === 'string' && ticket.comments.trim()) {
      try {
        parsedComments = JSON.parse(ticket.comments)
      } catch {
        parsedComments = []
      }
    } else if (Array.isArray(ticket.comments)) {
      parsedComments = ticket.comments
    }

    return normalizeTicket({
      ...ticket,
      comments: parsedComments,
      id: Number(ticket.id),
    })
  })
}

const writeTickets = (tickets) => {
  const workbook = XLSX.utils.book_new()

  const serialized = tickets.map((ticket) => ({
    ...ticket,
    comments: JSON.stringify(ticket.comments || []),
  }))

  const sheet = XLSX.utils.json_to_sheet(serialized)
  XLSX.utils.book_append_sheet(workbook, sheet, SHEET_NAME)
  XLSX.writeFile(workbook, DB_PATH)
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/tickets', (_req, res) => {
  const tickets = readTickets()
  res.json(tickets)
})

app.post('/api/tickets', (req, res) => {
  const tickets = readTickets()
  const maxId = tickets.reduce((max, ticket) => Math.max(max, Number(ticket.id) || 0), 0)

  const newTicket = normalizeTicket({
    id: maxId + 1,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    priority: req.body.priority,
    studentId: req.body.studentId,
    studentName: req.body.studentName,
    studentEmail: req.body.studentEmail,
    status: 'pending',
    assignedTo: null,
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const updated = [newTicket, ...tickets]
  writeTickets(updated)
  res.status(201).json(newTicket)
})

app.patch('/api/tickets/:id/status', (req, res) => {
  const ticketId = Number(req.params.id)
  const { status, comment, updatedBy } = req.body
  const tickets = readTickets()

  const updatedTickets = tickets.map((ticket) => {
    if (ticket.id !== ticketId) {
      return ticket
    }

    const nextTicket = {
      ...ticket,
      status,
      updatedAt: new Date().toISOString(),
      assignedTo: updatedBy || ticket.assignedTo,
    }

    if (comment) {
      nextTicket.comments = [
        ...(ticket.comments || []),
        {
          id: (ticket.comments?.length || 0) + 1,
          author: updatedBy || 'Admin',
          text: comment,
          timestamp: new Date().toISOString(),
        },
      ]
    }

    return normalizeTicket(nextTicket)
  })

  const updatedTicket = updatedTickets.find((ticket) => ticket.id === ticketId)
  if (!updatedTicket) {
    return res.status(404).json({ message: 'Ticket not found' })
  }

  writeTickets(updatedTickets)
  return res.json(updatedTicket)
})

ensureWorkbookExists()

app.listen(PORT, () => {
  console.log(`Ticket API running on http://localhost:${PORT}`)
})
