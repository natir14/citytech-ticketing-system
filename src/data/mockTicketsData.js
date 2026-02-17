export const tickets = [
  {
    id: 1,
    title: 'Library Access Card Not Working',
    description: 'My student ID card is not scanning at the library entrance. I have tried multiple times but it keeps showing an error message.',
    category: 'Facilities',
    priority: 'high',
    status: 'pending',
    studentId: 'STU001',
    studentName: 'Emma Johnson',
    studentEmail: 'emma.johnson@university.edu',
    createdAt: new Date('2024-01-15T09:30:00'),
    updatedAt: new Date('2024-01-15T09:30:00'),
    assignedTo: null,
    comments: []
  },
  {
    id: 2,
    title: 'Course Registration Issue',
    description: 'Unable to register for COMP301. The system shows the course as full but the department confirmed there are available seats.',
    category: 'Academic',
    priority: 'high',
    status: 'in-progress',
    studentId: 'STU002',
    studentName: 'Michael Chen',
    studentEmail: 'michael.chen@university.edu',
    createdAt: new Date('2024-01-14T14:20:00'),
    updatedAt: new Date('2024-01-15T10:15:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'I have contacted the registrar office. They are looking into this issue.',
        timestamp: new Date('2024-01-15T10:15:00')
      }
    ]
  },
  {
    id: 3,
    title: 'Parking Permit Not Received',
    description: 'I paid for a semester parking permit two weeks ago but have not received it yet. Payment confirmation number: PKG-2024-1234.',
    category: 'Facilities',
    priority: 'medium',
    status: 'resolved',
    studentId: 'STU003',
    studentName: 'Sarah Williams',
    studentEmail: 'sarah.williams@university.edu',
    createdAt: new Date('2024-01-10T11:00:00'),
    updatedAt: new Date('2024-01-14T16:30:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Your permit has been processed and is ready for pickup at the parking office.',
        timestamp: new Date('2024-01-14T16:30:00')
      }
    ]
  },
  {
    id: 4,
    title: 'Wi-Fi Connection Problems in Dorm',
    description: 'The Wi-Fi in Building C, Room 305 has been extremely slow and disconnects frequently. This is affecting my ability to attend online classes.',
    category: 'IT Support',
    priority: 'high',
    status: 'in-progress',
    studentId: 'STU004',
    studentName: 'James Rodriguez',
    studentEmail: 'james.rodriguez@university.edu',
    createdAt: new Date('2024-01-13T08:45:00'),
    updatedAt: new Date('2024-01-15T09:00:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'IT team has been notified. They will check the network equipment in your building.',
        timestamp: new Date('2024-01-15T09:00:00')
      }
    ]
  },
  {
    id: 5,
    title: 'Transcript Request Delay',
    description: 'I requested an official transcript 10 days ago for a job application. The deadline is approaching and I have not received any updates.',
    category: 'Academic',
    priority: 'high',
    status: 'pending',
    studentId: 'STU005',
    studentName: 'Olivia Martinez',
    studentEmail: 'olivia.martinez@university.edu',
    createdAt: new Date('2024-01-12T13:15:00'),
    updatedAt: new Date('2024-01-12T13:15:00'),
    assignedTo: null,
    comments: []
  },
  {
    id: 6,
    title: 'Meal Plan Balance Incorrect',
    description: 'My meal plan shows a balance of $50 but I should have $200 remaining. I have not used my card since last week.',
    category: 'Financial',
    priority: 'medium',
    status: 'resolved',
    studentId: 'STU001',
    studentName: 'Emma Johnson',
    studentEmail: 'emma.johnson@university.edu',
    createdAt: new Date('2024-01-11T10:30:00'),
    updatedAt: new Date('2024-01-13T14:20:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'The issue was due to a system error. Your balance has been corrected to $200.',
        timestamp: new Date('2024-01-13T14:20:00')
      }
    ]
  },
  {
    id: 7,
    title: 'Lab Equipment Malfunction',
    description: 'The microscope in Biology Lab 204 is not focusing properly. This is affecting our lab work for BIO202.',
    category: 'Facilities',
    priority: 'medium',
    status: 'in-progress',
    studentId: 'STU006',
    studentName: 'Daniel Kim',
    studentEmail: 'daniel.kim@university.edu',
    createdAt: new Date('2024-01-14T15:00:00'),
    updatedAt: new Date('2024-01-15T08:30:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Maintenance has been scheduled to inspect the equipment tomorrow morning.',
        timestamp: new Date('2024-01-15T08:30:00')
      }
    ]
  },
  {
    id: 8,
    title: 'Student Portal Login Issues',
    description: 'Cannot log into the student portal. I keep getting an "Invalid credentials" error even though I am using the correct password.',
    category: 'IT Support',
    priority: 'high',
    status: 'pending',
    studentId: 'STU007',
    studentName: 'Sophia Anderson',
    studentEmail: 'sophia.anderson@university.edu',
    createdAt: new Date('2024-01-15T07:00:00'),
    updatedAt: new Date('2024-01-15T07:00:00'),
    assignedTo: null,
    comments: []
  },
  {
    id: 9,
    title: 'Scholarship Payment Not Received',
    description: 'The merit scholarship for this semester has not been applied to my account. According to the financial aid office, it should have been processed by now.',
    category: 'Financial',
    priority: 'high',
    status: 'pending',
    studentId: 'STU008',
    studentName: 'Liam Thompson',
    studentEmail: 'liam.thompson@university.edu',
    createdAt: new Date('2024-01-14T16:45:00'),
    updatedAt: new Date('2024-01-14T16:45:00'),
    assignedTo: null,
    comments: []
  },
  {
    id: 10,
    title: 'Gym Locker Key Replacement',
    description: 'I lost my gym locker key. I need a replacement and information about any associated fees.',
    category: 'Facilities',
    priority: 'low',
    status: 'resolved',
    studentId: 'STU009',
    studentName: 'Ava Garcia',
    studentEmail: 'ava.garcia@university.edu',
    createdAt: new Date('2024-01-09T12:00:00'),
    updatedAt: new Date('2024-01-11T10:00:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'You can get a replacement key at the gym front desk. The fee is $10.',
        timestamp: new Date('2024-01-11T10:00:00')
      }
    ]
  },
  {
    id: 11,
    title: 'Classroom Temperature Too Cold',
    description: 'Room 401 in the Science Building is extremely cold. Multiple students have complained and it is difficult to concentrate during lectures.',
    category: 'Facilities',
    priority: 'medium',
    status: 'in-progress',
    studentId: 'STU002',
    studentName: 'Michael Chen',
    studentEmail: 'michael.chen@university.edu',
    createdAt: new Date('2024-01-13T09:15:00'),
    updatedAt: new Date('2024-01-14T11:30:00'),
    assignedTo: 'Admin User',
    comments: [
      {
        id: 1,
        author: 'Admin User',
        text: 'Facilities management is checking the HVAC system for that room.',
        timestamp: new Date('2024-01-14T11:30:00')
      }
    ]
  },
  {
    id: 12,
    title: 'Textbook Not Available in Bookstore',
    description: 'The required textbook for MATH205 is out of stock at the university bookstore. Classes start next week and I need this book.',
    category: 'Academic',
    priority: 'medium',
    status: 'pending',
    studentId: 'STU010',
    studentName: 'Noah Davis',
    studentEmail: 'noah.davis@university.edu',
    createdAt: new Date('2024-01-15T11:00:00'),
    updatedAt: new Date('2024-01-15T11:00:00'),
    assignedTo: null,
    comments: []
  }
]