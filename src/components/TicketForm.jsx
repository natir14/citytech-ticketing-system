import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { X, Send } from 'lucide-react'
import { useState } from 'react'

const TicketForm = ({ isOpen, onClose, onSubmit, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onFormSubmit = async (data) => {
    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit({
        ...data,
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
      })
      setIsSubmitting(false)
      reset()
      onClose()
    }, 800)
  }

  if (!isOpen) return null

  return (
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
            <h2 className="text-2xl font-bold text-gray-800">Create New Ticket</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 5, message: 'Title must be at least 5 characters' },
                })}
                className={`input-field ${errors.title ? 'input-error' : ''}`}
                placeholder="Brief description of your issue"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-danger">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  {...register('category', { required: 'Category is required' })}
                  className={`input-field ${errors.category ? 'input-error' : ''}`}
                >
                  <option value="">Select category</option>
                  <option value="Academic">Academic</option>
                  <option value="Facilities">Facilities</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Financial">Financial</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-danger">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority <span className="text-danger">*</span>
                </label>
                <select
                  {...register('priority', { required: 'Priority is required' })}
                  className={`input-field ${errors.priority ? 'input-error' : ''}`}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <p className="mt-1 text-sm text-danger">{errors.priority.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: { value: 20, message: 'Description must be at least 20 characters' },
                })}
                rows={6}
                className={`input-field resize-none ${errors.description ? 'input-error' : ''}`}
                placeholder="Provide detailed information about your issue..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-danger">{errors.description.message}</p>
              )}
            </div>

            <div className="panel-bordered">
              <h3 className="font-medium text-gray-800 mb-2">Your Information</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Student ID:</span> {user.id}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Submit Ticket</span>
                  </span>
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
        </motion.div>
      </div>
    </>
  )
}

export default TicketForm