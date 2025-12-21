export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  licenseNumber: string
  experience: number // years of experience
  education: string[]
  certifications: string[]
  availability: {
    monday: { start: string; end: string }
    tuesday: { start: string; end: string }
    wednesday: { start: string; end: string }
    thursday: { start: string; end: string }
    friday: { start: string; end: string }
    saturday: { start: string; end: string }
    sunday: { start: string; end: string }
  }
  bio?: string
  photo?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateDoctorRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  specialization: string
  licenseNumber: string
  experience: number
  education: string[]
  certifications: string[]
  availability: Doctor['availability']
  bio?: string
  photo?: string
}

export interface UpdateDoctorRequest {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  specialization?: string
  licenseNumber?: string
  experience?: number
  education?: string[]
  certifications?: string[]
  availability?: Doctor['availability']
  bio?: string
  photo?: string
}
