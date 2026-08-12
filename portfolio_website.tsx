import React, { useState, useEffect } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Toggle Dark/Light mode class on root body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle active navigation highlights based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 'about', 'education', 'skills', 
        'projects', 'achievements', 'courses', 
        'activities', 'resume', 'contact'
      ];
      
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Name is required';
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formState.subject.trim()) errors.subject = 'Subject is required';
    if (!formState.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormState({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }
  };

  // Custom Inline SVG Icons to ensure zero external dependency failures
  const Icon = ({ name, className = "w-5 h-5" }) => {
    switch (name) {
      case 'brain':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'code':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'chart':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'academic':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'award':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'folder':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'github':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'sun':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'moon':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'download':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        );
      case 'menu':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        );
      case 'close':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'check':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'external':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      case 'user':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'location':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'sports':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Courses', id: 'courses' },
    { name: 'Activities', id: 'activities' },
    { name: 'Resume', id: 'resume' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Dynamic Background Mesh Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 dark:opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Bar */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
              SP
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
                Sathiya Priya
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                AI & DS Scholar
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Utilities (Theme Switcher + Mobile Menu Button) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200'
              }`}
              title="Toggle Theme"
              aria-label="Toggle light or dark theme"
            >
              {darkMode ? <Icon name="sun" className="w-5 h-5" /> : <Icon name="moon" className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <Icon name="close" className="w-6 h-6" /> : <Icon name="menu" className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{link.name}</span>
                {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 py-12">
        
        {}
        {/* HERO SECTION */}
        <section id="home" className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-8">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>B.Tech AI & Data Science (2025–2029)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500">
                Sathiya Priya
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 font-light max-w-2xl mx-auto lg:mx-0">
              Aspiring Data Scientist & AI Engineer studying at <span className="text-slate-200 font-medium">SSM Institute of Engineering and Technology, Dindigul</span>. Passionate about machine learning, statistical modeling, and data-driven solutions.
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 max-w-lg mx-auto lg:mx-0">
              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="text-2xl font-black text-cyan-400">9.05</div>
                <div className="text-xs text-slate-400 font-medium">Current CGPA</div>
              </div>
              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="text-2xl font-black text-indigo-400">3rd Rank</div>
                <div className="text-xs text-slate-400 font-medium">12th Standard</div>
              </div>
              <div className={`col-span-2 sm:col-span-1 p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
                <div className="text-2xl font-black text-emerald-400">2+ Major</div>
                <div className="text-xs text-slate-400 font-medium">AI & Data Projects</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <Icon name="external" className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowResumeModal(true)}
                className={`px-6 py-3 rounded-xl border font-semibold transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:border-slate-600' 
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon name="download" className="w-4 h-4 text-cyan-400" />
                <span>Resume Modal</span>
              </button>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4">
              <a
                href="[ADD INFORMATION]"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400' : 'bg-white border-slate-200 hover:text-cyan-600'
                }`}
                title="GitHub Profile [ADD INFORMATION]"
              >
                <Icon name="github" className="w-5 h-5" />
              </a>
              <a
                href="[ADD INFORMATION]"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 hover:text-indigo-400' : 'bg-white border-slate-200 hover:text-indigo-600'
                }`}
                title="LinkedIn Profile [ADD INFORMATION]"
              >
                <Icon name="linkedin" className="w-5 h-5" />
              </a>
              <a
                href="mailto:[ADD INFORMATION]"
                className={`p-3 rounded-xl border transition-all ${
                  darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:text-sky-400' : 'bg-white border-slate-200 hover:text-sky-600'
                }`}
                title="Email Sathiya Priya [ADD INFORMATION]"
              >
                <Icon name="mail" className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Graphic Visual AI Node Canvas / Banner Card */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className={`relative rounded-3xl p-6 border overflow-hidden ${
              darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border-slate-800' : 'bg-gradient-to-br from-white via-cyan-50/50 to-indigo-50/50 border-slate-200'
            } shadow-2xl`}>
              
              {/* Floating Code/Data Pill Decorative badges */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/50">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">sathiyapriya_profile.py</span>
                </div>

                <div className="font-mono text-sm space-y-2 text-slate-300">
                  <p><span className="text-pink-400">class</span> <span className="text-yellow-300">DataScientist</span>:</p>
                  <p className="pl-4"><span className="text-blue-400">def</span> <span className="text-green-300">__init__</span>(self):</p>
                  <p className="pl-8"><span className="text-cyan-300">self.name</span> = <span className="text-amber-300">"Sathiya Priya"</span></p>
                  <p className="pl-8"><span className="text-cyan-300">self.institution</span> = <span className="text-amber-300">"SSMIET, Dindigul"</span></p>
                  <p className="pl-8"><span className="text-cyan-300">self.degree</span> = <span className="text-amber-300">"B.Tech AI & DS (2025-2029)"</span></p>
                  <p className="pl-8"><span className="text-cyan-300">self.cgpa</span> = <span className="text-cyan-400 font-bold">9.05</span></p>
                  <p className="pl-8"><span className="text-cyan-300">self.interests</span> = [<span className="text-amber-300">"AI"</span>, <span className="text-amber-300">"Data Science"</span>, <span className="text-amber-300">"ML"</span>]</p>
                  <p className="pl-4"><span className="text-blue-400">def</span> <span className="text-green-300">get_status</span>(self):</p>
                  <p className="pl-8"><span className="text-pink-400">return</span> <span className="text-amber-300">"Building intelligent systems & analytics"</span></p>
                </div>

                {/* Simulated Neural Network Graphic */}
                <div className="pt-4 flex justify-around items-center border-t border-slate-800/50">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-xs font-mono">Py</div>
                    <span className="text-[10px] text-slate-400 mt-1">Python</span>
                  </div>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-indigo-400 text-xs font-mono">TF</div>
                    <span className="text-[10px] text-slate-400 mt-1">TensorFlow</span>
                  </div>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 text-xs font-mono">R</div>
                    <span className="text-[10px] text-slate-400 mt-1">R / STATA</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

        {}
        {/* ABOUT ME SECTION */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About <span className="text-cyan-400">Me</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Driven by curiosity for data pattern discovery and artificial intelligence innovation.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} shadow-xl space-y-6`}>
            <div className="prose dark:prose-invert max-w-none text-slate-300 leading-relaxed text-base sm:text-lg space-y-4">
              <p>
                Hello! I am <strong className="text-cyan-400 font-semibold">Sathiya Priya</strong>, currently pursuing my <strong>B.Tech in Artificial Intelligence & Data Science (2025–2029)</strong> at <strong>SSM Institute of Engineering and Technology, Dindigul</strong>.
              </p>
              <p>
                With a strong academic foundation highlighted by a <strong>9.05 CGPA</strong> and securing <strong>3rd rank in my 12th standard examinations</strong>, I thrive at the intersection of mathematics, programming, and algorithm design. My core interest lies in converting raw unstructured data into actionable intelligence and developing efficient automated software systems.
              </p>
            </div>

            {/* Core Interest Cards */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Core Technical Focus Areas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Artificial Intelligence', desc: 'Neural architectures & intelligent systems design.', icon: 'brain', color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30' },
                  { title: 'Data Science', desc: 'Predictive analytics & exploratory data modeling.', icon: 'chart', color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30' },
                  { title: 'Machine Learning', desc: 'Supervised/unsupervised algorithms & TensorFlow builds.', icon: 'code', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30' },
                  { title: 'Data Analysis', desc: 'Statistical investigation using R, STATA & Matplotlib.', icon: 'academic', color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border bg-gradient-to-br ${item.color} transition-all hover:scale-105`}>
                    <Icon name={item.icon} className={`w-8 h-8 mb-3 ${item.color.split(' ')[2]}`} />
                    <h4 className="font-bold text-slate-100 text-base">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {}
        {/* EDUCATION SECTION */}
        <section id="education" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Education <span className="text-indigo-400">Journey</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Academic qualifications and academic milestones.
            </p>
          </div>

          <div className="relative border-l-2 border-indigo-500/30 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-10">
            
            {/* B.Tech AI & DS */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-cyan-500 ring-4 ring-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-md hover:border-cyan-500/40 transition-all`}>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">B.Tech in Artificial Intelligence & Data Science</h3>
                    <p className="text-cyan-400 font-medium text-sm">SSM Institute of Engineering and Technology, Dindigul</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    2025 – 2029
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-xs font-semibold text-slate-400">Cumulative GPA:</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-sm border border-emerald-500/20">
                    9.05 / 10.0
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Focusing on core AI algorithms, machine learning model architectures, data visualization, probabilistic modeling, and modern programming paradigms.
                </p>
              </div>
            </div>

            {/* 12th Standard Higher Secondary */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-indigo-500 ring-4 ring-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-md hover:border-indigo-500/40 transition-all`}>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Higher Secondary (12th Standard)</h3>
                    <p className="text-indigo-400 font-medium text-sm">[ADD INFORMATION - School Name]</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    Completed [ADD INFORMATION Year]
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-xs font-semibold text-slate-400">Achievement Highlight:</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm border border-amber-500/20">
                    3rd Rank in 12th Standard
                  </span>
                </div>
              </div>
            </div>

            {/* 10th Standard Secondary School */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-600 ring-4 ring-slate-900 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-md`}>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Secondary School Certificate (10th Standard)</h3>
                    <p className="text-slate-400 font-medium text-sm">[ADD INFORMATION - School Name]</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">
                    Completed [ADD INFORMATION Year]
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Percentage / Mark Details: <span className="text-slate-300 font-medium">[ADD INFORMATION]</span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {}
        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Technical <span className="text-cyan-400">Skills</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Programming languages, frameworks, libraries, and analytical software tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Programming Languages */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-xl space-y-6`}>
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Icon name="code" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Programming Languages</h3>
                  <p className="text-xs text-slate-400">Core development languages for AI & Data Workflows</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Python', level: 'Advanced', tag: 'Core AI / ML' },
                  { name: 'Java', level: 'Intermediate', tag: 'OOP & Logic' },
                  { name: 'R', level: 'Proficient', tag: 'Data Modeling' },
                  { name: 'STATA', level: 'Proficient', tag: 'Statistical Computing' },
                ].map((sk, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'} hover:border-cyan-500/40 transition-all`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-200 text-base">{sk.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">{sk.level}</span>
                    </div>
                    <span className="text-xs text-slate-400">{sk.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Libraries */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow-xl space-y-6`}>
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Icon name="brain" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Tools & Libraries</h3>
                  <p className="text-xs text-slate-400">Scientific computing, deep learning & plotting stack</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'SciPy', desc: 'Scientific Computations' },
                  { name: 'Matplotlib', desc: 'Data Visualization' },
                  { name: 'TensorFlow', desc: 'Machine & Deep Learning' },
                  { name: 'LaTeX', desc: 'Technical & Academic Publishing' },
                ].map((tl, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'} hover:border-indigo-500/40 transition-all`}>
                    <div className="font-bold text-slate-200 text-base mb-1">{tl.name}</div>
                    <span className="text-xs text-slate-400">{tl.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {}
        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Real-world academic implementations and analytical applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Project 1: Attendance Tracking System */}
            <div className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            } hover:border-cyan-500/40 transition-all shadow-xl group`}>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Software Development & Automation
                  </span>
                  <Icon name="folder" className="w-6 h-6 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                  Attendance Tracking System
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  A digital student attendance management system engineered to automate classroom record keeping, reduce manual entry errors, generate weekly/monthly attendance summaries, and streamline faculty reporting workflows.
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Features:</h4>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>Digital recording and instant record updating</li>
                    <li>Automated attendance percentage computation</li>
                    <li>Exportable reporting summaries for departmental review</li>
                    <li>[ADD INFORMATION - Additional features or tech stack details]</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">Python</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">Database Tools</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">UI Interface</span>
                </div>
              </div>

              <div className={`px-6 py-4 border-t flex justify-between items-center ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-xs text-slate-400">Status: Completed</span>
                <a
                  href="[ADD INFORMATION]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-cyan-400 hover:underline"
                >
                  <span>Repository [ADD INFORMATION]</span>
                  <Icon name="external" className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Project 2: Student Performance Analysis */}
            <div className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            } hover:border-indigo-500/40 transition-all shadow-xl group`}>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Data Analytics & Visualization
                  </span>
                  <Icon name="chart" className="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                  Student Performance Analysis
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  An analytical study assessing academic performance trends and backlogs among students. Utilizes statistical methods to identify key learning bottlenecks and provide actionable insights for academic improvements.
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Features:</h4>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>Exploratory data analysis of marks distribution and backlog patterns</li>
                    <li>Statistical visualization charts (Histograms, Scatter Plots, Trendlines)</li>
                    <li>Correlation analysis between attendance metrics and grades</li>
                    <li>[ADD INFORMATION - Additional analytical metrics]</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">R / STATA</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">Matplotlib</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300">SciPy</span>
                </div>
              </div>

              <div className={`px-6 py-4 border-t flex justify-between items-center ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-xs text-slate-400">Status: Completed</span>
                <a
                  href="[ADD INFORMATION]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-400 hover:underline"
                >
                  <span>Analysis Report [ADD INFORMATION]</span>
                  <Icon name="external" className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {}
        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Honors & <span className="text-amber-400">Achievements</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Recognition of academic dedication and performance excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 12th Rank Card */}
            <div className={`p-6 rounded-3xl border ${
              darkMode ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50' : 'bg-white border-slate-200 hover:border-amber-500'
            } transition-all shadow-lg space-y-4`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Icon name="award" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">3rd Rank in 12th Standard</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Secured overall 3rd position in the 12th standard examinations, demonstrating top-tier performance in science and mathematics subjects.
              </p>
              <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Academic Excellence
              </span>
            </div>

            {/* High CGPA Card */}
            <div className={`p-6 rounded-3xl border ${
              darkMode ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50' : 'bg-white border-slate-200 hover:border-emerald-500'
            } transition-all shadow-lg space-y-4`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Icon name="academic" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">9.05 Cumulative CGPA</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Consistently maintaining distinction level grades in B.Tech Artificial Intelligence & Data Science at SSM Institute of Engineering and Technology.
              </p>
              <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Institutional Distinction
              </span>
            </div>

            {/* Additional Achievements Placeholder */}
            <div className={`p-6 rounded-3xl border ${
              darkMode ? 'bg-slate-900/40 border-slate-800/80 border-dashed' : 'bg-slate-100/50 border-slate-300 border-dashed'
            } flex flex-col justify-center items-center text-center space-y-3`}>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Icon name="award" className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-300">Competitions & Awards</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                [ADD INFORMATION - Mention specific hackathons, paper presentations, or symposium ranks]
              </p>
            </div>

          </div>
        </section>

        {}
        {/* COURSES SECTION */}
        <section id="courses" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Courses & <span className="text-indigo-400">Certifications</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Specialized coursework and continuous technical skill enhancement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Artificial Intelligence & Data Science Core",
                provider: "SSM Institute of Engineering and Technology",
                status: "Ongoing Curriculum",
                tags: ["AI", "Data Science", "Algorithms"]
              },
              {
                title: "Python & Machine Learning Foundations",
                provider: "[ADD INFORMATION - e.g. Coursera / NPTEL / Udemy]",
                status: "[ADD INFORMATION Status]",
                tags: ["Python", "TensorFlow", "SciPy"]
              },
              {
                title: "Statistical Computing with R & STATA",
                provider: "[ADD INFORMATION - e.g. Academic Workshop / NPTEL]",
                status: "[ADD INFORMATION Status]",
                tags: ["R", "STATA", "Data Analysis"]
              }
            ].map((course, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              } flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all`}>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                    {course.provider}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{course.title}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags.map((tg, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tg}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/50 text-slate-400">
                    <span>{course.status}</span>
                    <a href="[ADD INFORMATION]" className="text-indigo-400 hover:underline flex items-center space-x-1">
                      <span>Verify [ADD INFORMATION]</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        {/* EXTRACURRICULAR ACTIVITIES SECTION */}
        <section id="activities" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Extracurricular <span className="text-cyan-400">Activities</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Sports, technical events, workshops, and departmental initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sports */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Icon name="sports" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Sports & Athletics</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Active participant in college and departmental sports events, fostering teamwork, discipline, physical stamina, and competitive spirit.
              </p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Details:</span> [ADD INFORMATION - Specific sports played / tournament achievements]
              </div>
            </div>

            {/* Events & Workshops */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Icon name="academic" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Events & Workshops</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Participated and coordinated technical symposiums, AI seminars, and hands-on data analysis workshops organized at SSMIET.
              </p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Details:</span> [ADD INFORMATION - Event names / workshop titles]
              </div>
            </div>

            {/* Collaborative Projects */}
            <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Icon name="code" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Department Initiatives</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Collaborating on departmental peer learning groups and practical project showcases within the AI & Data Science department.
              </p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Details:</span> [ADD INFORMATION - Club roles / departmental responsibility]
              </div>
            </div>

          </div>
        </section>

        {}
        {/* RESUME SECTION */}
        <section id="resume" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Curriculum <span className="text-indigo-400">Vitae</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Comprehensive overview of credentials, qualifications, and focus areas.
            </p>
          </div>

          <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'} shadow-2xl space-y-8`}>
            
            <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Sathiya Priya</h3>
                <p className="text-sm text-cyan-400">B.Tech Student — Artificial Intelligence & Data Science</p>
                <p className="text-xs text-slate-400 mt-1">SSM Institute of Engineering and Technology, Dindigul | CGPA: 9.05</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all flex items-center space-x-2"
                >
                  <span>Print Resume</span>
                </button>
                <a
                  href="[ADD INFORMATION]"
                  download
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-semibold hover:opacity-95 transition-all flex items-center space-x-2"
                >
                  <Icon name="download" className="w-3.5 h-3.5" />
                  <span>Download PDF [ADD INFORMATION]</span>
                </a>
              </div>
            </div>

            {/* Quick Resume Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-200 text-base flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>Education & Achievements</span>
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <div className="font-semibold text-slate-100">B.Tech AI & DS (2025–2029)</div>
                    <div className="text-slate-400">SSM Institute of Engineering and Technology, Dindigul</div>
                    <div className="text-emerald-400 font-mono mt-0.5">CGPA: 9.05</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">Higher Secondary (12th Std)</div>
                    <div className="text-amber-400 font-mono">3rd Rank Achievement</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-200 text-base flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>Technical Skills Overview</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong className="text-slate-200">Languages:</strong> Python, Java, R, STATA</p>
                  <p><strong className="text-slate-200">Libraries/Tools:</strong> SciPy, Matplotlib, TensorFlow, LaTeX</p>
                  <p><strong className="text-slate-200">Domains:</strong> Artificial Intelligence, Data Science, Machine Learning, Data Analysis</p>
                  <p><strong className="text-slate-200">Projects:</strong> Attendance Tracking System, Student Performance Analysis</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {}
        {/* CONTACT SECTION */}
        <section id="contact" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Feel free to reach out for academic collaborations, projects, or inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="space-y-4 lg:col-span-1">
              
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} flex items-start space-x-4`}>
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Icon name="mail" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Email Address</h4>
                  <p className="text-xs text-slate-400 mt-0.5">[ADD INFORMATION - e.g. sathiyapriya@example.com]</p>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} flex items-start space-x-4`}>
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Icon name="location" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Institution Location</h4>
                  <p className="text-xs text-slate-400 mt-0.5">SSM Institute of Engineering and Technology, Dindigul, Tamil Nadu, India</p>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} flex items-start space-x-4`}>
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Icon name="user" className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Profiles</h4>
                  <div className="flex space-x-3 mt-2 text-xs">
                    <a href="[ADD INFORMATION]" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub [ADD INFORMATION]</a>
                    <span className="text-slate-600">•</span>
                    <a href="[ADD INFORMATION]" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">LinkedIn [ADD INFORMATION]</a>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Contact Form */}
            <div className={`lg:col-span-2 p-8 rounded-3xl border ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            } shadow-2xl`}>
              
              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Icon name="check" className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-300">Thank you for reaching out, Sathiya Priya will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Dr. John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                          darkMode ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-800'
                        }`}
                      />
                      {formErrors.name && <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                          darkMode ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-800'
                        }`}
                      />
                      {formErrors.email && <p className="text-[11px] text-red-400 mt-1">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Project Inquiry / Academic Collaboration"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        darkMode ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-800'
                      }`}
                    />
                    {formErrors.subject && <p className="text-[11px] text-red-400 mt-1">{formErrors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        darkMode ? 'bg-slate-950 border-slate-800 focus:border-cyan-500 text-slate-100' : 'bg-slate-50 border-slate-300 focus:border-cyan-500 text-slate-800'
                      }`}
                    ></textarea>
                    {formErrors.message && <p className="text-[11px] text-red-400 mt-1">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}

            </div>

          </div>
        </section>

      </main>

      {}
      {/* Resume Download / View Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} shadow-2xl space-y-6 relative`}>
            
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold">Sathiya Priya — Resume</h3>
              <p className="text-xs text-slate-400">B.Tech Artificial Intelligence & Data Science | CGPA 9.05</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
              <p>Name: Sathiya Priya</p>
              <p>Degree: B.Tech AI & DS (2025–2029)</p>
              <p>College: SSM Institute of Engineering and Technology, Dindigul</p>
              <p>CGPA: 9.05</p>
              <p>Skills: Python, Java, R, STATA, SciPy, Matplotlib, TensorFlow, LaTeX</p>
              <p>12th Std: 3rd Rank</p>
              <p>Projects: Attendance Tracking System, Student Performance Analysis</p>
              <p>Resume File Link: [ADD INFORMATION]</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Close Modal
              </button>
              <a
                href="[ADD INFORMATION]"
                download
                className="px-4 py-2 rounded-xl bg-cyan-500 text-white text-xs font-semibold flex items-center space-x-1.5"
              >
                <Icon name="download" className="w-4 h-4" />
                <span>Download Resume [ADD INFORMATION]</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className={`border-t py-8 mt-20 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p>© {new Date().getFullYear()} Sathiya Priya. All rights reserved.</p>
            <p className="text-[10px] text-slate-500 mt-0.5">B.Tech AI & DS Student • SSMIET, Dindigul</p>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => scrollTo('home')} className="hover:text-cyan-400 transition-colors">Back to Top ↑</button>
          </div>
        </div>
      </footer>

    </div>
  );
}