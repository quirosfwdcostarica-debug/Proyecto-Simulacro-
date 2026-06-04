import { useState } from 'react';
import ucrCampusImg from './assets/ucr_campus.png';
import alumniUcrLogo from './assets/alumni_ucr_logo.png';
import { Routes, Route, Link, useNavigate, BrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from './Dashboard';
import './App.css';
import { StudentDirectory } from './pages/StudentDirectory/StudentDirectory';
import { AlumniDirectory } from './pages/AlumniDirectory/AlumniDirectory';
import { MatchingSystem } from './pages/MatchingSystem/MatchingSystem';
import { LandingPage } from './pages/LandingPage/LandingPage';

export interface FormData {
  userType: string;
  esEstudiante: boolean;
  correoUCR: string;
  aceptaTerminos: boolean;
  fullName: string;
  personalEmail: string;
  phone: string;
  location: string;
  carrera: string;
  grado: string;
  anioGraduacion: string;
  facultad: string;
  empresa: string;
  cargo: string;
  sector: string;
  linkedin: string;
  intereses: string[];
}

const INITIAL_FORM_DATA: FormData = {
  userType: '',
  esEstudiante: false,
  correoUCR: '',
  aceptaTerminos: false,
  fullName: '',
  personalEmail: '',
  phone: '',
  location: '',
  carrera: '',
  grado: '',
  anioGraduacion: '',
  facultad: '',
  empresa: '',
  cargo: '',
  sector: '',
  linkedin: '',
  intereses: [],
};

const SECTORES = [
  'Tecnología e Informática',
  'Salud y Medicina',
  'Finanzas y Economía',
  'Educación',
  'Ingeniería y Construcción',
  'Ciencias Sociales',
  'Artes y Letras',
  'Otro',
];

const GRADOS = [
  'Bachillerato Universitario',
  'Licenciatura',
  'Maestría',
  'Doctorado',
  'Especialidad Médica/Técnica',
];

const CARRERAS = [
  'Ingeniería en Computación / Ciencias de la Computación',
  'Ingeniería Eléctrica',
  'Ingeniería Industrial',
  'Ingeniería Civil',
  'Derecho',
  'Medicina y Cirugía',
  'Administración de Empresas',
  'Economía',
  'Psicología',
  'Comunicación Colectiva',
  'Arquitectura',
  'Educación Primaria / Secundaria',
];

function RegisterWizard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [step, setStep] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCheckboxChange = (name: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const intereses = prev.intereses.includes(interest)
        ? prev.intereses.filter((i) => i !== interest)
        : [...prev.intereses, interest];
      return { ...prev, intereses };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es obligatorio.';
      if (!formData.personalEmail) {
        newErrors.personalEmail = 'El correo personal es obligatorio.';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.personalEmail.trim())) {
        newErrors.personalEmail = 'Formato de correo no válido.';
      }
      if (!formData.phone.trim()) newErrors.phone = 'El número de teléfono es obligatorio.';
      if (!formData.location.trim()) newErrors.location = 'La ubicación es obligatoria.';
    } else if (currentStep === 2) {
      if (!formData.userType) newErrors.userType = 'Seleccione un tipo de usuario.';
      const trimmedEmail = formData.correoUCR.trim();
      if (!trimmedEmail) {
        newErrors.correoUCR = 'El correo institucional es obligatorio.';
      } else if (!trimmedEmail.toLowerCase().endsWith('@ucr.ac.cr')) {
        newErrors.correoUCR = 'El correo debe ser con dominio institucional (@ucr.ac.cr).';
      }
      if (!formData.aceptaTerminos) newErrors.aceptaTerminos = 'Debe aceptar los términos de uso y políticas.';
    } else if (currentStep === 3) {
      if (!formData.carrera) newErrors.carrera = 'Debe seleccionar una carrera.';
      if (!formData.grado) newErrors.grado = 'Debe seleccionar un grado académico.';
      if (formData.userType === 'exalumno') {
        if (!formData.anioGraduacion) {
          newErrors.anioGraduacion = 'El año de graduación es obligatorio para exalumnos.';
        } else {
          const year = parseInt(formData.anioGraduacion.trim());
          if (isNaN(year) || year < 1940 || year > new Date().getFullYear()) {
            newErrors.anioGraduacion = 'Ingrese un año válido.';
          }
        }
      }
    } else if (currentStep === 4) {
      if (!formData.cargo.trim()) {
        newErrors.cargo = 'El cargo es obligatorio.';
      }
      if (!formData.sector) {
        newErrors.sector = 'Debe seleccionar un sector.';
      }
      if (formData.linkedin && !formData.linkedin.toLowerCase().includes('linkedin.com')) {
        newErrors.linkedin = 'El enlace debe ser un perfil de LinkedIn válido.';
      }
    } else if (currentStep === 5) {
      if (formData.intereses.length === 0) {
        newErrors.intereses = 'Debe seleccionar al menos un interés.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    if (step === 5) {
      const isStudent = formData.userType === 'estudiante';
      setFormData(prev => ({
        ...prev,
        esEstudiante: isStudent,
      }));
      if (isStudent) {
        navigate('/dashboard');
      } else {
        navigate('/alumni-dashboard');
      }
      setStep(6);
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setErrors({});
  };

  const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

  const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const InfoIcon = () => (
    <svg className="info-alert-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );

  const GearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );

  const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );

  const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );

  const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const SuccessCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const isTwoColumn = step === 2 || step === 3 || step === 5;
  const progressPercent = step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100;
  const stepLabel = step === 1 ? 'Step 1 of 5' : `Paso ${step} de 5`;
  const stepTitle = step === 1 ? 'Personal Information' : step === 2 ? 'Verificación Institucional' : step === 3 ? 'Información Académica' : step === 4 ? 'Información Profesional' : 'Preferencias de Participación';
  const isAltHeader = step === 2 || step === 3 || step === 5 || step === 6;

  const isStep1Valid = formData.fullName.trim() !== '' && formData.personalEmail.trim() !== '' && /\S+@\S+\.\S+/.test(formData.personalEmail.trim()) && formData.phone.trim() !== '' && formData.location.trim() !== '';
  const isStep2Valid = formData.userType !== '' && formData.correoUCR.toLowerCase().endsWith('@ucr.ac.cr') && formData.aceptaTerminos;
  const isStep3Valid = formData.carrera !== '' && formData.grado !== '' && (formData.userType !== 'exalumno' || (formData.anioGraduacion.trim() !== '' && !isNaN(parseInt(formData.anioGraduacion.trim())) && parseInt(formData.anioGraduacion.trim()) >= 1940 && parseInt(formData.anioGraduacion.trim()) <= 2026));
  const isStep4Valid = formData.empresa.trim() !== '' && formData.cargo.trim() !== '' && formData.sector !== '';
  const isStep5Valid = formData.intereses.length > 0;

  return (
    <>
      <header className="app-header">
        <div className="logo-container">
          <img src={alumniUcrLogo} alt="Alumni UCR Logo" className="app-logo-img" />
        </div>
        <ul className="nav-links">
          {formData.esEstudiante && (
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          )}
          <li><a href="#" className="nav-link">Directory</a></li>
          <li><a href="#" className="nav-link">Jobs</a></li>
          <li><a href="#" className="nav-link">Donations</a></li>
        </ul>
        <div className="header-actions">
          {isAltHeader ? (
            <div className="header-icons">
              <button className="icon-button" aria-label="Notificaciones"><BellIcon /></button>
              <button className="icon-button" aria-label="Configuración"><GearIcon /></button>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Perfil" className="avatar-img" />
            </div>
          ) : (
            <>
              <button className="btn-login">Login</button>
              <button className="btn-register-header">Register</button>
            </>
          )}
        </div>
      </header>
      <main className="main-content">
        {step === 6 ? (
          <div className="container-centered">
            <div className="wizard-card" style={{ maxWidth: '560px' }}>
              <div className="success-card">
                <div className="success-icon-wrapper"><SuccessCheckIcon /></div>
                <h2 className="success-title">¡Registro Completado!</h2>
                <p className="success-message">Te has registrado con éxito en la Fundación Exalumnos UCR.</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button className="btn-back" onClick={handleReset}>Registrar Otro</button>
                  <button className="btn-continue" onClick={() => alert('¡Bienvenido!')}><span>Ir al Dashboard</span><ArrowRightIcon /></button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={isTwoColumn ? "container-wide two-column-layout" : "container-centered centered-layout"}>
            {isTwoColumn && (
              <div className="left-panel">
                 {/* Logic for left panel content would go here */}
              </div>
            )}
            <div className={isTwoColumn ? "right-panel" : "w-full"} style={!isTwoColumn ? { width: '100%' } : undefined}>
              <div className="wizard-card">
                <div className="card-header-info">
                  <h2 className="card-step-title">{stepTitle}</h2>
                  <div className="card-progress-bar"><div className="card-progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
                </div>
                <div className="card-body">
                  {step === 1 && (/* ... fields ... */ <></>)}
                </div>
                <div className="card-actions">
                  {step > 1 && <button className="btn-back" onClick={handleBack}>Volver</button>}
                  <button className="btn-continue" onClick={handleNext}>Continuar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/students" element={<StudentDirectory />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
        <Route path="/matching" element={<MatchingSystem />} />
        <Route path="*" element={<Navigate to="/students" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
