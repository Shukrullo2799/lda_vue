import { Calendar, SquareTerminal, User } from "lucide-vue-next"

export default [
  {
    title: "Appointments",
    to: "/appointments",
    icon: Calendar,
    isCollapse: false,
    visible: ["any"],
  },
  {
    title: "Doctors",
    to: "/doctors",
    icon: User,
    isCollapse: false,
    visible: ["any"],
  },
  {
    title: "Patients",
    to: "/patients",
    icon: User,
    isCollapse: false,
    visible: ["any"],
  },
]
