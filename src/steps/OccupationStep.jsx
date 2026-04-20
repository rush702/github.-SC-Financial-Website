import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

const HIGH_RISK_JOBS = ['pilot','aviation','logger','fishing','mining','roofer','ironworker','electrician','police','law enforcement','firefighter','military','demolition','underwater','oil rig']

function formatIncome(val) {
  return `$${Number(val).toLocaleString()}`
}

export default function OccupationStep({ formData, onNext, onBack }) {
  const [occupation, setOccupation] = useState(formData.occupation)
  const [income,     setIncome]     = useState(formData.income)
  const [err,        setErr]        = useState('')
  const ref = useRef(null)

  useEffect(() => { ref.current?.focus() }, [])

  const isHighRisk = HIGH_RISK_JOBS.some(k => occupation.toLowerCase().includes(k))

  const submit = () => {
    if (!occupation.trim()) { setErr('Please enter your occupation.'); return }
    onNext({ occupation: occupation.trim(), income: Number(income), hazardousJob: isHighRisk })
  }

  return (
    <div className="step">
      <SectionBadge section="A" label="About You" />
      <h2 className="step-question">What do you do for work?</h2>
      <p className="step-hint">Occupation and income help determine coverage eligibility and premium rates.</p>

      <div className="field-group">
        <label className="field-label">Job Title / Occupation <span className="req">*</span></label>
        <input
          ref={ref}
          className="input large"
          placeholder="e.g. Software Engineer, Teacher, Nurse"
          value={occupation}
          onChange={e => { setOccupation(e.target.value); setErr('') }}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
        />
        {isHighRisk && occupation && (
          <div className="warning-box" style={{ marginTop: 12, marginBottom: 0 }}>
            <span>â ï¸</span>
            <span>Your occupation may be classified as high-risk. Additional underwriting questions may be required.</span>
          </div>
        )}
      </div>

      <div className="slider-wrap" style={{ marginTop: 28 }}>
        <label className="field-label">Annual Household Income</label>
        <div className="slider-value">
          {formatIncome(income)}
          <span className="slider-sub"> / year</span>
        </div>
        <input
          type="range"
          className="range-input"
          min={20000} max={500000} step={5000}
          value={income}
          onChange={e => setIncome(e.target.value)}
        />
        <div className="range-labels">
          <span>$20,000</span>
          <span>$500,000+</span>
        </div>
        <p className="field-hint">Coverage amounts are typically 10â15Ã your annual income.</p>
      </div>

      {err && <div className="field-error">â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <div className="step-actions-right">
          <span className="enter-hint">press <kbd>Enter</kbd></span>
          <button className="btn-primary" onClick={submit} disabled={!occupation.trim()}>Continue â</button>
        </div>
      </div>
    </div>
  )
}
