import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STATS, PLANTS, ARTICLES, CONTACTS } from "@/lib/dummy-data";
import { Leaf, FileText, Sprout, MessageSquare, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Tanaman",
      value: STATS.totalPlants,
      icon: Leaf,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Artikel",
      value: STATS.totalArticles,
      icon: FileText,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Budidaya",
      value: STATS.totalBudidaya,
      icon: Sprout,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Pesan Baru",
      value: STATS.unreadMessages,
      icon: MessageSquare,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    }
  ];

  const recentPlants = PLANTS.slice(0, 5);
  const recentArticles = ARTICLES.slice(0, 3);
  const recentMessages = CONTACTS.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang di admin panel PETHOFAR
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild className="gap-2">
            <Link to="/tanaman/baru">
              <Plus className="h-4 w-4" />
              Tambah Tanaman
            </Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/artikel/baru">
              <Plus className="h-4 w-4" />
              Tulis Artikel
            </Link>
          </Button>
          <Button asChild variant="secondary" className="gap-2">
            <Link to="/budidaya/baru">
              <Plus className="h-4 w-4" />
              Tambah Budidaya
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/kontak">
              <MessageSquare className="h-4 w-4" />
              Lihat Pesan
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Items */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Plants */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tanaman Terbaru</span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tanaman">Lihat Semua</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPlants.map((plant) => (
              <div
                key={plant.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <img
                  src={plant.image}
                  alt={plant.nama}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{plant.nama}</p>
                  <p className="text-sm text-muted-foreground truncate italic">
                    {plant.nama_latin}
                  </p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/tanaman/${plant.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pesan Terbaru</span>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/kontak">Lihat Semua</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium">{message.nama_lengkap}</p>
                  {!message.is_read && (
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{message.subjek}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {message.pesan}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Artikel Terbaru</span>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/artikel">Lihat Semua</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="group overflow-hidden rounded-lg border hover:shadow-medium transition-smooth"
              >
                <img
                  src={article.image}
                  alt={article.judul}
                  className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2">{article.judul}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.waktu_baca}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
