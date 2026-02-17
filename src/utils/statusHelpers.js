import { AlertCircle, Loader, CheckCircle } from 'lucide-react'

export const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'text-pending'
    case 'in-progress':
      return 'text-inProgress'
    case 'resolved':
      return 'text-resolved'
    default:
      return 'text-gray-600'
  }
}

export const getStatusBgColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-pending/10'
    case 'in-progress':
      return 'bg-inProgress/10'
    case 'resolved':
      return 'bg-resolved/10'
    default:
      return 'bg-gray-100'
  }
}

export const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return AlertCircle
    case 'in-progress':
      return Loader
    case 'resolved':
      return CheckCircle
    default:
      return AlertCircle
  }
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-danger'
    case 'medium':
      return 'text-warning'
    case 'low':
      return 'text-gray-600'
    default:
      return 'text-gray-600'
  }
}

export const getPriorityBgColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-danger/10'
    case 'medium':
      return 'bg-warning/10'
    case 'low':
      return 'bg-gray-100'
    default:
      return 'bg-gray-100'
  }
}

export const formatStatus = (status) => {
  return status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}