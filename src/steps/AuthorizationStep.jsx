import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const AUTHS = [
  {
    key: 'authMib',
    icon: 'ðï¸',
    title: 'MIB Group Authorization',
    short: 'Access your Medical Information Bureau report for underwriting.',
    legal: 'I authorize SC Financial Life Group and its carrier partners to obtain information from MIB, Inc. about me. MIB is a membership organization of life and health insurance companies. I understand information in my MIB file may be used to assess my application. I may request my MIB file by contacting MIB at 866-692-6901.',
    required: true,
  },
  {
    key: 'authRx',
    icon: 'ð',
    title: 'Prescription History (IntelliScript)',
    short: 'Access your prescription fill history via Milliman IntelliScript.',
    legal: 'I authorize SC Financial Life Group to obtain a report of my prescription drug history from Milliman IntelliScript (or equivalent prescription data vendor) for the purpose of underwriting my life insurance application. This authorization is valid for 24 months from the date signed.',
    required: true,
  },
  {
    key: 'authDmv',
    icon: 'ð',
    title: 'Motor Vehicle Record (DMV)',
    short: 'Access your driving record for underwriting as permitted by FCRA.',
    legal: 'I authorize SC Financial Life Group to obtain my Motor Vehicle Record (MVR) from the appropriate state Department of Motor Vehicles. This report will be used solely for insurance underwriting purposes, as permitted under the federal Driver\'s Privacy Protection Act (DPPA) and Fair Credit Reporting Act (FCRA).',
    required: true,
  },
  {
    key: 'authHipaa',
    icon: 'ð¥',
    title: 'Medical Records (HIPAA)',
    short: 'Authorize release of medical records to complete underwriting.',
    legal: 'I authorize any physician, medical practitioner, hospital, clinic, pharmacy, or other healthcare provider to release information about my health, medical history, and treatment to SC Financial Life Group and its reinsurers for the purpose of evaluating my application for life insurance. This authorization complies with HIPAA (45 CFR Â§ 164.508) and is valid for 24 months.',
    required: true,
  },
]

export default function AuthorizationStep({ formData, onNext, onBack }) {
  const [auths, setAuths] = useState({
    authMib: true, authRx: true, authDmv: true, authHipaa: true,
  })

  const allRequired = AUTHS.filter(a => a.required).every(a => auths[a.key])

  const submit = () => {
    onNext({ ...auths })
  }

  return (
    <div className="step">
      <SectionBadge section="G" label="Authorization" />
      <h2 className="step-question">Database Authorizations</h2>
      <p className="step-hint">Federal law requires your explicit consent before we access the following records. All four authorizations are required to process your application.</p>

      <div className="auth-intro">
        <strong>Why we need these:</strong> Life insurance underwriting is regulated and requires verifying your health, driving, and prescription history against industry databases to provide accurate pricing and detect fraud.
      </div>

      {AUTHS.map(auth => (
        <div key={auth.key} className={`toggle-row${auth.required ? ' toggle-required' : ''}`}>
          <div className="toggle-text">
            <strong>{auth.icon} {auth.title}</strong>
            <span>{auth.short}</span>
            <div className="auth-expandable">
              <details>
                <summary>Read full authorization text â</summary>
                <p className="legal">{auth.legal}</p>
              </details>
            </div>
          </div>
          <div className={`toggle-switch${auths[auth.key] ? ' on' : ''}`} />
        </div>
      ))}

      <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 16, lineHeight: 1.6 }}>
        These authorizations are required by federal and state insurance regulations. Declining any authorization will prevent us from processing your application.
      </p>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button className="btn-primary" onClick={submit} disabled={!allRequired}>
          I Authorize All â Continue
        </button>
      </div>
    </div>
  )
}
