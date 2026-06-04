import { useState } from 'react';
import { 
  SparklesIcon, ShieldIcon, UsersIcon, InfoIcon, MailIcon, 
  UserIcon, PhoneIcon, MapPinIcon, ArrowRightIcon, BellIcon, 
  GearIcon, GraduationCapIcon, AwardIcon, BriefcaseIcon, HeartIcon, 
  LinkedInIcon, SuccessCheckIcon 
} from './components/ui/Icons/Icons';
import ucrCampusImg from './assets/ucr_campus.png';
import alumniUcrLogo from './assets/alumni_ucr_logo.png';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

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

function App() {
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
    // Clear error when user starts typing
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
    // Clear error for terms if checked
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
      // Step 5: Intereses
      if (formData.intereses.length === 0) {
        newErrors.intereses = 'Debe seleccionar al menos un interés.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
  
    // Final step: complete registration and redirect based on user type
    if (step === 5) {
      const isStudent = formData.userType === 'estudiante';
      // Update esEstudiante flag accordingly
      setFormData(prev => ({
        ...prev,
        esEstudiante: isStudent,
      }));
      // Navigate to appropriate dashboard
      if (isStudent) {
        navigate('/dashboard');
      } else {
        // Placeholder route for alumni dashboard
        navigate('/alumni-dashboard');
      }
      // Move to success screen (step 6)
      setStep(6);
      return;
    }
  
    // Intermediate steps: just advance
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



  // Layout attributes based on steps
  // NEW ORDER:
  // Step 1: Personal Information (Centered, 20%)
  // Step 2: Verificación Institucional (Two-column, 40%)
  // Step 3: Información Académica (Two-column, 60%)
  // Step 4: Información Profesional (Centered, 80%)
  // Step 5: Preferencias (Two-column, 100%)
  const isTwoColumn = step === 2 || step === 3 || step === 5;
  const progressPercent = step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100;
  
  const stepLabel = step === 1 ? 'Step 1 of 5' : `Paso ${step} de 5`;
  
  const stepTitle = step === 1 ? 'Personal Information'
                  : step === 2 ? 'Verificación Institucional' 
                  : step === 3 ? 'Información Académica' 
                  : step === 4 ? 'Información Profesional' 
                  : 'Preferencias de Participación';

  // Determine if header should look like "Logged in" (icons) or "Logged out" (Login/Register buttons)
  // Step 1 is Personal Info (Login/Register), Step 2 is Verificación (Avatar/Notification), etc.
  const isAltHeader = step === 2 || step === 3 || step === 5 || step === 6;

  // Checks for button disabled conditions
  const isStep1Valid = formData.fullName.trim() !== '' && 
                       formData.personalEmail.trim() !== '' && 
                       /\S+@\S+\.\S+/.test(formData.personalEmail.trim()) &&
                       formData.phone.trim() !== '' && 
                       formData.location.trim() !== '';

  const isStep2Valid = formData.userType && formData.correoUCR.trim().toLowerCase().endsWith('@ucr.ac.cr') && formData.aceptaTerminos;

  const isStep3Valid = formData.carrera !== '' && formData.grado !== '' && (formData.userType !== 'exalumno' || (formData.anioGraduacion.trim() !== '' && !isNaN(parseInt(formData.anioGraduacion.trim())) && parseInt(formData.anioGraduacion.trim()) >= 1940 && parseInt(formData.anioGraduacion.trim()) <= 2026));

  const isStep4Valid = formData.empresa.trim() !== '' && 
                       formData.cargo.trim() !== '' && 
                       formData.sector !== '';

  const isStep5Valid = formData.intereses.length > 0;

  return (
    <>
      {/* Header */}
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
              <button className="icon-button" aria-label="Notificaciones">
                <BellIcon />
              </button>
              <button className="icon-button" aria-label="Configuración">
                <GearIcon />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
                alt="Perfil" 
                className="avatar-img"
              />
            </div>
          ) : (
            <>
              <button className="btn-login">Login</button>
              <button className="btn-register-header">Register</button>
            </>
          )}
        </div>
      </header>

      {/* Main Body Content */}
      <main className="main-content">
        
        {step === 6 ? (
          /* SUCCESS SCREEN (Centered layout, separate final card) */
          <div className="container-centered">
            <div className="wizard-card" style={{ maxWidth: '560px' }}>
              <div className="success-card">
                <div className="success-icon-wrapper">
                  <SuccessCheckIcon />
                </div>
                <h2 className="success-title">¡Registro Completado!</h2>
                <p className="success-message">
                  Te has registrado con éxito en la Fundación Exalumnos UCR. Se ha enviado un correo de bienvenida y verificación a tu dirección institucional.
                </p>

                <div className="summary-box">
                  <h3 className="summary-title">Resumen de Registro</h3>
                  <div className="summary-row">
                    <span className="summary-label">Nombre Completo:</span>
                    <span className="summary-value">{formData.fullName}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Correo Institucional:</span>
                    <span className="summary-value">{formData.correoUCR}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Teléfono:</span>
                    <span className="summary-value">{formData.phone}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Carrera UCR:</span>
                    <span className="summary-value">{formData.carrera.split(' / ')[0]}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Lugar de Trabajo:</span>
                    <span className="summary-value">{formData.empresa}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button className="btn-back" onClick={handleReset}>Registrar Otro</button>
                  <button 
                    className="btn-continue" 
                    onClick={() => alert('¡Bienvenido al Dashboard del Exalumno UCR!')}
                  >
                    <span>Ir al Dashboard</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* REGISTRATION FLOW - Single Persistent Card Layout to allow progress bar animation */
          <div className={isTwoColumn ? "container-wide two-column-layout" : "container-centered centered-layout"}>
            
            {/* Left Column (Only rendered for Steps 2, 3, 5) */}
            {isTwoColumn && (
              <div className="left-panel">
                {step === 2 && (
                  <>
                    <div className="badge">
                      <SparklesIcon />
                      <span>Programa de Impacto</span>
                    </div>
                    <h1 className="highlight-title">Impulsa tu Futuro Académico</h1>
                    <p className="highlight-desc">
                      Únete a nuestra red de apoyo. Al registrarte, podrás acceder a mentorías, fondos de investigación y una comunidad global de exalumnos dispuestos a invertir en tu talento.
                    </p>
                    <div className="features-list">
                      <div className="feature-item">
                        <div className="feature-icon-wrapper blue">
                          <ShieldIcon />
                        </div>
                        <div>
                          <h4 className="feature-title">Identidad Verificada</h4>
                          <p className="feature-desc">Acceso exclusivo para la comunidad UCR.</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon-wrapper green">
                          <UsersIcon />
                        </div>
                        <div>
                          <h4 className="feature-title">Red de Mentores</h4>
                          <p className="feature-desc">Conecta con líderes en tu industria.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="badge" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                      <GraduationCapIcon />
                      <span>Trayectoria UCR</span>
                    </div>
                    <h1 className="highlight-title">Comparte tu Orgullo Universitario</h1>
                    <p className="highlight-desc">
                      Tu paso por la Universidad de Costa Rica es el inicio de tu legado. Cuéntanos sobre tus estudios para conectarte con iniciativas de tu facultad y de tu área académica.
                    </p>
                    <div className="features-list">
                      <div className="feature-item">
                        <div className="feature-icon-wrapper blue">
                          <GraduationCapIcon />
                        </div>
                        <div>
                          <h4 className="feature-title">Comunidad Egresada</h4>
                          <p className="feature-desc">Red de contactos con graduados de tu misma carrera.</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon-wrapper green">
                          <AwardIcon />
                        </div>
                        <div>
                          <h4 className="feature-title">Apoyo Estudiantil</h4>
                          <p className="feature-desc">Oportunidades para guiar y becar a las nuevas generaciones.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    <div className="badge" style={{ backgroundColor: '#e6fcf5', color: '#0ca678' }}>
                      <HeartIcon />
                      <span>Red de Impacto</span>
                    </div>
                    <h1 className="highlight-title">Define tu Participación</h1>
                    <p className="highlight-desc">
                      Elige las áreas donde deseas interactuar con la Fundación. Puedes cambiar tus preferencias en cualquier momento desde tu panel de usuario.
                    </p>
                    <div className="features-list">
                      <div className="feature-item">
                        <div className="feature-icon-wrapper blue">
                          <BriefcaseIcon />
                        </div>
                        <div>
                          <h4 className="feature-title">Bolsa de Empleo</h4>
                          <p className="feature-desc">Acceso a vacantes exclusivas dirigidas a profesionales UCR.</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon-wrapper green">
                          <HeartIcon />
                        </div>
                        <div>
                          <h4 className="feature-title">Fondos y Becas</h4>
                          <p className="feature-desc">Opción de apoyar con donaciones a estudiantes de bajos recursos.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Right Column / Centered Card Wrapper */}
            <div className={isTwoColumn ? "right-panel" : "w-full"} style={!isTwoColumn ? { width: '100%' } : undefined}>
              
              {/* Wizard Card */}
              <div className="wizard-card">
                
                {/* Card Progress Header */}
                <div className="card-header-info">
                  <div className="card-header-top">
                    <span className="card-step-label">{stepLabel}</span>
                    <span className="card-step-percent">{progressPercent}%</span>
                  </div>
                  <h2 className="card-step-title">{stepTitle}</h2>
                  <div className="card-progress-bar" style={{ marginTop: '16px' }}>
                    <div 
                      className="card-progress-fill" 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Fields Form Body */}
                <div className="card-body">
                  
                  {/* Step 1 Fields: Personal Information */}
                  {step === 1 && (
                    <div className="grid-2x2">
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="input-wrapper has-icon">
                          <span className="input-icon-left"><UserIcon /></span>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.fullName && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.fullName}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="personalEmail">Email Address</label>
                        <div className="input-wrapper has-icon">
                          <span className="input-icon-left"><MailIcon /></span>
                          <input
                            type="email"
                            id="personalEmail"
                            name="personalEmail"
                            placeholder="john@example.com"
                            value={formData.personalEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.personalEmail && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.personalEmail}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-wrapper has-icon">
                          <span className="input-icon-left"><PhoneIcon /></span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+506 8888-8888"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.phone && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.phone}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <div className="input-wrapper has-icon">
                          <span className="input-icon-left"><MapPinIcon /></span>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="San José, Costa Rica"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.location && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.location}</span>}
                      </div>
                    </div>
                  )}

                  {/* Step 2 Fields: Verificación Institucional */}
                  {step === 2 && (
                    <>
                      <div className="info-alert">
                        <InfoIcon />
                        <p>Para garantizar la integridad de nuestra comunidad, solicitamos el uso exclusivo del correo institucional @ucr.ac.cr.</p>
                      </div>

                      <div className="form-group">
                        <label htmlFor="correoUCR">Correo Electrónico UCR</label>
                        <div className="input-wrapper has-icon">
                          <span className="input-icon-left"><MailIcon /></span>
                          <input
                            type="email"
                            id="correoUCR"
                            name="correoUCR"
                            placeholder="nombre.apellido@ucr.ac.cr"
                            value={formData.correoUCR}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.correoUCR && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.correoUCR}</span>}
                      </div>

                      <label className="checkbox-group">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          checked={formData.aceptaTerminos}
                          onChange={() => handleCheckboxChange('aceptaTerminos')} 
                        />
                        <span className="checkbox-label">
                          Acepto los términos de uso y políticas de privacidad de la Fundación.
                        </span>
                      </label>
                      {errors.aceptaTerminos && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.aceptaTerminos}</span>}
                    </>
                  )}

                  {/* Step 3 Fields: Información Académica */}
                  {step === 3 && (
                    <>
                      <div className="form-group">
                        <label htmlFor="carrera">Carrera / Especialidad</label>
                        <select
                          id="carrera"
                          name="carrera"
                          value={formData.carrera}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Seleccione una carrera --</option>
                          {CARRERAS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {errors.carrera && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.carrera}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="grado">Grado Académico Máximo Obtenido</label>
                        <select
                          id="grado"
                          name="grado"
                          value={formData.grado}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Seleccione el grado obtenido --</option>
                          {GRADOS.map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        {errors.grado && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.grado}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="anioGraduacion">Año de Graduación</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="anioGraduacion"
                            name="anioGraduacion"
                            placeholder="Ej. 2018"
                            value={formData.anioGraduacion}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.anioGraduacion && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.anioGraduacion}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="facultad">Carné de Estudiante (Opcional)</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="facultad"
                            name="facultad"
                            placeholder="Ej. A84321"
                            value={formData.facultad}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 4 Fields: Información Profesional */}
                  {step === 4 && (
                    <div className="grid-2x2">
                      <div className="form-group">
                        <label htmlFor="empresa">Empresa / Lugar de Trabajo</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="empresa"
                            name="empresa"
                            placeholder="Ej. Intel Costa Rica, CSS o Independiente"
                            value={formData.empresa}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.empresa && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.empresa}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="cargo">Cargo u Ocupación</label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="cargo"
                            name="cargo"
                            placeholder="Ej. Líder Técnico, Administrador"
                            value={formData.cargo}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.cargo && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.cargo}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="sector">Sector de la Industria</label>
                        <select
                          id="sector"
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Seleccione un sector --</option>
                          {SECTORES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.sector && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.sector}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="linkedin">Enlace a LinkedIn (Opcional)</label>
                        <div className="input-wrapper has-icon">
                          <span className="input-icon-left"><LinkedInIcon /></span>
                          <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/usuario"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.linkedin && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.linkedin}</span>}
                      </div>
                    </div>
                  )}

                  {/* Step 5 Fields: Preferencias */}
                  {step === 5 && (
                    <>
                      <p style={{ fontSize: '15px', color: 'var(--color-text-dark)', fontWeight: '600', marginBottom: '16px', textAlign: 'left' }}>
                        ¿Cómo te gustaría colaborar o participar? (Elige al menos una opción)
                      </p>

                      <div className="interests-grid">
                        {[
                          { id: 'empleo', name: 'Bolsa de Empleo', desc: 'Recibir ofertas laborales y conectar con reclutadores.', icon: <BriefcaseIcon /> },
                          { id: 'mentoria', name: 'Programa de Mentoría', desc: 'Guiar a estudiantes activos o recién graduados.', icon: <UsersIcon /> },
                          { id: 'donaciones', name: 'Donaciones y Proyectos', desc: 'Apoyar los fondos de becas y desarrollo de la UCR.', icon: <HeartIcon /> },
                          { id: 'eventos', name: 'Eventos y Conferencias', desc: 'Asistir a seminarios, charlas y networking.', icon: <AwardIcon /> },
                        ].map((item) => (
                          <div 
                            key={item.id} 
                            className={`interest-card ${formData.intereses.includes(item.id) ? 'selected' : ''}`}
                            onClick={() => handleInterestToggle(item.id)}
                          >
                            <input 
                              type="checkbox" 
                              className="checkbox-input"
                              checked={formData.intereses.includes(item.id)}
                              onChange={() => {}}
                            />
                            <div className="interest-icon">{item.icon}</div>
                            <div className="interest-details">
                              <span className="interest-name">{item.name}</span>
                              <p className="interest-desc">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.intereses && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '12px', display: 'block', textAlign: 'left' }}>{errors.intereses}</span>}
                    </>
                  )}

                </div>

                {/* Card Actions Footer */}
                <div className="card-actions">
                  {step > 1 && (
                    <button className="btn-back" onClick={handleBack}>Volver</button>
                  )}
                  
                  {step === 1 && (
                    <button 
                      className="btn-continue" 
                      onClick={handleNext}
                      disabled={!isStep1Valid}
                    >
                      <span>Next Step</span>
                      <ArrowRightIcon />
                    </button>
                  )}

                  {step === 2 && (
                    <button 
                      className="btn-continue" 
                      onClick={handleNext}
                      disabled={!isStep2Valid}
                    >
                      <span>Continuar</span>
                      <ArrowRightIcon />
                    </button>
                  )}

                  {step === 3 && (
                    <button 
                      className="btn-continue" 
                      onClick={handleNext}
                      disabled={!isStep3Valid}
                    >
                      <span>Continuar</span>
                      <ArrowRightIcon />
                    </button>
                  )}

                  {step === 4 && (
                    <button 
                      className="btn-continue" 
                      onClick={handleNext}
                      disabled={!isStep4Valid}
                    >
                      <span>Siguiente Paso</span>
                      <ArrowRightIcon />
                    </button>
                  )}

                  {step === 5 && (
                    <button 
                      className="btn-continue" 
                      onClick={handleNext}
                      disabled={!isStep5Valid}
                    >
                      <span>Finalizar Registro</span>
                      <ArrowRightIcon />
                    </button>
                  )}
                </div>

              </div>
              
              {/* Routing for Dashboard */}
              <Routes>
