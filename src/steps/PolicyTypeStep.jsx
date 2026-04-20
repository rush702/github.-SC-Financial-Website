import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const TYPES = [
  {
    value: 'Term',
    icon: 'â±ï¸',
    label: 'Term Life',
    sub: 'Coverage for a set period (10â30 yrs). Most affordable option.',
  },
  {
    value: 'Whole',
    icon: 'â¾ï¸',
    label: 'Whole Life',
    sub: 'Lifelong coverage with a cash value component that grows over time.',
  },
  {
    value: 'Universal',
    icon: 'ð',
    label: 'Universal Life',
    sub: 'Flexible premiums and adjustable death benefit with investment options.',
  },
]

export default function PolicyTypeStep({ formData, onNext, onBack }) {
  const [selected, setSelected] = useState(formData.policyType)

  const choose = (v) => {
    setSelected(v)
    setTimeout(() => onNext({ policyType: v }), 380)
  }

  return (
    <div className="step">
      <SectionBadge section="B" label="Coverage" />
      <h2 className="step-question">What type of policy?</h2>
      <p className="step-hint">Select the life insurance product that best fits your needs. Term is most popular for families.</p>

      <div className="cards-grid full" style={{ gap: 12, marginBottom: 28 }}>
        {TYPES.map(t => (
          <div
            key={t.value}
            className={`option-card full large${selected === t.value ? ' selected' : ''}`}
            onClick={() => choose(t.value)}
          >
            <span className="card-icon" style={{ fontSize: '2rem' }}>{t.icon}</span>
            <div>
              <span className="card-label">{t.label}</span>
              <span className="card-sub">{t.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={() => onNext({ policyType: selected })} disabled={!selected}>
          Continue â
        </button>
      </div>
    </div>
  )
}
