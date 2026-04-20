import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const TERMS = [
  { value: '10', label: '10 Years', sub: 'Short-term needs' },
  { value: '15', label: '15 Years', sub: 'Mortgage coverage' },
  { value: '20', label: '20 Years', sub: 'Most popular' },
  { value: '25', label: '25 Years', sub: 'Family protection' },
  { value: '30', label: '30 Years', sub: 'Maximum coverage' },
]

export default function TermLengthStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.termLength)

  const choose = (v) => {
    setSelected(v)
    setTimeout(() => onNext({ termLength: v }), 380)
  }

  return (
    <div className="step">
      <SectionBadge section="B" label="Coverage" />
      <h2 className="step-question">How long do you need coverage?</h2>
      <p className="step-hint">Choose a term that covers your biggest financial obligations â mortgage, kids' college, or until retirement.</p>

      <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px,1fr))', marginBottom: 28 }}>
        {TERMS.map(t => (
          <div
            key={t.value}
            className={`option-card${selected === t.value ? ' selected' : ''}`}
            onClick={() => choose(t.value)}
          >
            <span className="card-label" style={{ fontSize: '1.1rem', marginBottom: 6 }}>{t.label}</span>
            <span className="card-sub">{t.sub}</span>
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={() => onNext({ termLength: selected })} disabled={!selected}>
          Continue â
        </button>
      </div>
    </div>
  )
}