<Route path="/dashboard" element={<ProtectedRoute formData={formData} requiredRole="estudiante"><Dashboard /></ProtectedRoute>} />
              </Routes>

              {/* Bottom Panels (Only rendered below the Card in centered steps 1, 4) */}
              {!isTwoColumn && step === 1 && (
                <div className="bottom-panel">
                  <img src={ucrCampusImg} alt="UCR Campus" className="hero-thumbnail" />
                  <div className="hero-content">
                    <h3 className="hero-title">Tu legado continúa aquí</h3>
                    <p className="hero-desc">
                      Únete a más de 50,000 exalumnos que están transformando el futuro de Costa Rica a través de la Fundación.
                    </p>
                  </div>
                </div>
              )}

              {!isTwoColumn && step === 4 && (
                <div className="bottom-hero-panel">
                  <div className="hero-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e6f2ff', color: 'var(--color-primary)' }}>
                    <BriefcaseIcon />
                  </div>
                  <div className="hero-content">
                    <h3 className="hero-title">Crece profesionalmente con la Red UCR</h3>
                    <p className="hero-desc">
                      Comparte tu trayectoria para acceder a mentorías con líderes, publicar u obtener ofertas en la bolsa de empleo oficial.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src={alumniUcrLogo} alt="Alumni UCR Logo" className="footer-logo-img" />
            <p className="footer-copy">© 2024 Alumni UCR. Conectando generaciones.</p>
          </div>
          
          <ul className="footer-links">
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
            <li><a href="#" className="footer-link">UCR Official</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default App;
