import { useState } from "react"
import type { FormEvent } from "react"
import { Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react"
import { IconBell, IconCheck } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Rene from "@/assets/rene.jpg"

const currentEmail = "mark@example.com"

const Profile = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setError("")
    }
  }

  const handleUpdatePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!currentPassword) return setError("Current password is required.")
    if (!newPassword) return setError("New password is required.")
    if (newPassword.length < 8) return setError("New password must be at least 8 characters.")
    if (newPassword !== confirmPassword) return setError("Passwords do not match.")
    setError("Password updates are not connected to an authentication provider yet.")
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="hidden md:inline-flex" aria-label="Collapse sidebar" />
            <div>
              <p className="font-heading text-sm font-semibold tracking-tight">WATERBONIA</p>
              <p className="hidden text-[11px] text-slate-500 sm:block">Smart rainwater management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex"><IconCheck className="size-3.5" /> All systems normal</span>
            <Button variant="ghost" size="icon" aria-label="Notifications"><IconBell /></Button>
            <div className="flex items-center gap-2 border-l border-slate-200 pl-2 sm:pl-4">
              <Avatar className="size-10 shrink-0"><AvatarImage src={Rene} alt="Rene Waterbonia" /></Avatar>
              <span className="hidden text-sm font-medium text-slate-700 sm:block">Rene Waterbonia</span>
            </div>
          </div>
        </div>
      </header>
      <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your account security and password.</p>
        </header>

        <div className="space-y-6">
          <Card className="bg-white shadow-sm ring-slate-200/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="size-5 text-sky-600" /> Email Address</CardTitle>
              <CardDescription>Your email address is used to sign in to Waterbonia.</CardDescription>
            </CardHeader>
            <CardContent><Input value={currentEmail} readOnly aria-label="Email Address" className="h-10 bg-slate-50 text-slate-700" /></CardContent>
          </Card>

          <Card className="bg-white shadow-sm ring-slate-200/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LockKeyhole className="size-5 text-sky-600" /> Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="tracking-[0.2em] text-slate-500" aria-label="Current password">••••••••••••••••</p>
              <Button className="bg-sky-500 hover:bg-sky-600" onClick={() => setDialogOpen(true)}><KeyRound /> Change Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <div><DialogTitle>Change Password</DialogTitle><DialogDescription className="mt-1">Enter your current password and choose a new one.</DialogDescription></div>
          <form className="grid gap-4" onSubmit={handleUpdatePassword}>
            <PasswordField id="current-password" label="Current Password" value={currentPassword} onChange={setCurrentPassword} />
            <PasswordField id="new-password" label="New Password" value={newPassword} onChange={setNewPassword} />
            <PasswordField id="confirm-password" label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} />
            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
            <div className="flex justify-end gap-2 pt-2"><DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose><Button type="submit" className="bg-sky-500 hover:bg-sky-600">Update Password</Button></div>
          </form>
        </DialogContent>
      </Dialog>
      </main>
    </div>
  )
}

const PasswordField = ({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input id={id} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} className="h-10 pr-10" autoComplete="new-password" />
        <button type="button" aria-label={visible ? `Hide ${label}` : `Show ${label}`} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-slate-700" onClick={() => setVisible((current) => !current)}>{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
      </div>
    </div>
  )
}

export default Profile