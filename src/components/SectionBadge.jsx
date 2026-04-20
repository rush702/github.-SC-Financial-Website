const SECTION_COLORS = {
  A: '#6366f1', B: '#06b6d4', C: '#f43f5e',
  D: '#f59e0b', E: '#10b981', F: '#8b5cf6',
  G: '#34d399', R: '#94a3b8',
}
const SECTION_ICONS = {
  A: 'ð¤', B: 'ð¡ï¸', C: 'â¤ï¸', D: 'â¡',
  E: 'ð', F: 'ð¨âð©âð§', G: 'âï¸', R: 'ð',
}

export default function SectionBadge({ section, label }) {
  const color = SECTION_COLORS[section] || '#6366f1'
  const icon  = SECTION_ICONS[section]  || 'â'
  return (
    <div className="section-badge" style={{ color, borderColor: `${color}40` }}>
      <span className="section-badge-icon">{icon}</span>
      {label}
    </div>
  )
}
