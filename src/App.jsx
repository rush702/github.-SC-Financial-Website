import { useState, useEffect, useCallback, useMemo } from 'react'
import LandingPage from './components/LandingPage'
import ProgressBar from './components/ProgressBar'
import Success from './components/Success'
import NameStep from './steps/NameStep'
import BirthGenderStep from './steps/BirthGenderStep'
import ContactStep from './steps/ContactStep'
import SsnStep from './steps/SsnStep'
import OccupationStep from './steps/OccupationStep'
import PolicyTypeStep from './steps/PolicyTypeStep'
import TermLengthStep from './steps/TermLengthStep'
import CoverageAmountStep from './steps/CoverageAmountStep'
import RidersStep from './steps/RidersStep'
import HeightWeightStep from './steps/HeightWeightStep'
import TobaccoStep from './steps/TobaccoStep'
import AlcoholStep from './steps/AlcoholStep'
import MedicationsStep from './steps/MedicationsStep'
import MedConditionsStep from './steps/MedConditionsStep'
import HospitalStep from './steps/HospitalStep'
import FamilyHistoryStep from './steps/FamilyHistoryStep'
import HazardousStep from './steps/HazardousStep'
import DrivingStep from './steps/DrivingStep'
import CriminalStep from './steps/CriminalStep'
import ExistingInsStep from './steps/ExistingInsStep'
import PrevDeclinedStep from './steps/PrevDeclinedStep'
import BeneficiaryStep from './steps/BeneficiaryStep'
import ContingentStep from './steps/ContingentStep'
import AuthorizationStep from './steps/AuthorizationStep'
import EsignStep from './steps/EsignStep'
import ReviewStep from './steps/ReviewStep'

const ALL_STEPS = [
  { id: 'name',          component: NameStep,          section: 'A', sectionName: 'About You' },
  { id: 'birthGender',   component: BirthGenderStep,   section: 'A', sectionName: 'About You' },
  { id: 'contact',       component: ContactStep,        section: 'A', sectionName: 'About You' },
  { id: 'ssn',           component: SsnStep,            section: 'A', sectionName: 'About You' },
  { id: 'occupation',    component: OccupationStep,     section: 'A', sectionName: 'About You' },
  { id: 'policyType',    component: PolicyTypeStep,     section: 'B', sectionName: 'Coverage' },
  { id: 'termLength',    component: TermLengthStep,     section: 'B', sectionName: 'Coverage',  skip: d => d.policyType !== 'Term' },
  { id: 'coverageAmount',component: CoverageAmountStep, section: 'B', sectionName: 'Coverage' },
  { id: 'riders',        component: RidersStep,         section: 'B', sectionName: 'Coverage' },
  { id: 'heightWeight',  component: HeightWeightStep,   section: 'C', sectionName: 'Your Health' },
  { id: 'tobacco',       component: TobaccoStep,        section: 'C', sectionName: 'Your Health' },
  { id: 'alcohol',       component: AlcoholStep,        section: 'C', sectionName: 'Your Health' },
  { id: 'medications',   component: MedicationsStep,    section: 'C', sectionName: 'Your Health' },
  { id: 'medConditions', component: MedConditionsStep,  section: 'C', sectionName: 'Your Health' },
  { id: 'hospital',      component: HospitalStep,       section: 'C', sectionName: 'Your Health' },
  { id: 'familyHistory', component: FamilyHistoryStep,  section: 'C', sectionName: 'Your Health' },
  { id: 'hazardous',     component: HazardousStep,      section: 'D', sectionName: 'Lifestyle' },
  { id: 'driving',       component: DrivingStep,        section: 'D', sectionName: 'Lifestyle' },
  { id: 'criminal',      component: CriminalStep,       section: 'D', sectionName: 'Lifestyle' },
  { id: 'existingIns',   component: ExistingInsStep,    section: 'E', sectionName: 'Current Coverage' },
  { id: 'prevDeclined',  component: PrevDeclinedStep,   section: 'E', sectionName: 'Current Coverage' },
  { id: 'beneficiary',   component: BeneficiaryStep,    section: 'F', sectionName: 'Beneficiaries' },
  { id: 'contingent',    component: ContingentStep,     section: 'F', sectionName: 'Beneficiaries' },
  { id: 'authorization', component: AuthorizationStep,  section: 'G', sectionName: 'Authorization' },
  { id: 'esign',         component: EsignStep,          section: 'G', sectionName: 'Authorization' },
  { id: 'review',        component: ReviewStep,         section: 'R', sectionName: 'Review' },
]

