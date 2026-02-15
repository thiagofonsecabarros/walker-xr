import { NavLink, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { getAllDevlogs, getDevlogBySlug, markdownToHtml } from './lib/devlog'

const planGroups = [
  {
    title: 'Core Interaction',
    icon: '🎙️',
    summary: 'Hands-free control and low-friction HUD interactions designed for daily use.',
    image: `${import.meta.env.BASE_URL}images/plan/voice-hud.svg`,
    features: [
      {
        name: 'Voice-First Navigation',
        description: 'Control the AR assistant hands-free with natural commands and follow-up context.',
      },
      {
        name: 'Contextual HUD',
        description: 'Keep a minimal always-on layer for time, tasks, and critical alerts.',
      },
      {
        name: 'Quick Voice Note Capture',
        description: 'Record and transcribe thoughts instantly while staying in flow.',
      },
      {
        name: 'Gaze-Based Selection',
        description: 'Select HUD elements with head orientation or gaze approximation when voice is noisy.',
      },
      {
        name: 'Gesture Detection',
        description: 'Use hand gestures to navigate and confirm actions naturally.',
      },
      {
        name: 'Focus / Do-Not-Disturb Mode',
        description: 'Suppress non-essential overlays and interruptions during deep work sessions.',
      },
    ],
  },
  {
    title: 'Vision Intelligence',
    icon: '👁️',
    summary: 'Scene understanding and visual reasoning that turns camera input into useful actions.',
    image: `${import.meta.env.BASE_URL}images/plan/vision-intel.svg`,
    features: [
      {
        name: 'OCR (Text & Screen Reading)',
        description: 'Read labels, manuals, documents, and screens in real time.',
      },
      {
        name: 'Live Object Recognition',
        description: 'Identify tools, products, and everyday objects through the camera feed.',
      },
      {
        name: 'What-Am-I-Looking-At Mode',
        description: 'Request deeper scene analysis with contextual explanations on demand.',
      },
      {
        name: 'Scene Understanding',
        description: 'Detect environments like office, kitchen, or outdoors and adapt behavior.',
      },
      {
        name: 'On-the-Spot Explanations',
        description: 'Explain visible objects, processes, and concepts in the current moment.',
      },
      {
        name: 'Live Translation Overlay',
        description: 'Translate text or speech directly in the AR field of view.',
      },
      {
        name: 'Safety & Hazard Alerts',
        description: 'Detect potential environmental risks and surface proactive warnings.',
      },
      {
        name: 'Face Recognition (Opt-In)',
        description: 'Recognize known people and surface context only when explicitly enabled.',
      },
    ],
  },
  {
    title: 'Productivity & Automation',
    icon: '✅',
    summary: 'Task flow, schedules, and app orchestration for reliable day-to-day execution.',
    image: `${import.meta.env.BASE_URL}images/plan/automation.svg`,
    features: [
      {
        name: 'Task Management Overlay',
        description: 'Display and manage to-do items directly in AR without switching screens.',
      },
      {
        name: 'Calendar Awareness',
        description: 'Show upcoming meetings with preparation cues based on context.',
      },
      {
        name: 'Reminder Anchoring',
        description: 'Trigger reminders tied to specific objects or places you encounter.',
      },
      {
        name: 'Email Summarization & Triage',
        description: 'Read and prioritize inbox content hands-free while moving.',
      },
      {
        name: 'Tool-Orchestrated Actions',
        description: 'Run multi-step workflows across connected apps with one command.',
      },
      {
        name: 'Routine Automation',
        description: 'Automate recurring daily and weekly operational workflows.',
      },
      {
        name: 'Proactive Suggestions',
        description: 'Surface relevant insights or suggested actions without explicit prompts.',
      },
      {
        name: 'Multi-Workspace Switching',
        description: 'Separate work, personal, and creative AR contexts with fast switching.',
      },
    ],
  },
  {
    title: 'Memory & Knowledge',
    icon: '🧠',
    summary: 'Intentional capture, recall, and connected memory to reduce repeated work.',
    image: `${import.meta.env.BASE_URL}images/plan/knowledge.svg`,
    features: [
      {
        name: 'Visual Memory Log (Explicit Capture)',
        description: 'Store and revisit visual moments only when intentionally captured.',
      },
      {
        name: 'Search Your Life',
        description: 'Query past scenes, notes, objects, and decisions in natural language.',
      },
      {
        name: 'Contextual Recall Prompts',
        description: 'Resurface relevant notes when revisiting known places or objects.',
      },
      {
        name: 'Personal Knowledge Graph',
        description: 'Link people, projects, objects, and places into a unified memory graph.',
      },
      {
        name: 'Object-to-Asset Capture',
        description: 'Turn real-world objects into reusable visual reference assets.',
      },
      {
        name: 'Explicit Capture Controls',
        description: 'Provide clear user-controlled modes for observing versus recording.',
      },
      {
        name: 'Full Activity Audit Log',
        description: 'Review what the assistant saw, stored, or acted on with full transparency.',
      },
    ],
  },
  {
    title: 'Creative Studio',
    icon: '🎨',
    summary: 'Generative and editing workflows designed around first-person XR creation.',
    image: `${import.meta.env.BASE_URL}images/plan/creative.svg`,
    features: [
      {
        name: 'Image Generation',
        description: 'Generate images from voice prompts or current scene context.',
      },
      {
        name: 'Social Media Drafting',
        description: 'Generate captions and post drafts directly from POV content.',
      },
      {
        name: 'Video Capture with AI Editing',
        description: 'Record POV video and auto-produce summary cuts or highlights.',
      },
      {
        name: 'Image Editing in AR',
        description: 'Annotate, crop, and modify images hands-free in the headset workflow.',
      },
      {
        name: 'AR Storyboarding',
        description: 'Plan shots and designs spatially with lightweight scene layouts.',
      },
      {
        name: '3D Model Generation',
        description: 'Create simple 3D models from text prompts or visual scans.',
      },
    ],
  },
  {
    title: 'Agents, Privacy & Collaboration',
    icon: '🛡️',
    summary: 'Adaptive agent behavior with privacy safeguards and remote collaboration tooling.',
    image: `${import.meta.env.BASE_URL}images/plan/collab.svg`,
    features: [
      {
        name: 'Custom Agent Profiles',
        description: 'Switch assistant personalities for work, learning, or creative sessions.',
      },
      {
        name: 'Contextual Agent Triggers',
        description: 'Activate specific agents automatically based on what you see or do.',
      },
      {
        name: 'Live AR View Sharing',
        description: 'Share AR view or annotations live with another user when needed.',
      },
      {
        name: 'Remote Assistance Mode',
        description: 'Allow remote experts to guide tasks using your live camera feed.',
      },
      {
        name: 'Instructional Guidance Mode',
        description: 'Overlay step-by-step instructions for assembly, cooking, or repairs.',
      },
      {
        name: 'Privacy Zones',
        description: 'Disable capture and analysis in defined sensitive locations.',
      },
      {
        name: 'Local-First Processing Toggle',
        description: 'Force on-device inference preference over cloud-backed services.',
      },
    ],
  },
]

function Layout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-row">
          <NavLink to="/" className="brand">Walker XR</NavLink>
          <nav className="nav-links" aria-label="Primary">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/plan">The Plan</NavLink>
            <NavLink to="/process">The Process</NavLink>
            <NavLink to="/architecture">Architecture</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>
      <main className="container page-content">{children}</main>
    </div>
  )
}

