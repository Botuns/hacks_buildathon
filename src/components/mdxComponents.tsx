import React from "react";
import Image from "next/image";

const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold my-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold my-3" {...props} />,
  p: (props: any) => <p className="my-2" {...props} />,
  img: (props: any) => (
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
  iframe: (props: any) => (
    <div className="my-4 aspect-w-16 aspect-h-9">
      <iframe {...props} className="w-full h-full" />
    </div>
  ),
};

export default mdxComponents;
