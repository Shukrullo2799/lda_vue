export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: 'male' | 'female' | 'other'
  address: string
  medicalHistory?: string
  allergies?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface CreatePatientRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  gender: Patient['gender']
  address: string
  medicalHistory?: string
  allergies?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface UpdatePatientRequest {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  gender?: Patient['gender']
  address?: string
  medicalHistory?: string
  allergies?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}
