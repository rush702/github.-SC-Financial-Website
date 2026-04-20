import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const CONDITIONS = [
  { id: 'heart',    icon: 'â¤ï¸',  label: 'Heart Disease',  sub: 'Parent or sibling diagnosed before age 60' },
  { id: 'cancer',   icon: 'ðï¸', label: 'Cancer',          sub: 'Parent or sibling diagnosed before age 60' },
  { id: 'diabetes', icon: 'ð©¸',  label: 'Diabetes',        sub: 'Type 1 or Type 2 in parent or sibling' },
  { id: 'stroke',   icon: 'ð§ ',  label: 'Stroke',          sub: 'Parent or sibling before age 65' },
  { id: 'kidney',   icon: 'ð«',  label: 'Kidney Disease',  sub: 'Requiring dialysis or transplant' },
]

export default function FamilyHistoryStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.familyHistory || [])
  const [noneFlag, setNoneFlag] = useState(selected.length === 0 && formData.familyHistory !== undefined)

  const toggle = (id) => {
    setNoneFlag(false)
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const selectNone = () => {
    setSelected([])
    setNoneFlag(true)
  }

  const submit = () => onNext({ familyHistory: selected })

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">Family medical history?</h2>
      <p className="step-hint">First-degree relatives only (parents, siblings). Family history of certain conditions can affect underwriting ratings.</p>

      <div className="cards-grid full" style={{ gap: 10, marginBottom: 16 }}>
        {CONDITIONS.map(c => (
          <div
            key={c.id}
            className={`option-card full${selected.includes(c.id) ? ' selected' : ''}`}
            style={{ padding: '14px 20px' }}
            onClick={() => toggle(c.id)}
          >
            <span className="card-icon" style={{ fontSize: '1.4rem', marginBottom: 0 }}>{c.icon}</span>
            <div>
              <span className="card-label">{c.label}</span>
              <span className="card-sub">{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chip-wrap">
        <button
          className={`chip none-chip${noneFlag ? ' selected' : ''}`}
          onClick={selectNone}
        >
          â No significant family history
        </button>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button
          className="btn-primary"
          onClick={submit}
          disabled={selected.length === 0 && !noneFlag}
        >
          Continue â
        </button>
      </div>
    </div>
  )
}
