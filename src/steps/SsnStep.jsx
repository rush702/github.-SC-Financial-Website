import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

const CITIZENSHIP = ['US Citizen', 'Permanent Resident (Green Card)', 'Visa Holder', 'Other']

function formatSSN(raw) {
  const d = raw.replace(/\D/g, '').slice(0, 9)
  if (d.length < 4) return d
  if (d.length < 6) return `${d.slice(0,3)}-${d.slice(3)}`
  return `${d.slice(0,3)}-${d.slice(3,5)}-${d.slice(5)}`
}

export default function SsnStep({ formData, onNext, onBack }) {
  const [ssn,    setSsn]    = useState(formData.ssn)
  const [show,   setShow]   = useState(false)
  const [cit,    setCit]    = useState(formData.citizenship)
  const [err,    setErr]    = useState('')
  const ref = useRef(null)

  useEffect(() => { ref.current?.focus() }, [])

  const submit = () => {
    const digits = ssn.replace(/\D/g, '')
    if (digits.length !== 9) { setErr('Please enter a valid 9-digit SSN.'); return }
    if (!cit) { setErr('Please select your citizenship status.'); return }
    onNext({ ssn, citizenship: cit })
  }

  return (
    <div className="step">
      <SectionBadge section="A" label="About You" />
      <h2 className="step-question">Social Security &amp; Citizenship</h2>
      <p className="step-hint">Your SSN is required to verify your identity with the MIB, credit bureaus, and prescription databases â standard for all life insurance applications.</p>

      <div className="info-box">
        <span className="info-box-icon">ð</span>
        <span>Your SSN is encrypted with AES-256 and never stored in plain text. It is used solely for underwriting verification.</span>
      </div>

      <div className="field-group">
        <label className="field-label">Social Security Number <span className="req">*</span></label>
        <div className="input-with-icon">
          <span className="input-icon">ð</span>
          <input
            ref={ref}
            className={`input masked`}
            type={show ? 'text' : 'password'}
            placeholder="XXX-XX-XXXX"
            value={ssn}
            onChange={e => { setSsn(formatSSN(e.target.value)); setErr('') }}
            onKeyDown={e => { if (e.key === 'Enter') submit() }}
          />
        </div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" id="showssn" checked={show} onChange={e => setShow(e.target.checked)}
            style={{ accentColor: 'var(--primary)', width: 15, height: 15, cursor: 'pointer' }} />
          <label htmlFor="showssn" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            Show SSN
          </label>
        </div>
      </div>

      <div className="field-group" style={{ marginTop: 24 }}>
        <label className="field-label">Citizenship Status <span className="req">*</span></label>
        <div className="cards-grid two" style={{ marginBottom: 0 }}>
          {CITIZENSHIP.map(c => (
            <div
              key={c}
              className={`option-card${cit === c ? ' selected' : ''}`}
              style={{ textAlign: 'left', padding: '14px 18px' }}
              onClick={() => { setCit(c); setErr('') }}
            >
              <span className="card-label" style={{ fontSize: '0.875rem' }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {err && <div className="field-error" style={{ marginTop: 16 }}>â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={submit}>Continue â</button>
      </div>
    </div>
  )
}
