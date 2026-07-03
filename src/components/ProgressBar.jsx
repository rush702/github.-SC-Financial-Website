const SECTION_COLORS = {
  A: '#6366f1', B: '#06b6d4', C: '#f43f5e',
  D: '#f59e0b', E: '#10b981', F: '#8b5cf6',
  G: '#34d399', R: '#94a3b8',
}

const SECTION_ICONS = {
  A: '👤', B: '🛡️', C: '❤️', D: '⚡',
  E: '📋', F: '👨‍👩‍👧', G: '✍️', R: '📝',
}

export default function ProgressBar({ progress, section, sectionName, current, total }) {
  const color = SECTION_COLORS[section] || '#6366f1'
  const icon  = SECTION_ICONS[section]  || '●'
  const pct   = Math.min(100, Math.max(0, Math.round(progress)))

  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <div className="progress-section" style={{ color }}>
          <span className="progress-section-dot" style={{ background: color }} />
          {icon} {sectionName}
        </div>
        <span className="progress-pct">{pct}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, color }}
        />
      </div>
    </div>
  )
}
