import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { RemindersView } from "@/components/reminders-view"

export default function RemindersPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <RemindersView />
      </DashboardLayout>
    </AuthGuard>
  )
}
