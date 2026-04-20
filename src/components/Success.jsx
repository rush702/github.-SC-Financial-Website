import { useEffect } from 'react'

export default function Success({ formData }) {
  const refNum = `SCF-${Date.now().toString(36).toUpperCase()}`

  useEffect(() => {
    import('canvas-confetti').then(m => {
      const confetti = m.default
      const fire = (opts) => confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, ...opts })
      setTimeout(() => fire({ colors: ['#6366f1', '#8b5cf6', '#06b6d4'] }), 100)
      setTimeout(() => fire({ colors: ['#10b981', '#34d399', '#f43f5e'], angle: 60 }), 400)
      setTimeout(() => fire({ colors: ['#f59e0b', '#6366f1', '#8b5cf6'], angle: 120 }), 700)
    })
  }, [])

  return (
    <div className="app" style={{ justifyContent: 'center' }}>
      <div className="success-wrap">
        <div className="success-icon">â</div>

        <h1 className="success-title">
          You're all set,<br />{formData.firstName}!
        </h1>
        <p className="success-sub">
          Your application has been submitted to SC Financial Life Group.
          One of our licensed agents will reach out within 24 hours to finalize your policy.
        </p>

        <div className="success-ref-box">
          <div className="success-ref-label">Application Reference Number</div>
          <div className="success-ref-num">{refNum}</div>
        </div>

        <div className="next-steps">
          <div className="next-step">
            <span className="next-step-icon">ð</span>
            <div>
              <strong>Agent Contact</strong>
              <span>A licensed agent will call you at {formData.phone} within 24 hours to review your application.</span>
            </div>
          </div>
          <div className="next-step">
            <span className="next-step-icon">ð</span>
            <div>
              <strong>Underwriting Review</strong>
              <span>We'll verify your information with MIB, prescription records, and motor vehicle records as authorized.</span>
            </div>
          </div>
          <div className="next-step">
            <span className="next-step-icon">ð</span>
            <div>
              <strong>Policy Issued</strong>
              <span>Upon approval, your policy documents will be emailed to {formData.email} within 2â5 business days.</span>
            </div>
          </div>
          <div className="next-step">
            <span className="next-step-icon">ð¡ï¸</span>
            <div>
              <strong>Coverage Begins</strong>
              <span>Your {formData.coverageAmount ? `$${Number(formData.coverageAmount).toLocaleString()}` : ''} policy activates upon your first premium payment.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
