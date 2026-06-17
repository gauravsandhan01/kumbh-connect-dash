import { createFileRoute } from "@tanstack/react-router";
import { Upload, Star, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Kumbh Vendor Portal" },
      { name: "description", content: "Manage photos for your Kumbh Mela listings." },
    ],
  }),
  component: GalleryPage,
});

const photos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  cover: i === 0,
  bg: `linear-gradient(${i * 30}deg, oklch(0.72 0.18 ${(i * 40) % 360}), oklch(0.40 0.18 ${(i * 60 + 120) % 360}))`,
}));

function GalleryPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">All photos across your listings.</p>
        </div>
        <Button className="shrink-0 rounded-full bg-gradient-saffron text-white shadow-soft hover:opacity-95">
          <Upload className="mr-1 h-4 w-4" /> Upload
        </Button>
      </header>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-saffron/40 bg-saffron/5 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-saffron text-white shadow-soft">
          <Upload className="h-6 w-6" />
        </div>
        <div className="mt-3 font-semibold">Drag & drop photos to upload</div>
        <p className="text-sm text-muted-foreground">Or click upload above · JPG/PNG up to 8MB</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((p) => (
          <div key={p.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-border shadow-card" style={{ background: p.bg }}>
            <div className="absolute inset-0 wave-pattern opacity-40" />
            {p.cover && (
              <Badge className="absolute left-2 top-2 gap-1 bg-temple-gold text-foreground hover:bg-temple-gold">
                <Star className="h-3 w-3 fill-current" /> Cover
              </Badge>
            )}
            <div className="absolute inset-0 flex items-end justify-end gap-1.5 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
              <Button size="icon" className="h-8 w-8 rounded-full bg-white/95 text-foreground hover:bg-white"><Eye className="h-4 w-4" /></Button>
              <Button size="icon" className="h-8 w-8 rounded-full bg-white/95 text-foreground hover:bg-white"><Star className="h-4 w-4" /></Button>
              <Button size="icon" className="h-8 w-8 rounded-full bg-destructive text-white hover:bg-destructive/90"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}