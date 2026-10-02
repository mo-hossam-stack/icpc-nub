import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { visibleUpTo, type CodeBlock, type Slide } from './decks'

/** react-markdown hands children over as a string or an array of strings. */
function norm(children: unknown): string {
  const raw = Array.isArray(children) ? children.join('') : String(children ?? '')
  return raw.replace(/\s+$/, '')
}

function CodeBlockView({ block, step }: { block: CodeBlock; step: number }) {
  const [copied, setCopied] = useState(false)
  const cut = visibleUpTo(block, step)
  const shown = block.lines.slice(0, cut === Infinity ? undefined : cut)
  const left = block.lines.length - shown.length

  return (
    <div className="deck__code">
      <div className="deck__code__bar">
        <span>{block.lang || 'code'}</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(block.lines.join('\n')).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1400)
            })
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{shown.join('\n')}</code>
      </pre>
      {left > 0 && <span className="deck__code__more">{left} more line{left === 1 ? '' : 's'}</span>}
    </div>
  )
}

export function MarkdownSlide({ slide, step = 0 }: { slide: Slide; step?: number }) {
  const blocks = new Map(slide.codes.map((b) => [norm(b.lines.join('\n')), b]))

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: ({ children, className }) => {
          const text = norm(children)
          const isBlock = text.includes('\n') || className?.startsWith('language-')
          if (!isBlock) return <code>{text}</code>
          const block = blocks.get(text)
          if (!block) return <code>{text}</code>
          return <CodeBlockView block={block} step={step} />
        },
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {slide.body}
    </Markdown>
  )
}
