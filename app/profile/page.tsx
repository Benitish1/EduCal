import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileView } from "@/components/profile-view"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <ProfileView />
      </DashboardLayout>
    </AuthGuard>
  )
}
