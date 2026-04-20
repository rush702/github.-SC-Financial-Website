import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const RIDERS = [
  { id: 'waiver',     icon: 'ð¥', label: 'Waiver of Premium',         sub: 'Premiums waived if you become totally disabled.' },
  { id: 'add',        icon: 'ð¥', label: 'Accidental Death (AD&D)',    sub: 'Double benefit if death results from an accident.' },
  { id: 'critical',   icon: 'â¤ï¸âð©¹', label: 'Critical Illness Rider',   sub: 'Lump-sum payout on diagnosis of major illness.' },
  { id: 'disability', icon: 'â¿', label: 'Disability Income Rider',    sub: 'Monthly income if you can\'t work due to disability.' },
  { id: 'child',      icon: 'ð¶', label: 'Child Term Rider',           sub: 'Affordable coverage for all your children.' },
  { id: 'adb',        icon: 'â¡', label: 'Accelerated Death Benefit',  sub: 'Access benefits early if diagnosed terminal. Often free.' },
]

export default function RidersStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.riders || [])

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  return (
    <div className="step">
      <SectionBadge section="B" label="Coverage" />
      <h2 className="step-question">Add any riders?</h2>
      <p className="step-hint">Riders enhance your base policy. Select all that apply â or skip if you just want the base coverage.</p>

      <div className="cards-grid full" style={{ gap: 10, marginBottom: 24 }}>
        {RIDERS.map(r => (
          <div
            key={r.id}
            className={`option-card full${selected.includes(r.id) ? ' selected' : ''}`}
            style={{ padding: '16px 20px' }}
            onClick={() => toggle(r.id)}
          >
            <span className="card-icon" style={{ fontSize: '1.4rem', marginBottom: 0 }}>{r.icon}</span>
            <div>
              <span className="card-label">{r.label}</span>
              <span className="card-sub">{r.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <div className="step-actions-right">
          <button className="btn-secondary" onClick={() => onNext({ riders: [] })}>Skip</button>
          <button className="btn-primary" onClick={() => onNext({ riders: selected })}>Continue â</button>
        </div>
      </div>
    </div>
  )
}
