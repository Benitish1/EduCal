import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsView } from "@/components/settings-view"

export default function SettingsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <SettingsView />
      </DashboardLayout>
    </AuthGuard>
  )
}
