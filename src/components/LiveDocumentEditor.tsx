"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { RoomProvider, useRoom } from "../../liveblocks.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClientSideSuspense } from "@liveblocks/react";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
};

function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return <div>Loading editor...</div>;
  }

  return <TiptapEditor doc={doc} provider={provider} />;
}

function TiptapEditor({ doc, provider }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider: provider,
      }),
    ],
    content: "<p>Hello! This is the collaborative editor.</p>",
  });

  const others = provider.awareness.getStates();

  if (!editor) {
    return <div>Editor is initializing...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 p-2 bg-muted">
        {Array.from(others.entries()).map(([clientId, state]: any) => (
          <Avatar key={clientId}>
            <AvatarFallback>
              {state?.user?.name?.[0] ?? `user-${clientId}`}
            </AvatarFallback>

            <AvatarImage src={"/user.svg"} alt={state?.user?.name ?? "User"} />
          </Avatar>
        ))}
      </div>
      <div className="flex-grow p-4 overflow-auto">
        <EditorContent
          editor={editor}
          className="prose max-w-none border p-4 min-h-[200px]"
        />
      </div>
    </div>
  );
}

export function LiveDocumentEditor({ documentId }: { documentId: string }) {
  return (
    <RoomProvider
      id={`document-${documentId}`}
      initialPresence={{
        cursor: null,
        name: "Anonymous",
        avatar: null,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => <CollaborativeEditor />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
