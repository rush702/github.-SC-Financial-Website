import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming','District of Columbia',
]

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
}

export default function ContactStep({ formData, onNext, onBack }) {
  const [street, setStreet] = useState(formData.street)
  const [city,   setCity]   = useState(formData.city)
  const [state,  setState]  = useState(formData.state)
  const [zip,    setZip]    = useState(formData.zip)
  const [phone,  setPhone]  = useState(formData.phone)
  const [email,  setEmail]  = useState(formData.email)
  const [err,    setErr]    = useState('')
  const ref = useRef(null)

  useEffect(() => { ref.current?.focus() }, [])

  const valid = () => {
    if (!street.trim() || !city.trim() || !state || !zip.trim()) return 'Please complete your address.'
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) return 'Enter a valid ZIP code.'
    if (phone.replace(/\D/g,'').length < 10) return 'Enter a valid 10-digit phone number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.'
    return null
  }

  const submit = () => {
    const e = valid(); if (e) { setErr(e); return }
    onNext({ street: street.trim(), city: city.trim(), state, zip: zip.trim(), phone, email: email.trim() })
  }

  return (
    <div className="step">
      <SectionBadge section="A" label="About You" />
      <h2 className="step-question">Where do you live?</h2>
      <p className="step-hint">Your home address and best contact info. Required for policy issuance.</p>

      <div className="field-group">
        <label className="field-label">Street Address <span className="req">*</span></label>
        <input ref={ref} className="input" placeholder="123 Main St, Apt 4B" value={street}
          onChange={e => { setStreet(e.target.value); setErr('') }} />
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">City <span className="req">*</span></label>
          <input className="input" placeholder="Miami" value={city}
            onChange={e => { setCity(e.target.value); setErr('') }} />
        </div>
        <div className="field-group">
          <label className="field-label">ZIP Code <span className="req">*</span></label>
          <input className="input" placeholder="33101" value={zip} maxLength={10}
            onChange={e => { setZip(e.target.value); setErr('') }} />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">State <span className="req">*</span></label>
        <select className="input" value={state} onChange={e => { setState(e.target.value); setErr('') }}>
          <option value="">Select stateâ¦</option>
          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">Phone Number <span className="req">*</span></label>
          <div className="input-with-icon">
            <span className="input-icon">ð±</span>
            <input className="input" placeholder="(555) 000-0000" value={phone}
              onChange={e => { setPhone(formatPhone(e.target.value)); setErr('') }} />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Email Address <span className="req">*</span></label>
          <div className="input-with-icon">
            <span className="input-icon">âï¸</span>
            <input className="input" type="email" placeholder="jane@example.com" value={email}
              onChange={e => { setEmail(e.target.value); setErr('') }} />
          </div>
        </div>
      </div>

      {err && <div className="field-error">â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={submit}>Continue â</button>
      </div>
    </div>
  )
}
