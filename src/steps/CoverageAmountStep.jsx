import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const PRESETS = [100000, 250000, 500000, 750000, 1000000, 2000000]

function fmt(v) {
  if (v >= 1000000) return `$${(v/1000000).toFixed(v%1000000===0?0:1)}M`
  return `$${(v/1000).toFixed(0)}K`
}

export default function CoverageAmountStep({ formData, onNext, onBack }) {
  const [amount, setAmount] = useState(formData.coverageAmount || 500000)

  const submit = () => onNext({ coverageAmount: amount })

  return (
    <div className="step">
      <SectionBadge section="B" label="Coverage" />
      <h2 className="step-question">How much coverage do you need?</h2>
      <p className="step-hint">A common rule of thumb: 10â15Ã your annual income. Think about replacing income, paying off debts, and funding education.</p>

      <div className="slider-wrap">
        <div className="slider-value">
          {amount >= 1000000 ? `$${(amount/1000000).toFixed(amount%1000000===0?0:2)}M` : `$${Number(amount).toLocaleString()}`}
        </div>
        <input
          type="range"
          className="range-input"
          min={50000} max={3000000} step={50000}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>$50K</span>
          <span>$3M</span>
        </div>

        <div className="presets">
          {PRESETS.map(p => (
            <button
              key={p}
              className={`preset-btn${amount === p ? ' active' : ''}`}
              onClick={() => setAmount(p)}
            >
              {fmt(p)}
            </button>
          ))}
        </div>
      </div>

      <div className="info-box">
        <span className="info-box-icon">ð¡</span>
        <span>Based on your income of <strong>${Number(formData.income).toLocaleString()}/yr</strong>, a recommended coverage range is <strong>${(formData.income*10).toLocaleString()} â ${(formData.income*15).toLocaleString()}</strong>.</span>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <div className="step-actions-right">
          <span className="enter-hint">press <kbd>Enter</kbd></span>
          <button className="btn-primary" onClick={submit}>Continue â</button>
        </div>
      </div>
    </div>
  )
}
