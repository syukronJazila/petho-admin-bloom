import { useState } from "react";
import { USERS, User } from "@/lib/dummy-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Users() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor" as "admin" | "editor"
  });

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "", role: "editor" });
    setIsDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("Nama dan email wajib diisi");
      return;
    }

    if (!editingUser && !formData.password) {
      alert("Password wajib diisi untuk user baru");
      return;
    }

    // TODO: API call to /api/users/create.php or /api/users/update.php
    
    if (editingUser) {
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? { ...u, ...formData, last_login: u.last_login }
          : u
      ));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        last_login: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter(u => u.id !== id));
      // TODO: fetch DELETE /api/users/delete.php?id=${id}
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">
            Kelola akun admin dan editor
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.last_login).toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Edit User' : 'Tambah User Baru'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama lengkap"
              />
              {/* PHP: $_POST['name'] */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
              {/* PHP: $_POST['email'] */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password {editingUser && "(biarkan kosong jika tidak ingin mengubah)"}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
              {/* PHP: $_POST['password'] (hash with password_hash()) */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "admin" | "editor") =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              {/* PHP: $_POST['role'] */}
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>Simpan</Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {/* PHP: POST to /api/users/create.php or /api/users/update.php */}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
