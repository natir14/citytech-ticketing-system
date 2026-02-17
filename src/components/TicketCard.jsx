import { motion } from 'framer-motion'
import { Clock, User, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { format } from 'date-fns'
import { getStatusColor, getStatusIcon, getPriorityColor } from '../utils/statusHelpers'

const TicketCard = ({ ticket, onClick, isAdmin }) => {
  const statusColor = getStatusColor(ticket.status)
  const priorityColor = getPriorityColor(ticket.priority)
  const StatusIcon = getStatusIcon(ticket.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 82, 204, 0.1)' }}
      onClick={onClick}
      className="glass-card cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
              {ticket.title}
            </h3>
            <span className={`badge badge-${ticket.status === 'pending' ? 'pending' : ticket.status === 'in-progress' ? 'in-progress' : 'resolved'}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {ticket.status.replace('-', ' ')}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ticket.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{format(ticket.createdAt, 'MMM dd, yyyy')}</span>
          </div>
          {isAdmin && (
            <div className="flex items-center space-x-1 text-gray-500">
              <User className="w-4 h-4" />
              <span>{ticket.studentName}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            ticket.priority === 'high'
              ? 'bg-danger/10 text-danger'
              : ticket.priority === 'medium'
              ? 'bg-warning/10 text-warning'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {ticket.priority}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {ticket.category}
          </span>
        </div>
      </div>

      {ticket.assignedTo && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Assigned to: <span className="font-medium text-gray-700">{ticket.assignedTo}</span>
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default TicketCard