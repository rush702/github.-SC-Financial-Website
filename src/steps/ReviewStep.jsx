import { useState } from 'react'
import SectionBadge from '../components/SectionBadge'

const SECTION_COLORS = {
  A: '#6366f1', B: '#06b6d4', C: '#f43f5e',
  D: '#f59e0b', E: '#10b981', F: '#8b5cf6', G: '#34d399',
}

function Row({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div className="review-row">
      <span className="review-key">{label}</span>
      <span className="review-val">{value}</span>
    </div>
  )
}

function Section({ section, title, children, onEdit, stepId }) {
  const color = SECTION_COLORS[section]
  return (
    <div className="review-card">
      <div className="review-card-head">
        <div className="review-card-title">
          <span style={{ background: color }} />
          {title}
        </div>
        <button className="review-edit" onClick={() => onEdit(stepId)}>Edit âï¸</button>
      </div>
      {children}
    </div>
  )
}

export default function ReviewStep({ formData, onNext, onBack, jumpTo }) {
  const [submitting, setSubmitting] = useState(false)

  const d = formData
  const fmtAmt = (v) => v ? `$${Number(v).toLocaleString()}` : 'â'

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => onNext({}), 1200)
  }

  const conditions = d.conditions?.length > 0 ? d.conditions.join(', ') : 'None reported'
  const familyHist = d.familyHistory?.length > 0 ? d.familyHistory.map(f =>
    ({ heart: 'Heart Disease', cancer: 'Cancer', diabetes: 'Diabetes', stroke: 'Stroke', kidney: 'Kidney Disease' })[f] || f
  ).join(', ') : 'None reported'
  const hazardous  = d.hazardous?.length > 0 ? d.hazardous.join(', ') : 'None'
  const driving    = d.drivingFlags?.length > 0 ? d.drivingFlags.join(', ') : 'Clean record'
  const riders     = d.riders?.length > 0 ? d.riders.join(', ') : 'None selected'

  return (
    <div className="step">
      <SectionBadge section="R" label="Review" />
      <h2 className="step-question">Review Your Application</h2>
      <p className="step-hint">Everything look correct? Click any section to edit. Once you submit, your application is sent to underwriting.</p>

      <div className="review-sections">
        <Section section="A" title="About You" onEdit={jumpTo} stepId="name">
          <Row label="Full Name"   value={`${d.firstName} ${d.lastName}`} />
          <Row label="Date of Birth" value={d.dob} />
          <Row label="Gender"      value={d.gender} />
          <Row label="Address"     value={d.street ? `${d.street}, ${d.city}, ${d.state} ${d.zip}` : null} />
          <Row label="Phone"       value={d.phone} />
          <Row label="Email"       value={d.email} />
          <Row label="SSN"         value={d.ssn ? `***-**-${d.ssn.slice(-4)}` : null} />
          <Row label="Citizenship" value={d.citizenship} />
          <Row label="Occupation"  value={d.occupation} />
          <Row label="Annual Income" value={fmtAmt(d.income)} />
        </Section>

        <Section section="B" title="Coverage" onEdit={jumpTo} stepId="policyType">
          <Row label="Policy Type"     value={d.policyType} />
          {d.policyType === 'Term' && <Row label="Term Length" value={`${d.termLength} Years`} />}
          <Row label="Coverage Amount" value={fmtAmt(d.coverageAmount)} />
          <Row label="Riders"          value={riders} />
        </Section>

        <Section section="C" title="Health" onEdit={jumpTo} stepId="heightWeight">
          <Row label="Height"         value={d.heightFt ? `${d.heightFt}'${d.heightIn || 0}"` : null} />
          <Row label="Weight"         value={d.weight ? `${d.weight} lbs` : null} />
          <Row label="Tobacco Use"    value={d.tobacco === 'Yes' ? `Yes â ${d.tobaccoType || ''} (${d.tobaccoFreq || ''})` : d.tobacco} />
          <Row label="Alcohol"        value={d.drinksPerWeek === 0 ? 'None' : `${d.drinksPerWeek} drinks/week`} />
          <Row label="Medications"    value={d.medications === 'Yes' ? `Yes â ${d.medicationsList?.slice(0,60)}${d.medicationsList?.length > 60 ? 'â¦' : ''}` : d.medications} />
          <Row label="Conditions"     value={conditions} />
          <Row label="Hospitalizations" value={d.hospitalized === 'Yes' ? `Yes â ${d.hospitalDetails?.slice(0,60)}â¦` : d.hospitalized} />
          <Row label="Family History" value={familyHist} />
        </Section>

        <Section section="D" title="Lifestyle" onEdit={jumpTo} stepId="hazardous">
          <Row label="Hazardous Activities" value={hazardous} />
          <Row label="Driving Record"       value={driving} />
          <Row label="Felony Conviction"    value={d.felony} />
        </Section>

        <Section section="E" title="Existing Coverage" onEdit={jumpTo} stepId="existingIns">
          <Row label="Existing Life Insurance" value={d.hasExistingIns === 'Yes' ? `Yes â ${d.existingCompany || ''} ${fmtAmt(d.existingAmount)}` : d.hasExistingIns} />
          <Row label="Previously Declined"     value={d.prevDeclined} />
        </Section>

        <Section section="F" title="Beneficiaries" onEdit={jumpTo} stepId="beneficiary">
          <Row label="Primary"    value={d.beneName ? `${d.beneName} (${d.beneRelation}) â ${d.benePercent}%` : null} />
          <Row label="Contingent" value={d.contingentName ? `${d.contingentName} (${d.contingentRelation}) â ${d.contingentPercent || ''}%` : 'None'} />
        </Section>

        <Section section="G" title="Authorization & Signature" onEdit={jumpTo} stepId="authorization">
          <Row label="MIB Authorization"          value="â Authorized" />
          <Row label="IntelliScript (Rx)"          value="â Authorized" />
          <Row label="DMV / MVR"                   value="â Authorized" />
          <Row label="HIPAA Medical Records"       value="â Authorized" />
          <Row label="Electronic Signature"        value={d.esignName || null} />
        </Section>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="info-box">
          <span className="info-box-icon">ð</span>
          <span>By submitting, you confirm all information is accurate. False statements may void your policy. Your application will be reviewed by a licensed SC Financial Life Group agent.</span>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>â Back</button>
        <button
          className="btn-primary wide"
          onClick={handleSubmit}
          disabled={submitting}
          style={{ maxWidth: 320 }}
        >
          {submitting ? 'â³ Submittingâ¦' : 'ð Submit Application'}
        </button>
      </div>
    </div>
  )
}
