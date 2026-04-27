import { hasSupabaseConfig, supabase } from '../lib/supabase'

const mapSupabaseTicket = (ticket) => ({
  id: ticket.id,
  title: ticket.title,
  description: ticket.description,
  category: ticket.category,
  priority: ticket.priority,
  status: ticket.status,
  studentId: ticket.student_id,
  studentName: ticket.student_name,
  studentEmail: ticket.student_email,
  assignedTo: ticket.assigned_to,
  comments: ticket.comments || [],
  createdAt: ticket.created_at,
  updatedAt: ticket.updated_at,
})

const toSupabaseTicketPayload = (ticketData) => ({
  title: ticketData.title,
  description: ticketData.description,
  category: ticketData.category,
  priority: ticketData.priority,
  student_id: ticketData.studentId,
  student_name: ticketData.studentName,
  student_email: ticketData.studentEmail,
})

const hydrateTicket = (ticket) => ({
  ...ticket,
  createdAt: ticket.createdAt ? new Date(ticket.createdAt) : new Date(),
  updatedAt: ticket.updatedAt ? new Date(ticket.updatedAt) : new Date(),
  comments: (ticket.comments || []).map((comment) => ({
    ...comment,
    timestamp: comment.timestamp ? new Date(comment.timestamp) : new Date(),
  })),
})

const ensureSupabase = () => {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured.')
  }

  return supabase
}

export const loadTickets = async () => {
  const client = ensureSupabase()
  const { data, error } = await client
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (data || []).map(mapSupabaseTicket).map(hydrateTicket)
}

export const createTicket = async (ticketData) => {
  const client = ensureSupabase()
  const { data, error } = await client
    .from('tickets')
    .insert({
      ...toSupabaseTicketPayload(ticketData),
      status: 'pending',
      assigned_to: null,
      comments: [],
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return hydrateTicket(mapSupabaseTicket(data))
}

export const updateTicketStatus = async ({ ticketId, status, comment, updatedBy }) => {
  const client = ensureSupabase()
  const { data: existingTicket, error: fetchError } = await client
    .from('tickets')
    .select('*')
    .eq('id', ticketId)
    .single()

  if (fetchError) {
    throw fetchError
  }

  const nextComments = comment
    ? [
        ...(existingTicket.comments || []),
        {
          id: (existingTicket.comments?.length || 0) + 1,
          author: updatedBy,
          text: comment,
          timestamp: new Date().toISOString(),
        },
      ]
    : existingTicket.comments || []

  const { data, error } = await client
    .from('tickets')
    .update({
      status,
      assigned_to: updatedBy,
      comments: nextComments,
      updated_at: new Date().toISOString(),
    })
    .eq('id', ticketId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return hydrateTicket(mapSupabaseTicket(data))
}