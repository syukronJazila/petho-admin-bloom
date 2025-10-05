import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Info } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Pengaturan sistem dan preferensi
        </p>
      </div>

      {/* App Info */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Informasi Aplikasi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nama Aplikasi</span>
            <span className="font-medium">PETHOFAR Admin Panel</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Versi</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Environment</span>
            <span className="font-medium">Development</span>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Logout</p>
              <p className="text-sm text-muted-foreground">Keluar dari sesi admin</p>
            </div>
            <Button variant="destructive" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PHP Integration Note */}
      <Card className="shadow-soft bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Halaman settings ini dapat dikembangkan lebih lanjut
            untuk mengatur preferensi seperti tema, notifikasi, dan pengaturan lainnya.
            Logout akan mengarah ke <code className="bg-background px-1 py-0.5 rounded">/api/auth/logout.php</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
