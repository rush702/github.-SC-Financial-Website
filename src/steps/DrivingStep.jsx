import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const FLAGS = [
  { id: 'dui',        icon: 'ðº', label: 'DUI / DWI Conviction',          sub: 'Within the last 5 years' },
  { id: 'suspended',  icon: 'ð«', label: 'License Suspended or Revoked',  sub: 'Within the last 3 years' },
  { id: 'accidents',  icon: 'ð¥', label: '2+ At-Fault Accidents',          sub: 'Within the last 3 years' },
  { id: 'reckless',   icon: 'â¡', label: 'Reckless Driving Conviction',    sub: 'Within the last 5 years' },
  { id: 'speeding',   icon: 'ð¨', label: '3+ Speeding Violations',         sub: 'Within the last 3 years' },
]

export default function DrivingStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.drivingFlags || [])
  const [noneFlag, setNoneFlag] = useState(selected.length === 0 && formData.drivingFlags !== undefined)

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
      <h2 className="step-question">Any driving record issues?</h2>
      <p className="step-hint">Your driving record is verified through the DMV / MVR as authorized. Select all that apply.</p>

      <div className="cards-grid full" style={{ gap: 10, marginBottom: 16 }}>
        {FLAGS.map(f => (
          <div
            key={f.id}
            className={`option-card full${selected.includes(f.id) ? ' selected' : ''}`}
            style={{ padding: '14px 20px' }}
            onClick={() => toggle(f.id)}
          >
            <span className="card-icon" style={{ fontSize: '1.4rem', marginBottom: 0 }}>{f.icon}</span>
            <div>
              <span className="card-label">{f.label}</span>
              <span className="card-sub">{f.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chip-wrap">
        <button
          className={`chip none-chip${noneFlag ? ' selected' : ''}`}
          onClick={selectNone}
        >
          â Clean Driving Record
        </button>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button
          className="btn-primary"
          onClick={() => onNext({ drivingFlags: selected })}
          disabled={selected.length === 0 && !noneFlag}
        >
          Continue â
        </button>
      </div>
    </div>
  )
}
