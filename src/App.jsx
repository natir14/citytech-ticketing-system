import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import AdminDashboard from './pages/AdminDashboard'
import StudentPortal from './pages/StudentPortal'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import { loadTickets, createTicket, updateTicketStatus } from './utils/ticketStorage'

const App = () => {
  const [user, setUser] = useState(null)
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapApp = async () => {
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }

      const loadedTickets = await loadTickets()
      setTickets(loadedTickets)
      setIsLoading(false)
    }

    bootstrapApp()
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  const handleCreateTicket = async (ticketData) => {
    const newTicket = await createTicket(ticketData)
    setTickets((prevTickets) => [newTicket, ...prevTickets])
  }

  const handleUpdateTicketStatus = async (ticketId, newStatus, comment) => {
    const updatedTicket = await updateTicketStatus({
      ticketId,
      status: newStatus,
      comment,
      updatedBy: user?.name || 'Admin',
    })

    setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === ticketId ? updatedTicket : ticket))
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      {user && <Navigation user={user} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === 'admin' ? '/admin' : '/student'} />}
        />
        <Route
          path="/admin"
          element={
            user && user.role === 'admin' ? (
              <AdminDashboard
                user={user}
                tickets={tickets}
                onUpdateTicketStatus={handleUpdateTicketStatus}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/student"
          element={
            user && user.role === 'student' ? (
              <StudentPortal
                user={user}
                tickets={tickets}
                onCreateTicket={handleCreateTicket}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/student'} /> : <Welcome />}
        />
      </Routes>
    </div>
  )
}

export default App