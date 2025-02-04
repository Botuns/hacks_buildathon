import React, { useEffect, useRef, HTMLAttributes } from "react";
import Image from "next/image";
import mermaid from "mermaid";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CustomComponentProps extends HTMLAttributes<HTMLElement> {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// ✅ Alert Component
const Alert = ({
  variant = "info",
  children,
}: {
  variant: "info" | "note" | "tip" | "warning";
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-blue-100 text-blue-800 border-l-4 border-blue-500 p-4",
    note: "bg-gray-100 text-gray-800 border-l-4 border-gray-500 p-4",
    tip: "bg-green-100 text-green-800 border-l-4 border-green-500 p-4",
    warning: "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-4",
  };
  return <div className={`${styles[variant]} my-4 rounded`}>{children}</div>;
};

// ✅ VideoExplanation Component
const VideoExplanation = ({
  title,
  duration,
  children,
}: {
  title: string;
  duration: string;
  children: React.ReactNode;
}) => (
  <div className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-lg my-4">
    <h3 className="font-semibold">
      {title} ({duration})
    </h3>
    <div className="text-sm">{children}</div>
  </div>
);

// ✅ Exercise Component
const Exercise = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-l-4 border-purple-400 bg-purple-50 rounded-lg my-4">
    <h3 className="font-semibold">Exercise</h3>
    <div className="text-sm">{children}</div>
  </div>
);

// ✅ Mermaid Component (Fix: Properly initializes Mermaid.js)
const Mermaid = ({ children }: { children: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.init(undefined, ref.current);
    }
  }, [children]);

  return (
    <div className="mermaid" ref={ref}>
      {children}
    </div>
  );
};

// ✅ Quiz Component
const Quiz = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-l-4 border-green-400 bg-green-50 rounded-lg my-4">
    <h3 className="font-semibold">Quiz</h3>
    <div className="text-sm">{children}</div>
  </div>
);

// ✅ MDX Components Export
const mdxComponents = {
  Alert,
  VideoExplanation,
  Exercise,
  Mermaid,
  Quiz,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold my-4" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold my-3" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold my-2" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold my-2" {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="text-base font-semibold my-2" {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="text-sm font-semibold my-2" {...props} />
  ),
  i: (props: HTMLAttributes<HTMLElement>) => (
    <i className="italic" {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 border-gray-400" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-2" {...props} />
  ),
  img: (props: { src: string; alt?: string }) => (
    <div className="my-4">
      <Image
        src={props.src}
        alt={props.alt || "Image"}
        width={400}
        height={450}
        layout="responsive"
        className="rounded-lg"
      />
    </div>
  ),
  iframe: (props: HTMLAttributes<HTMLIFrameElement>) => (
    <div className="my-4 aspect-w-16 aspect-h-9">
      <iframe {...props} className="w-full h-full" />
    </div>
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse table-auto" {...props} />
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-200" {...props} />
  ),
  tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-gray-100 divide-y divide-gray-300" {...props} />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-50" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
      {...props}
    />
  ),
  code: ({
    node,
    inline,
    className,
    children,
    ...props
  }: CustomComponentProps) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      // @ts-ignore
      <SyntaxHighlighter
      // @ts-ignore
        style={materialLight}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default mdxComponents;