function Tag({ children }) {
  return <span className="tag">{children}</span>
}

function HomePage() {
  return (
    <section>
      <div className="hero card">
        <p className="eyebrow">Mixed reality operating surface</p>
        <h1>Walker XR is a voice-first HUD for focused daily activities.</h1>
        <p>
          The goal is simple: wearable context, local intelligence, and fast
          actions without opening a phone every two minutes.
        </p>
        <div className="hero-actions">
          <NavLink to="/plan" className="button">Check The Plan</NavLink>
          <NavLink to="/process" className="button button-ghost">Explore The Process</NavLink>
          <NavLink to="/architecture" className="button button-ghost">View Architecture</NavLink>
        </div>
      </div>

      <div className="section-grid">
        <article className="card">
          <h2>What makes it different</h2>
          <ul>
            <li>Voice-first command loop optimized for glanceable XR workflows.</li>
            <li>Local-first services for OCR and recognition before cloud fallback.</li>
            <li>Composable agent flows that can act on vision context in real time.</li>
          </ul>
        </article>

        <article className="card">
          <h2>Current focus</h2>
          <ul>
            <li>Reliable wake phrase and low-latency intent handling on-device.</li>
            <li>OCR overlays that anchor extracted text to real world surfaces.</li>
            <li>Object recognition tuned for practical workbench and desk scenarios.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

function PlanPage() {
  const totalFeatures = planGroups.reduce((sum, group) => sum + group.features.length, 0)

  return (
    <section className="plan-page">
      <article className="card plan-hero">
        <p className="eyebrow">Roadmap</p>
        <h1>The Plan</h1>
        <p className="lead">
          A structured roadmap for Walker XR across interaction, vision intelligence,
          productivity, memory, creativity, and collaborative agents.
        </p>
        <div className="plan-stats" aria-label="Roadmap statistics">
          <span>{planGroups.length} capability groups</span>
          <span>{totalFeatures} planned features</span>
          <span>Local-first by default</span>
        </div>
      </article>

      <div className="plan-grid">
        {planGroups.map((group) => (
          <article className="card plan-group" key={group.title}>
            <img src={group.image} alt={`${group.title} visual`} className="plan-image" />
            <div className="plan-group-head">
              <span className="plan-icon" aria-hidden="true">{group.icon}</span>
              <div>
                <h2>{group.title}</h2>
                <p className="muted">{group.summary}</p>
              </div>
            </div>
            <ul className="feature-list">
              {group.features.map((feature) => (
                <li key={feature.name}>
                  <h3>{feature.name}</h3>
                  <p>{feature.description}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessListPage() {
  const posts = getAllDevlogs()

  return (
    <section>
      <h1>The Process</h1>
      <p className="lead">Structured implementation notes based on the Walker Brain README and delivery milestones.</p>
      <div className="list-grid">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <p className="muted">{post.date}</p>
            <h2>{post.title}</h2>
            <div className="tag-row">
              {post.tags.map((tag) => (
                <Tag key={`${post.slug}-${tag}`}>{tag}</Tag>
              ))}
            </div>
            <p>{post.summary}</p>
            <NavLink to={`/process/${post.slug}`} className="text-link">Read log</NavLink>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessDetailPage() {
  const { slug } = useParams()
  const post = getDevlogBySlug(slug)

  if (!post) {
    return (
      <section>
        <h1>Log not found</h1>
        <NavLink to="/process" className="text-link">Back to The Process</NavLink>
      </section>
    )
  }

  return (
    <article>
      <p className="muted">{post.date}</p>
      <h1>{post.title}</h1>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <Tag key={`${post.slug}-${tag}`}>{tag}</Tag>
        ))}
      </div>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.body) }}
      />
      <NavLink to="/process" className="text-link">Back to The Process</NavLink>
    </article>
  )
}

function ArchitecturePage() {
  return (
    <section>
      <h1>Architecture</h1>
      <p className="lead">
        Walker XR is structured as a local-first stack with optional cloud support.
      </p>

      <article className="card">
        <h2>System overview</h2>
        <ul>
          <li>Android/XREAL client captures voice, camera frames, and renders HUD overlays.</li>
          <li>Local Python services handle speech routing, OCR, and object recognition.</li>
          <li>Optional cloud adapters are used for heavy tasks or remote sync only when needed.</li>
        </ul>
      </article>

      <article className="card diagram-card">
        <h2>Text diagram</h2>
        <pre>{`[User Voice + Camera]
         |
         v
[Android/XREAL Client]
         |
         v
[Local Python Services]
  |- Intent Router
  |- OCR Engine
  |- Object Recognition
         |
         +--> [Optional Cloud APIs]
         |
         v
[HUD Actions + Notes + Reminders]`}</pre>
      </article>

      <article className="card">
        <h2>Local-first principles</h2>
        <ul>
          <li>Core interactions stay functional offline.</li>
          <li>Sensitive visual data is processed locally by default.</li>
          <li>Cloud usage is explicit, optional, and scoped to clear value.</li>
        </ul>
      </article>
    </section>
  )
}

function ContactPage() {
  return (
    <section>
      <h1>Contact</h1>
      <p className="lead">Interested in collaboration, testing, or technical feedback.</p>
      <div className="card">
        <p><strong>LinkedIn:</strong> <a href="#">https://www.linkedin.com/in/thiagofbarros/</a></p>
        <p><strong>GitHub:</strong> <a href="#">https://github.com/thiagofonsecabarros/walker-xr</a></p>
        <p><strong>Email:</strong> <a href="mailto:thiagofbarros@gmail.com">thiagofbarros@gmail.com</a></p>
      </div>
    </section>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/process" element={<ProcessListPage />} />
        <Route path="/process/:slug" element={<ProcessDetailPage />} />
        <Route path="/devlog" element={<Navigate to="/process" replace />} />
        <Route path="/devlog/:slug" element={<Navigate to="/process" replace />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  )
}

export default App
