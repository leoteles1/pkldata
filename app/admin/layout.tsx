import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AuthProvider } from "@/context/authContext"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AuthProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-12 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                    </header>
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </SidebarInset>
            </AuthProvider>
        </SidebarProvider>
    )
}