import { tickets as mockTickets } from '../data/mockTicketsData'

const hydrateTicket = (ticket) => ({
  ...ticket,
  createdAt: ticket.createdAt ? new Date(ticket.createdAt) : new Date(),
  updatedAt: ticket.updatedAt ? new Date(ticket.updatedAt) : new Date(),
  comments: (ticket.comments || []).map((comment) => ({
    ...comment,
    timestamp: comment.timestamp ? new Date(comment.timestamp) : new Date(),
  })),
})

const toApiError = async (response, fallbackMessage) => {
  try {
    const body = await response.json()
    return new Error(body.message || fallbackMessage)
  } catch {
    return new Error(fallbackMessage)
  }
}

export const loadTickets = async () => {
  try {
    const response = await fetch('/api/tickets')
    if (!response.ok) {
      throw await toApiError(response, 'Failed to load tickets')
    }

    const tickets = await response.json()
    return Array.isArray(tickets) ? tickets.map(hydrateTicket) : mockTickets.map(hydrateTicket)
  } catch {
    return mockTickets.map(hydrateTicket)
  }
}

export const createTicket = async (ticketData) => {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketData),
  })

  if (!response.ok) {
    throw await toApiError(response, 'Failed to create ticket')
  }

  const ticket = await response.json()
  return hydrateTicket(ticket)
}

export const updateTicketStatus = async ({ ticketId, status, comment, updatedBy }) => {
  const response = await fetch(`/api/tickets/${ticketId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, comment, updatedBy }),
  })

  if (!response.ok) {
    throw await toApiError(response, 'Failed to update ticket status')
  }

  const ticket = await response.json()
  return hydrateTicket(ticket)
}