import React from "react";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { HTMLAttributes } from "react";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CustomComponentProps extends HTMLAttributes<HTMLElement> {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const mdxComponents = {
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
      <SyntaxHighlighter
        // @ts-ignore
        style={materialLight}
        // style={tomorrow as React.CSSProperties}
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
