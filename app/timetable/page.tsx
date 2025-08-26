import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TimetableView } from "@/components/timetable-view"

export default function TimetablePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <TimetableView />
      </DashboardLayout>
    </AuthGuard>
  )
}
