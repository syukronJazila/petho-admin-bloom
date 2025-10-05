import { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { KeyValueEditor } from "@/components/KeyValueEditor";
import { ArrayEditor } from "@/components/ArrayEditor";
import { PLANTS } from "@/lib/dummy-data";
import { toast } from "sonner";

export default function TanamanForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  // Find existing plant if editing
  const existingPlant = isEdit ? PLANTS.find(p => p.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    nama: existingPlant?.nama || "",
    nama_latin: existingPlant?.nama_latin || "",
    image: existingPlant?.image || "",
    kategori: existingPlant?.kategori || "",
    fakta_singkat: existingPlant?.fakta_singkat || { air: "", cahaya: "", iklim: "", panen: "" },
    deskripsi: existingPlant?.deskripsi || "",
    manfaat: existingPlant?.manfaat || [],
    referensi: existingPlant?.referensi || []
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (file: File | null, preview: string) => {
    setImageFile(file);
    setFormData({ ...formData, image: preview });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.nama.trim()) {
      toast.error("Nama tanaman wajib diisi");
      return;
    }
    if (!formData.nama_latin.trim()) {
      toast.error("Nama latin wajib diisi");
      return;
    }
    if (!formData.image) {
      toast.error("Gambar wajib diupload");
      return;
    }

    // Prepare FormData for PHP backend
    const submitData = new FormData();
    submitData.append('nama', formData.nama.trim());
    submitData.append('nama_latin', formData.nama_latin.trim());
    if (imageFile) {
      submitData.append('image', imageFile);
    }
    submitData.append('kategori', formData.kategori.trim());
    submitData.append('fakta_singkat', JSON.stringify(formData.fakta_singkat));
    submitData.append('deskripsi', formData.deskripsi.trim());
    submitData.append('manfaat', JSON.stringify(formData.manfaat));
    submitData.append('referensi', JSON.stringify(formData.referensi));

    // TODO: replace with actual API call
    // const endpoint = isEdit 
    //   ? `/api/tanaman/update.php?id=${id}`
    //   : '/api/tanaman/create.php';
    // 
    // try {
    //   const response = await fetch(endpoint, {
    //     method: 'POST',
    //     body: submitData
    //   });
    //   const result = await response.json();
    //   
    //   if (result.error) {
    //     toast.error(result.message);
    //   } else {
    //     toast.success(result.message);
    //     navigate('/tanaman');
    //   }
    // } catch (error) {
    //   toast.error('Terjadi kesalahan saat menyimpan data');
    // }

    // Temporary success simulation
    toast.success(isEdit ? "Tanaman berhasil diupdate!" : "Tanaman berhasil ditambahkan!");
    setTimeout(() => navigate('/tanaman'), 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/tanaman')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEdit ? 'Edit Tanaman' : 'Tambah Tanaman Baru'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit ? 'Update informasi tanaman herbal' : 'Tambahkan tanaman herbal ke database'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Informasi Tanaman</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nama">
                  Nama Tanaman <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="contoh: Lidah Buaya"
                  required
                />
                {/* PHP: $_POST['nama'] */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nama_latin">
                  Nama Latin <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nama_latin"
                  value={formData.nama_latin}
                  onChange={(e) => setFormData({ ...formData, nama_latin: e.target.value })}
                  placeholder="contoh: Aloe vera"
                  required
                />
                {/* PHP: $_POST['nama_latin'] */}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori</Label>
              <Input
                id="kategori"
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                placeholder="contoh: Sukulen, Rimpang, Herba"
              />
              {/* PHP: $_POST['kategori'] */}
            </div>

            {/* Image Upload */}
            <ImageUpload
              label="Gambar Tanaman"
              value={formData.image}
              onChange={handleImageChange}
              required
            />

            {/* Fakta Singkat (Key-Value JSON) */}
            <KeyValueEditor
              label="Fakta Singkat"
              value={formData.fakta_singkat}
              onChange={(value) => setFormData({ ...formData, fakta_singkat: value })}
              defaultKeys={['air', 'cahaya', 'iklim', 'panen']}
            />

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Deskripsi singkat tentang tanaman..."
                rows={4}
              />
              {/* PHP: $_POST['deskripsi'] */}
            </div>

            {/* Manfaat (JSON Array) */}
            <ArrayEditor
              label="Manfaat"
              value={formData.manfaat}
              onChange={(value) => setFormData({ ...formData, manfaat: value })}
              placeholder="Ketik manfaat dan tekan Enter"
            />

            {/* Referensi (JSON Array) */}
            <ArrayEditor
              label="Referensi"
              value={formData.referensi}
              onChange={(value) => setFormData({ ...formData, referensi: value })}
              placeholder="Ketik sumber referensi dan tekan Enter"
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                {isEdit ? 'Update' : 'Simpan'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/tanaman')}
              >
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* PHP Integration Note */}
      <Card className="shadow-soft bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>PHP Backend Integration:</strong> Form ini akan mengirim data ke{" "}
            <code className="bg-background px-1 py-0.5 rounded">
              {isEdit ? `/api/tanaman/update.php?id=${id}` : '/api/tanaman/create.php'}
            </code>
            {" "}dengan method POST (multipart/form-data). JSON fields: fakta_singkat, manfaat, referensi.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
