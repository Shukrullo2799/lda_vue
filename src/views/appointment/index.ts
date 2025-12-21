// Экспорт типов
export type {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from './types/appointment'

// Экспорт store
export { useAppointmentStore } from './stores/appointmentStore'

// Экспорт сервиса
export { appointmentService } from './services/appointmentApi'

// Экспорт роутера
export { appointmentRoutes } from './routes/appointmentRoutes'

// Экспорт компонентов
export { default as AppointmentList } from './components/AppointmentList.vue'
export { default as AppointmentForm } from './components/AppointmentForm.vue'
export { default as AppointmentDetail } from './components/AppointmentDetail.vue'
export { default as AppointmentCard } from './components/AppointmentCard.vue'
export { default as AppointmentModule } from './index.vue'
