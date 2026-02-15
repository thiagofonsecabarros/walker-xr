const postFiles = import.meta.glob('../content/devlog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const baseUrl = import.meta.env.BASE_URL || '/'

function parseFrontmatter(rawContent) {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    return { frontmatter: {}, body: rawContent.trim() }
  }

  const [, frontmatterRaw, body] = match
  const frontmatter = {}

  frontmatterRaw.split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx === -1) return

    const key = line.slice(0, idx).trim()
    const rawValue = line.slice(idx + 1).trim()

    if (rawValue.startsWith('[')) {
      try {
        frontmatter[key] = JSON.parse(rawValue)
      } catch {
        frontmatter[key] = []
      }
      return
    }

    frontmatter[key] = rawValue.replace(/^"|"$/g, '')
  })

  return { frontmatter, body: body.trim() }
}

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

function normalizePost(path, raw) {
  const { frontmatter, body } = parseFrontmatter(raw)

  return {
    slug: slugFromPath(path),
    title: frontmatter.title || 'Untitled',
    date: frontmatter.date || '1970-01-01',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    summary: frontmatter.summary || '',
    body,
  }
}

const allPosts = Object.entries(postFiles)
  .map(([path, raw]) => normalizePost(path, raw))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function resolveAssetUrl(url) {
  if (/^(https?:|data:|mailto:|#)/.test(url)) return url
  if (url.startsWith('/')) return `${baseUrl}${url.slice(1)}`
  return `${baseUrl}${url}`
}

function inlineMarkdownToHtml(text) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      return `<img src="${resolveAssetUrl(src)}" alt="${alt}" loading="lazy" />`
    })
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

export function markdownToHtml(markdown) {
  const lines = markdown.split('\n')
  const blocks = []
  let paragraph = []
  let listItems = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push(`<p>${inlineMarkdownToHtml(paragraph.join(' '))}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length) return
    blocks.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdownToHtml(item)}</li>`).join('')}</ul>`)
    listItems = []
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      return
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph()
      flushList()
      blocks.push(`<h1>${inlineMarkdownToHtml(trimmed.slice(2))}</h1>`)
      return
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph()
      flushList()
      blocks.push(`<h2>${inlineMarkdownToHtml(trimmed.slice(3))}</h2>`)
      return
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph()
      flushList()
      blocks.push(`<h3>${inlineMarkdownToHtml(trimmed.slice(4))}</h3>`)
      return
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph()
      listItems.push(trimmed.slice(2))
      return
    }

    paragraph.push(trimmed)
  })

  flushParagraph()
  flushList()

  return blocks.join('\n')
}

export function getAllDevlogs() {
  return allPosts
}

export function getDevlogBySlug(slug) {
  return allPosts.find((post) => post.slug === slug)
}
