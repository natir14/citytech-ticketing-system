import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Ticket, LogOut, User, LayoutDashboard } from 'lucide-react'

const Navigation = ({ user, onLogout }) => {
  const location = useLocation()
  const isAdmin = user?.role === 'admin'

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="container-bordered">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to={isAdmin ? '/admin' : '/student'} className="flex items-center space-x-2">
              <Ticket className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-primary">UniTicket</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === '/admin'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-primary/10'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/student"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === '/student'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-primary/10'
                  }`}
                >
                  <Ticket className="w-5 h-5" />
                  <span className="font-medium">My Tickets</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation