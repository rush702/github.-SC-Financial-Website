import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

export default function EsignStep({ formData, onNext, onBack }) {
  const [sigName,    setSigName]    = useState(formData.esignName)
  const [confirmed,  setConfirmed]  = useState(formData.esignConfirmed)
  const [err,        setErr]        = useState('')

  const expectedName = `${formData.firstName} ${formData.lastName}`.trim().toLowerCase()
  const nameMatch    = sigName.trim().toLowerCase() === expectedName

  const submit = () => {
    if (!sigName.trim()) { setErr('Please type your full legal name to sign.'); return }
    if (!nameMatch)      { setErr(`Name must match your application name: "${formData.firstName} ${formData.lastName}"`); return }
    if (!confirmed)      { setErr('Please confirm your electronic signature.'); return }
    onNext({ esignName: sigName.trim(), esignConfirmed: true })
  }

  const now = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })

  return (
    <div className="step">
      <SectionBadge section="G" label="Authorization" />
      <h2 className="step-question">Electronic Signature</h2>
      <p className="step-hint">
        By signing below, you certify that all information in this application is true and complete.
        This signature is legally binding under the federal <strong>ESIGN Act</strong> and <strong>UETA</strong>.
      </p>

      <div className="esign-box">
        <p className="esign-label">Type your full legal name to sign:</p>
        <input
          className="input esign-input"
          placeholder={`${formData.firstName} ${formData.lastName}`}
          value={sigName}
          onChange={e => { setSigName(e.target.value); setErr('') }}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          autoFocus
          spellCheck={false}
        />
        {sigName && (
          <p style={{ fontSize: '0.78rem', marginTop: 8,
            color: nameMatch ? 'var(--success)' : 'var(--danger)' }}>
            {nameMatch ? 'â Name matches application' : 'â Name must match: ' + `${formData.firstName} ${formData.lastName}`}
          </p>
        )}
      </div>

      <div
        className="esign-confirm"
        onClick={() => { setConfirmed(c => !c); setErr('') }}
      >
        <div className={`esign-check${confirmed ? ' checked' : ''}`}>
          {confirmed ? 'â' : ''}
        </div>
        <p className="esign-confirm-text">
          <strong>I understand and agree</strong> that this is my legally binding electronic signature.
          I certify that all information provided in this application is accurate and complete to the best of my knowledge.
          I understand that misrepresentation may result in policy rescission.
        </p>
      </div>

      <div className="esign-timestamp">
        ð Signed on: {now}
      </div>

      {err && <div className="field-error" style={{ marginTop: 16 }}>â ï¸ {err}</div>}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={submit} disabled={!sigName.trim() || !confirmed}>
          Sign &amp; Continue â
        </button>
      </div>
    </div>
  )
}
