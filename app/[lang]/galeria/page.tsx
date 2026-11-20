import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery-grid";
import { PageHeader } from "@/components/ui";
import { gallery, galleryCategories } from "@/lib/content/gallery";
import { home } from "@/lib/content/home";
import { galleryPage } from "@/lib/content/pages";
import { ui } from "@/lib/content/ui";
import { hasLocale, href, translator } from "@/lib/i18n";
import { img } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/galeria">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: galleryPage.title[lang], description: galleryPage.subtitle[lang], alternates: { canonical: `/${lang}/galeria` } };
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/galeria">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <>
      <PageHeader
        title={t(galleryPage.title)}
        subtitle={t(galleryPage.subtitle)}
        image={img.criancasGrupo}
        crumbs={[{ label: t(ui.home), href: href(lang) }, { label: t(galleryPage.title) }]}
      />
      <section className="container-site py-12">
        <GalleryGrid
          photos={gallery.map((g) => ({
            image: g.image,
            alt: t(g.alt),
            category: g.category,
            categoryLabel: t(galleryCategories[g.category]),
          }))}
          categories={Object.entries(galleryCategories).map(([key, label]) => ({ key, label: t(label) }))}
          labels={{
            all: t(galleryPage.all),
            photos: t(galleryPage.photos),
            open: t(galleryPage.open),
            close: t(ui.close),
            prev: t(home.video.prev),
            next: t(home.video.next),
          }}
        />
      </section>
    </>
  );
}