const INITIAL_FORM = {
  firstName: '', lastName: '',
  dob: '', gender: '',
  street: '', city: '', state: '', zip: '', phone: '', email: '',
  ssn: '', citizenship: 'US Citizen',
  occupation: '', income: 75000, hazardousJob: false,
  policyType: 'Term', termLength: '20',
  coverageAmount: 500000, riders: [],
  heightFt: '', heightIn: '', weight: '',
  tobacco: '', tobaccoType: '', tobaccoFreq: '', tobaccoQuit: '',
  drinksPerWeek: 0,
  medications: '', medicationsList: '',
  conditions: [],
  hospitalized: '', hospitalDetails: '',
  familyHistory: [],
  hazardous: [], drivingFlags: [], felony: '',
  hasExistingIns: '', existingAmount: '', existingCompany: '',
  prevDeclined: '',
  beneName: '', beneRelation: '', beneDob: '', benePercent: '100',
  contingentName: '', contingentRelation: '', contingentDob: '', contingentPercent: '',
  authMib: true, authRx: true, authDmv: true, authHipaa: true,
  esignName: '', esignConfirmed: false,
}

function getActiveSteps(formData) {
  return ALL_STEPS.filter(s => !s.skip || !s.skip(formData))
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true)
  const [stepIdx, setStepIdx]         = useState(0)
  const [animKey, setAnimKey]         = useState(0)
  const [direction, setDirection]     = useState('forward')
  const [formData, setFormData]       = useState(INITIAL_FORM)
  const [isSuccess, setIsSuccess]     = useState(false)

  useEffect(() => {
    document.body.classList.toggle('landing-active', showLanding)
    return () => document.body.classList.remove('landing-active')
  }, [showLanding])

  const activeSteps = useMemo(() => getActiveSteps(formData), [formData])
  const currentStep = activeSteps[stepIdx]

  const updateForm = useCallback((data) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  const goNext = useCallback((data = {}) => {
    const merged = { ...formData, ...data }
    setFormData(merged)
    const next = getActiveSteps(merged)
    const nextIdx = stepIdx + 1
    if (nextIdx >= next.length) { setIsSuccess(true); return }
    setDirection('forward')
    setAnimKey(k => k + 1)
    setStepIdx(nextIdx)
  }, [formData, stepIdx])

  const goBack = useCallback(() => {
    if (stepIdx === 0) { setShowLanding(true); return }
    setDirection('backward')
    setAnimKey(k => k + 1)
    setStepIdx(i => i - 1)
  }, [stepIdx])

  const jumpTo = useCallback((stepId) => {
    const idx = activeSteps.findIndex(s => s.id === stepId)
    if (idx === -1) return
    setDirection('backward')
    setAnimKey(k => k + 1)
    setStepIdx(idx)
  }, [activeSteps])

  useEffect(() => {
    if (!showLanding) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [stepIdx, showLanding])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !showLanding) goBack()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [stepIdx, goBack, showLanding])

  if (showLanding) {
    return <LandingPage onApply={() => { setStepIdx(0); setShowLanding(false) }} />
  }

  if (isSuccess) return <Success formData={formData} />

  const countableSteps = activeSteps.filter(s => s.section !== null)
  const currentCountable = activeSteps.slice(0, stepIdx).filter(s => s.section !== null).length
  const progress = countableSteps.length > 0 ? (currentCountable / countableSteps.length) * 100 : 0

  const StepComponent = currentStep?.component
  const stepProps = { formData, updateForm, onNext: goNext, onBack: goBack, jumpTo }

  return (
    <div className="app">
      <ProgressBar
        progress={progress}
        section={currentStep?.section}
        sectionName={currentStep?.sectionName}
        current={currentCountable}
        total={countableSteps.length}
      />
      <div key={animKey} className={`step-container ${direction}`}>
        {StepComponent && <StepComponent {...stepProps} />}
      </div>
    </div>
  )
}
