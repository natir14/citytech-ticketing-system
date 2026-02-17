import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ticket, LogIn, AlertCircle } from 'lucide-react'
import { users } from '../data/mockUsersData'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      )

      if (user) {
        onLogin(user)
      } else {
        setError('Invalid username or password')
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-4 shadow-lg"
          >
            <Ticket className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">UniTicket</h1>
          <p className="text-gray-600">University Ticketing System</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 p-4 bg-danger/10 border border-danger/20 rounded-lg mb-6"
            >
              <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
              <p className="text-sm text-danger">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <LogIn className="w-5 h-5" />
                  </motion.div>
                  <span>Signing in...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="panel-bordered">
                <p className="font-medium text-gray-700 mb-1">Admin Account</p>
                <p className="text-gray-600">Username: admin</p>
                <p className="text-gray-600">Password: admin123</p>
              </div>
              <div className="panel-bordered">
                <p className="font-medium text-gray-700 mb-1">Student Account</p>
                <p className="text-gray-600">Username: emma.johnson</p>
                <p className="text-gray-600">Password: student123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login