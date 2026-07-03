import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const ACTIVITIES = [
  { id: 'skydiving',   icon: '🪂', label: 'Skydiving / BASE Jumping',    sub: 'Any jumps in the last 2 years' },
  { id: 'aviation',    icon: '✈️', label: 'Private Aviation',             sub: 'Licensed pilot or frequent private flights' },
  { id: 'motorsports', icon: '🏎️', label: 'Motorsports / Racing',         sub: 'Competitive or high-speed driving' },
  { id: 'scuba',       icon: '🤿', label: 'Deep Scuba Diving',            sub: 'Below 100 feet depth' },
  { id: 'climbing',    icon: '🧗', label: 'Rock Climbing / Mountaineering', sub: 'Technical climbing or high altitude' },
  { id: 'bungee',      icon: '🎯', label: 'Bungee Jumping',               sub: 'Any bungee activity' },
  { id: 'combat',      icon: '🥊', label: 'Combat Sports',                sub: 'Boxing, MMA, martial arts competition' },
]

export default function HazardousStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.hazardous || [])
  const [noneFlag, setNoneFlag] = useState(selected.length === 0 && formData.hazardous !== undefined)

  const toggle = (id) => {
    setNoneFlag(false)
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const selectNone = () => {
    setSelected([])
    setNoneFlag(true)
  }

  return (
    <div className="step">
      <SectionBadge section="D" label="Lifestyle" />
      <h2 className="step-question">Any high-risk hobbies?</h2>
      <p className="step-hint">Participate in any of the following? These activities may require additional underwriting or a premium adjustment.</p>

      <div className="cards-grid full" style={{ gap: 10, marginBottom: 16 }}>
        {ACTIVITIES.map(a => (
          <div
            key={a.id}
            className={`option-card full${selected.includes(a.id) ? ' selected' : ''}`}
            style={{ padding: '14px 20px' }}
            onClick={() => toggle(a.id)}
          >
            <span className="card-icon" style={{ fontSize: '1.4rem', marginBottom: 0 }}>{a.icon}</span>
            <div>
              <span className="card-label">{a.label}</span>
              <span className="card-sub">{a.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chip-wrap">
        <button
          className={`chip none-chip${noneFlag ? ' selected' : ''}`}
          onClick={selectNone}
        >
          ✓ None of the Above
        </button>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button
          className="btn-primary"
          onClick={() => onNext({ hazardous: selected })}
          disabled={selected.length === 0 && !noneFlag}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
