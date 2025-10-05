import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import TanamanList from "./pages/TanamanList";
import TanamanForm from "./pages/TanamanForm";
import BudidayaList from "./pages/BudidayaList";
import BudidayaForm from "./pages/BudidayaForm";
import ArtikelList from "./pages/ArtikelList";
import ArtikelForm from "./pages/ArtikelForm";
import Kontak from "./pages/Kontak";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tanaman" element={<TanamanList />} />
                <Route path="/tanaman/baru" element={<TanamanForm />} />
                <Route path="/tanaman/:id/edit" element={<TanamanForm />} />
                <Route path="/budidaya" element={<BudidayaList />} />
                <Route path="/budidaya/baru" element={<BudidayaForm />} />
                <Route path="/budidaya/:id/edit" element={<BudidayaForm />} />
                <Route path="/artikel" element={<ArtikelList />} />
                <Route path="/artikel/baru" element={<ArtikelForm />} />
                <Route path="/artikel/:id/edit" element={<ArtikelForm />} />
                <Route path="/kontak" element={<Kontak />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AdminLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
