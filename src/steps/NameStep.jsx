import { useState, useRef, useEffect } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function NameStep({ formData, onNext, onBack }) {
  const [first, setFirst] = useState(formData.firstName)
  const [last,  setLast]  = useState(formData.lastName)
  const [err,   setErr]   = useState('')
  const firstRef = useRef(null)

  useEffect(() => { firstRef.current?.focus() }, [])

  const submit = () => {
    if (!first.trim() || !last.trim()) { setErr('Both fields are required.'); return }
    onNext({ firstName: first.trim(), lastName: last.trim() })
  }

  const onKey = (e) => { if (e.key === 'Enter') submit() }

  return (
    <div className="step">
      <SectionBadge section="A" label="About You" />
      <h2 className="step-question">Hey there! What's your name?</h2>
      <p className="step-hint">Your full legal name as it appears on government ID.</p>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label">First Name <span className="req">*</span></label>
          <input
            ref={firstRef}
            className="input large"
            placeholder="Jane"
            value={first}
            onChange={e => { setFirst(e.target.value); setErr('') }}
            onKeyDown={onKey}
          />
        </div>
        <div className="field-group">
          <label className="field-label">Last Name <span className="req">*</span></label>
          <input
            className="input large"
            placeholder="Smith"
            value={last}
            onChange={e => { setLast(e.target.value); setErr('') }}
            onKeyDown={onKey}
          />
        </div>
      </div>

      {err && <div className="field-error">â ï¸ {err}</div>}

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
