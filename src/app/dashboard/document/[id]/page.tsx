import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LiveDocumentEditor } from "@/components/LiveDocumentEditor";
import { SharePanel } from "@/components/SharePanel";

async function getDocument(id: string) {
  if (id && id.length > 5) {
    return { id, title: "Eduifa-Editor" };
  }
  return null;
}

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const document = await getDocument(params.id);

  if (!document) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold text-foreground">{document.title}</h1>
        <small>
          Write notes, explain, collborate with others. Invite others by sharing
          the link
        </small>
        <SharePanel documentId={document.id} />
      </header>
      <main className="flex-grow overflow-hidden">
        <Suspense fallback={<div className="p-4">Loading editor...</div>}>
          <LiveDocumentEditor documentId={document.id} />
        </Suspense>
      </main>
    </div>
  );
}
