import { useState } from "react";
import { CONTACTS, Kontak as KontakType } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, CheckCircle, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Kontak() {
  const [messages, setMessages] = useState<KontakType[]>(CONTACTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<KontakType | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredMessages = messages.filter(
    (msg) =>
      msg.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subjek.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (message: KontakType) => {
    setSelectedMessage(message);
    // Mark as read
    if (!message.is_read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, is_read: true } : m
      ));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      setMessages(messages.filter(m => m.id !== id));
      // TODO: fetch DELETE /api/kontak/delete.php?id=${id}
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    // TODO: replace with actual API call
    // const formData = new FormData();
    // formData.append('to', selectedMessage.email);
    // formData.append('subject', `Re: ${selectedMessage.subjek}`);
    // formData.append('message', replyText);
    // 
    // await fetch('/api/kontak/reply.php', {
    //   method: 'POST',
    //   body: formData
    // });

    alert(`Balasan terkirim ke ${selectedMessage.email}`);
    setReplyText("");
    setSelectedMessage(null);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kontak & Pesan</h1>
        <p className="text-muted-foreground mt-2">
          Kelola pesan masuk dari pengunjung website
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pesan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Belum Dibaca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sudah Dibaca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{messages.length - unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama, email, atau subjek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`shadow-soft hover:shadow-medium transition-smooth cursor-pointer ${
              !message.is_read ? 'border-l-4 border-l-destructive' : ''
            }`}
            onClick={() => handleView(message)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{message.nama_lengkap}</h3>
                    {!message.is_read && (
                      <Badge variant="destructive" className="text-xs">Baru</Badge>
                    )}
                    {message.consent && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                  <p className="font-medium text-sm mb-2">{message.subjek}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.pesan}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.tanggal).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(message);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMessages.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="p-8 text-center text-muted-foreground">
              Tidak ada pesan ditemukan
            </CardContent>
          </Card>
        )}
      </div>

      {/* View Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Label>Dari</Label>
                <p className="font-medium">{selectedMessage.nama_lengkap}</p>
                <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
              </div>
              <div>
                <Label>Subjek</Label>
                <p className="font-medium">{selectedMessage.subjek}</p>
              </div>
              <div>
                <Label>Pesan</Label>
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.pesan}</p>
              </div>
              <div>
                <Label>Tanggal</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedMessage.tanggal).toLocaleString("id-ID")}
                </p>
              </div>
              
              {/* Reply Form */}
              <div className="border-t pt-4">
                <Label htmlFor="reply">Balas Pesan</Label>
                <Textarea
                  id="reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan Anda..."
                  rows={4}
                  className="mt-2"
                />
                <div className="flex gap-2 mt-3">
                  <Button onClick={handleReply} disabled={!replyText.trim()} className="gap-2">
                    <Mail className="h-4 w-4" />
                    Kirim Balasan
                  </Button>
                  <Button variant="outline" onClick={() => setReplyText("")}>
                    Reset
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {/* PHP: POST to /api/kontak/reply.php */}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
