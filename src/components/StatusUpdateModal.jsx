import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Loader, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

const StatusUpdateModal = ({ ticket, isOpen, onClose, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(ticket?.status || 'pending')
  const [comment, setComment] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)

    setTimeout(() => {
      onUpdateStatus(ticket.id, selectedStatus, comment)
      setIsUpdating(false)
      setComment('')
      onClose()
    }, 800)
  }

  if (!ticket) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Ticket Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                    <span>ID: #{ticket.id}</span>
                    <span>•</span>
                    <span>{format(ticket.createdAt, 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="panel-bordered">
                    <p className="text-xs text-gray-500 mb-1">Student</p>
                    <p className="font-medium text-gray-800">{ticket.studentName}</p>
                    <p className="text-sm text-gray-600">{ticket.studentEmail}</p>
                  </div>
                  <div className="panel-bordered">
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-800">{ticket.category}</p>
                    <p className="text-sm text-gray-600">Priority: {ticket.priority}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                  <div className="panel-bordered">
                    <p className="text-gray-600">{ticket.description}</p>
                  </div>
                </div>

                {ticket.comments && ticket.comments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Comment History</p>
                    <div className="space-y-3">
                      {ticket.comments.map((comment) => (
                        <div key={comment.id} className="panel-bordered">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-800 text-sm">{comment.author}</p>
                            <p className="text-xs text-gray-500">
                              {format(comment.timestamp, 'MMM dd, HH:mm')}
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="divider" />

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['pending', 'in-progress', 'resolved'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setSelectedStatus(status)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            selectedStatus === status
                              ? status === 'pending'
                                ? 'border-pending bg-pending/10'
                                : status === 'in-progress'
                                ? 'border-inProgress bg-inProgress/10'
                                : 'border-resolved bg-resolved/10'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            {status === 'pending' && <AlertCircle className="w-6 h-6 text-pending" />}
                            {status === 'in-progress' && <Loader className="w-6 h-6 text-inProgress" />}
                            {status === 'resolved' && <CheckCircle className="w-6 h-6 text-resolved" />}
                            <span className="text-sm font-medium capitalize">
                              {status.replace('-', ' ')}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Add a comment about this status update..."
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? (
                        <span className="flex items-center justify-center space-x-2">
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Updating...</span>
                        </span>
                      ) : (
                        'Update Ticket'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default StatusUpdateModal