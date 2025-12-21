export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: Date
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface CreateAppointmentRequest {
  patientId: string
  doctorId: string
  date: Date
  time: string
  notes?: string
}

export interface UpdateAppointmentRequest {
  id: string
  date?: Date
  time?: string
  status?: Appointment['status']
  notes?: string
}
