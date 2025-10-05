import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl font-medium">Halaman Tidak Ditemukan</p>
        <p className="mb-8 text-muted-foreground">
          Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <Button asChild className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
