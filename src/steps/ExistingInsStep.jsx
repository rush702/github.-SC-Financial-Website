import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

function formatAmount(raw) {
  const d = raw.replace(/\D/g, '')
  return d ? `$${Number(d).toLocaleString()}` : ''
}

export default function ExistingInsStep({ formData, onNext, onBack }) {
  const [has,     setHas]     = useState(formData.hasExistingIns)
  const [amount,  setAmount]  = useState(formData.existingAmount)
  const [company, setCompany] = useState(formData.existingCompany)

  const choose = (v) => {
    setHas(v)
    if (v === 'No') {
      setTimeout(() => onNext({ hasExistingIns: 'No', existingAmount: '', existingCompany: '' }), 380)
    }
  }

  const submit = () => onNext({ hasExistingIns: has, existingAmount: amount, existingCompany: company })

  return (
    <div className="step">
      <SectionBadge section="E" label="Current Coverage" />
      <h2 className="step-question">Do you have existing life insurance?</h2>
      <p className="step-hint">Insurers need to know your total in-force coverage to assess insurability and prevent over-insurance.</p>

      <div className="cards-grid two" style={{ marginBottom: 24 }}>
        {['Yes', 'No'].map(v => (
          <div
            key={v}
            className={`option-card large${has === v ? ' selected' : ''}`}
            onClick={() => choose(v)}
          >
            <span className="card-icon">{v === 'Yes' ? 'ð' : 'â'}</span>
            <span className="card-label">{v === 'Yes' ? 'Yes, I have a policy' : 'No existing coverage'}</span>
          </div>
        ))}
      </div>

      {has === 'Yes' && (
        <div className="reveal-panel">
          <div className="field-row">
            <div className="field-group">
              <label className="field-label">Insurance Company</label>
              <input className="input" placeholder="e.g. MetLife, Prudential" value={company}
                onChange={e => setCompany(e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label">Total Coverage Amount</label>
              <input className="input" placeholder="$250,000" value={amount}
                onChange={e => setAmount(e.target.value)} />
            </div>
          </div>
          <p className="field-hint">If you have multiple policies, enter the combined total coverage amount.</p>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        {has === 'Yes' && (
          <button className="btn-primary" onClick={submit}>Continue â</button>
        )}
      </div>
    </div>
  )
}
