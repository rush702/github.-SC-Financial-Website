import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function HeightWeightStep({ formData, onNext, onBack }) {
  const [ft,   setFt]   = useState(formData.heightFt)
  const [inch, setInch] = useState(formData.heightIn)
  const [wt,   setWt]   = useState(formData.weight)
  const [err,  setErr]  = useState('')
  const ftRef = useRef(null)

  useEffect(() => { ftRef.current?.focus() }, [])

  const bmi = () => {
    const h = (parseInt(ft||0)*12 + parseInt(inch||0))
    const w = parseInt(wt||0)
    if (!h || !w) return null
    return ((w / (h * h)) * 703).toFixed(1)
  }

  const bmiLabel = () => {
    const b = parseFloat(bmi())
    if (!b) return null
    if (b < 18.5) return { label: 'Underweight', color: '#06b6d4' }
    if (b < 25)   return { label: 'Healthy',     color: '#10b981' }
    if (b < 30)   return { label: 'Overweight',  color: '#f59e0b' }
    return               { label: 'Obese',        color: '#ef4444' }
  }

  const submit = () => {
    if (!ft || !wt) { setErr('Please enter your height and weight.'); return }
    const f = parseInt(ft), i = parseInt(inch||0), w = parseInt(wt)
    if (f < 4 || f > 7) { setErr('Enter a valid height (4â7 ft).'); return }
    if (w < 50 || w > 500) { setErr('Enter a valid weight (50â500 lbs).'); return }
    onNext({ heightFt: ft, heightIn: inch || '0', weight: wt })
  }

  const b = bmiLabel()

  return (
    <div className="step">
      <SectionBadge section="C" label="Your Health" />
      <h2 className="step-question">Height &amp; Weight</h2>
      <p className="step-hint">BMI is one of the primary health factors used in underwriting. Be as accurate as possible.</p>

      <div className="field-row three">
        <div className="field-group">
          <label className="field-label">Feet <span className="req">*</span></label>
          <input ref={ftRef} className="input" type="number" placeholder="5" min={4} max={7}
            value={ft} onChange={e => { setFt(e.target.value); setErr('') }}
            onKeyDown={e => { if (e.key === 'Enter') submit() }} />
        </div>
        <div className="field-group">
          <label className="field-label">Inches</label>
          <input className="input" type="number" placeholder="8" min={0} max={11}
            value={inch} onChange={e => { setInch(e.target.value); setErr('') }}
            onKeyDown={e => { if (e.key === 'Enter') submit() }} />
        </div>
        <div className="field-group">
          <label className="field-label">Weight (lbs) <span className="req">*</span></label>
          <input className="input" type="number" placeholder="165" min={50} max={500}
            value={wt} onChange={e => { setWt(e.target.value); setErr('') }}
            onKeyDown={e => { if (e.key === 'Enter') submit() }} />
        </div>
      </div>

      {bmi() && b && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px',
          background: `${b.color}15`, border: `1px solid ${b.color}40`, borderRadius: 10,
          marginBottom: 20, fontSize: '0.875rem' }}>
          <span style={{ fontSize: '1.2rem' }}>ð</span>
          <span>BMI: <strong style={{ color: b.color }}>{bmi()} â {b.label}</strong></span>
        </div>
      )}

      {err && <div className="field-error">â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <div className="step-actions-right">
          <span className="enter-hint">press <kbd>Enter</kbd></span>
          <button className="btn-primary" onClick={submit} disabled={!ft || !wt}>Continue â</button>
        </div>
      </div>
    </div>
  )
}
