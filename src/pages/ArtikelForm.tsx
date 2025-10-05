import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, X, Eye } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ImageUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ARTICLES } from "@/lib/dummy-data";

const artikelSchema = z.object({
  judul: z.string().min(1, "Judul harus diisi"),
  image: z.string().min(1, "Gambar harus diupload"),
  author: z.string().min(1, "Nama author harus diisi"),
  tanggal: z.string().min(1, "Tanggal harus diisi"),
  waktu_baca: z.string().min(1, "Waktu baca harus diisi"),
  kategori: z.string().min(1, "Kategori harus diisi"),
  konten: z.string().min(1, "Konten harus diisi"),
});

type ArtikelFormData = z.infer<typeof artikelSchema>;

export default function ArtikelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;

  const [konten, setKonten] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArtikelFormData>({
    resolver: zodResolver(artikelSchema),
  });

  const imageValue = watch("image");

  useEffect(() => {
    if (isEdit) {
      // TODO: Replace with actual API call to /api/artikel/read.php?id=${id}
      const existing = ARTICLES.find((a) => a.id === parseInt(id));
      if (existing) {
        setValue("judul", existing.judul);
        setValue("image", existing.image);
        setValue("author", existing.author);
        setValue("tanggal", existing.tanggal);
        setValue("waktu_baca", existing.waktu_baca);
        setValue("kategori", existing.kategori);
        setKonten(existing.konten);
        setTags(existing.tags);
      }
    }
  }, [id, isEdit, setValue]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data: ArtikelFormData) => {
    // Combine form data with CKEditor content and tags
    const payload = {
      ...data,
      konten: konten,
      tags: JSON.stringify(tags), // PHP: JSON array string
    };

    // TODO: Replace with actual API call
    // const formData = new FormData();
    // Object.entries(payload).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // const endpoint = isEdit ? '/api/artikel/update.php' : '/api/artikel/create.php';
    // await fetch(endpoint, { method: 'POST', body: formData });

    console.log("Submit payload:", payload);

    toast({
      title: isEdit ? "Berhasil diupdate" : "Berhasil dibuat",
      description: `Artikel "${data.judul}" telah ${isEdit ? "diupdate" : "dibuat"}.`,
    });

    navigate("/artikel");
  };

  const sanitizedContent = DOMPurify.sanitize(konten);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/artikel")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEdit ? "Edit Artikel" : "Tambah Artikel"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEdit ? "Update artikel" : "Buat artikel baru"}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="judul">Judul Artikel *</Label>
              <Input id="judul" {...register("judul")} placeholder="Judul artikel yang menarik" />
              {errors.judul && <p className="text-sm text-destructive mt-1">{errors.judul.message}</p>}
            </div>

            <div>
              {/* PHP: $_FILES['image'] */}
              <ImageUpload
                label="Gambar Featured *"
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
                <Label htmlFor="author">Author *</Label>
                <Input id="author" {...register("author")} placeholder="Nama penulis" />
                {errors.author && <p className="text-sm text-destructive mt-1">{errors.author.message}</p>}
              </div>

              <div>
                <Label htmlFor="tanggal">Tanggal *</Label>
                <Input id="tanggal" type="date" {...register("tanggal")} />
                {errors.tanggal && <p className="text-sm text-destructive mt-1">{errors.tanggal.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="kategori">Kategori *</Label>
                <Input id="kategori" {...register("kategori")} placeholder="Contoh: Panduan" />
                {errors.kategori && <p className="text-sm text-destructive mt-1">{errors.kategori.message}</p>}
              </div>

              <div>
                <Label htmlFor="waktu_baca">Waktu Baca *</Label>
                <Input id="waktu_baca" {...register("waktu_baca")} placeholder="Contoh: 5 menit" />
                {errors.waktu_baca && <p className="text-sm text-destructive mt-1">{errors.waktu_baca.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Ketik tag dan tekan Enter"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Tambah
                </Button>
              </div>
              {/* PHP: JSON.stringify(tags) will be sent as JSON array string */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Artikel *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <CKEditor
                editor={ClassicEditor}
                data={konten}
                config={{
                  // TODO: Configure image upload to /api/uploads/ck_image_upload.php
                }}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setKonten(data);
                  setValue("konten", data, { shouldValidate: true });
                }}
              />
            </div>
            {errors.konten && <p className="text-sm text-destructive mt-1">{errors.konten.message}</p>}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit">{isEdit ? "Update Artikel" : "Publikasi Artikel"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/artikel")}>
            Batal
          </Button>
        </div>
      </form>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Artikel</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              className="article-preview"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
