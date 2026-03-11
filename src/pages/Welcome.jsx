import { motion } from 'framer-motion'
import { Building2, ShieldCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images%20%289%29.jpg)' }}
      />

      <div className="container-bordered w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-4xl mx-auto bg-white/90"
        >
          <div className="mb-6 overflow-hidden rounded-xl border border-warning/30">
            <img
              src="/images%20%283%29.png"
              alt="City Technology College Campus"
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-warning rounded-2xl mb-4 shadow-lg">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">City Technology College</h1>
            <p className="text-lg text-gray-600">Welcome to the student support and service center</p>
          </div>

          <div className="panel-bordered mb-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-warning mt-0.5" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Ticketing System Access</h2>
                <p className="text-gray-600">
                  To continue, please authenticate to access the City Technology College ticketing system.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/login" className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-warning hover:bg-warning/90 transition-all duration-200 shadow-sm hover:shadow-md">
              Authenticate for Ticketing System
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Welcome