import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { BUDIDAYA } from "@/lib/dummy-data";

const budidayaSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  image: z.string().min(1, "Gambar harus diupload"),
  kategori: z.string().min(1, "Kategori harus diisi"),
  nama_tanaman: z.string().min(1, "Nama tanaman harus diisi"),
  type: z.string().min(1, "Tipe harus diisi"),
  waktu_tanam: z.string().min(1, "Waktu tanam harus diisi"),
  kutipan: z.string().min(1, "Kutipan harus diisi"),
  cara_tanam: z.string().min(1, "Cara tanam harus diisi"),
  perawatan: z.string().min(1, "Perawatan harus diisi"),
  pupuk: z.string().min(1, "Pupuk harus diisi"),
  penyiraman: z.string().min(1, "Penyiraman harus diisi"),
  hama: z.string().min(1, "Hama harus diisi"),
});

type BudidayaFormData = z.infer<typeof budidayaSchema>;

export default function BudidayaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [caraTanam, setCaraTanam] = useState("");
  const [perawatan, setPerawatan] = useState("");
  const [pupuk, setPupuk] = useState("");
  const [penyiraman, setPenyiraman] = useState("");
  const [hama, setHama] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BudidayaFormData>({
    resolver: zodResolver(budidayaSchema),
  });

  const imageValue = watch("image");

  useEffect(() => {
    if (isEdit) {
      // TODO: Replace with actual API call to /api/budidaya/read.php?id=${id}
      const existing = BUDIDAYA.find((b) => b.id === parseInt(id));
      if (existing) {
        setValue("title", existing.title);
        setValue("image", existing.image);
        setValue("kategori", existing.kategori);
        setValue("nama_tanaman", existing.nama_tanaman);
        setValue("type", existing.type);
        setValue("waktu_tanam", existing.waktu_tanam);
        setValue("kutipan", existing.kutipan);
        setCaraTanam(existing.cara_tanam);
        setPerawatan(existing.perawatan);
        setPupuk(existing.pupuk);
        setPenyiraman(existing.penyiraman);
        setHama(existing.hama);
      }
    }
  }, [id, isEdit, setValue]);

  const onSubmit = async (data: BudidayaFormData) => {
    // Combine form data with CKEditor content
    const payload = {
      ...data,
      cara_tanam: caraTanam,
      perawatan: perawatan,
      pupuk: pupuk,
      penyiraman: penyiraman,
      hama: hama,
    };

    // TODO: Replace with actual API call
    // const formData = new FormData();
    // Object.entries(payload).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // const endpoint = isEdit ? '/api/budidaya/update.php' : '/api/budidaya/create.php';
    // await fetch(endpoint, { method: 'POST', body: formData });

    console.log("Submit payload:", payload);

    toast({
      title: isEdit ? "Berhasil diupdate" : "Berhasil dibuat",
      description: `Budidaya "${data.title}" telah ${isEdit ? "diupdate" : "dibuat"}.`,
    });

    navigate("/budidaya");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/budidaya")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? "Edit Budidaya" : "Tambah Budidaya"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEdit ? "Update informasi budidaya" : "Buat panduan budidaya baru"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Judul *</Label>
              <Input id="title" {...register("title")} placeholder="Contoh: Cara Menanam Jahe Merah di Pot" />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              {/* PHP: $_FILES['image'] */}
              <ImageUpload
                label="Gambar Thumbnail *"
                value={imageValue}
                onChange={(file) => {
                  // In production, upload file and get URL
                  // const url = await uploadToServer(file);
                  setValue("image", URL.createObjectURL(file), { shouldValidate: true });
                }}
              />
              {errors.image && <p className="text-sm text-destructive mt-1">{errors.image.message}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="kategori">Kategori *</Label>
                <Input id="kategori" {...register("kategori")} placeholder="Contoh: Rimpang" />
                {errors.kategori && <p className="text-sm text-destructive mt-1">{errors.kategori.message}</p>}
              </div>

              <div>
                <Label htmlFor="nama_tanaman">Nama Tanaman *</Label>
                <Input id="nama_tanaman" {...register("nama_tanaman")} placeholder="Contoh: Jahe Merah" />
                {errors.nama_tanaman && <p className="text-sm text-destructive mt-1">{errors.nama_tanaman.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="type">Tipe Budidaya *</Label>
                <Input id="type" {...register("type")} placeholder="Contoh: Pot/Kontainer" />
                {errors.type && <p className="text-sm text-destructive mt-1">{errors.type.message}</p>}
              </div>

              <div>
                <Label htmlFor="waktu_tanam">Waktu Tanam *</Label>
                <Input id="waktu_tanam" {...register("waktu_tanam")} placeholder="Contoh: Awal musim hujan" />
                {errors.waktu_tanam && <p className="text-sm text-destructive mt-1">{errors.waktu_tanam.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="kutipan">Kutipan *</Label>
              <Input id="kutipan" {...register("kutipan")} placeholder="Kutipan singkat tentang budidaya ini" />
              {errors.kutipan && <p className="text-sm text-destructive mt-1">{errors.kutipan.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Rich Text Content */}
        <Card>
          <CardHeader>
            <CardTitle>Panduan Budidaya (Rich Text)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Cara Tanam *</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={caraTanam}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    setCaraTanam(data);
                    setValue("cara_tanam", data, { shouldValidate: true });
                  }}
                />
              </div>
              {errors.cara_tanam && <p className="text-sm text-destructive mt-1">{errors.cara_tanam.message}</p>}
            </div>

            <div>
              <Label>Perawatan *</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={perawatan}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    setPerawatan(data);
                    setValue("perawatan", data, { shouldValidate: true });
                  }}
                />
              </div>
              {errors.perawatan && <p className="text-sm text-destructive mt-1">{errors.perawatan.message}</p>}
            </div>

            <div>
              <Label>Pupuk *</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={pupuk}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    setPupuk(data);
                    setValue("pupuk", data, { shouldValidate: true });
                  }}
                />
              </div>
              {errors.pupuk && <p className="text-sm text-destructive mt-1">{errors.pupuk.message}</p>}
            </div>

            <div>
              <Label>Penyiraman *</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={penyiraman}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    setPenyiraman(data);
                    setValue("penyiraman", data, { shouldValidate: true });
                  }}
                />
              </div>
              {errors.penyiraman && <p className="text-sm text-destructive mt-1">{errors.penyiraman.message}</p>}
            </div>

            <div>
              <Label>Hama & Penyakit *</Label>
              <div className="mt-2 border rounded-lg overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={hama}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    setHama(data);
                    setValue("hama", data, { shouldValidate: true });
                  }}
                />
              </div>
              {errors.hama && <p className="text-sm text-destructive mt-1">{errors.hama.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit">{isEdit ? "Update Budidaya" : "Simpan Budidaya"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/budidaya")}>
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
