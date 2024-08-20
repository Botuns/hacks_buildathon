import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeInferDescriptionMeta from "rehype-infer-description-meta";
import rehypeInferReadingTimeMeta from "rehype-infer-reading-time-meta";
import rehypeInferTitleMeta from "rehype-infer-title-meta";
import rehypeMinifyUrl from "rehype-minify-url";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeRaw from "rehype-raw";
import rehypeShiftHeading from "rehype-shift-heading";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from "rehype-starry-night";
import rehypeTwoslash from "rehype-twoslash";
import remarkFrontmatter from "remark-frontmatter";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import remarkStripBadges from "remark-strip-badges";
import remarkToc from "remark-toc";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  transpilePackages: ["next-mdx-remote"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkGemoji,
      remarkGfm,
      remarkGithub,
      remarkMdxFrontmatter,
      remarkSqueezeParagraphs,
      remarkStripBadges,
      remarkToc,
    ],
    rehypePlugins: [
      rehypeAutolinkHeadings,
      rehypeInferDescriptionMeta,
      rehypeInferReadingTimeMeta,
      rehypeInferTitleMeta,
      rehypeMinifyUrl,
      rehypePresetMinify,
      rehypeRaw,
      rehypeShiftHeading,
      rehypeSlug,
      rehypeStarryNight,
      rehypeTwoslash,
    ],
  },
});

export default withMDX(nextConfig);
