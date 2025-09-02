import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * Renders bot text with:
 * - Markdown (headings, lists, tables)
 * - LaTeX math via KaTeX
 * - Tightened spacing & readable width using Tailwind Typography
 *
 * Make sure you have:
 *   import 'katex/dist/katex.min.css';  // in your app entry (index.css or main.jsx)
 *   Tailwind Typography plugin enabled (optional but looks great)
 */
const MarkdownMessage = ({ content }) => {
  return (
    <div className="
      prose prose-invert max-w-none
      prose-headings:mt-1 prose-headings:mb-3
      prose-h2:text-xl prose-h3:text-lg prose-p:my-2
      prose-strong:font-semibold prose-a:underline
      prose-li:my-1 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-table:my-3
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
