import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hexagon, Shield, Users, Zap, ArrowRight, Monitor, Smartphone, CheckCircle2, ChevronLeft, Globe } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation();
  const [view, setView] = useState<'hero' | 'link'>('hero');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('hero')}>
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Hexagon className="text-white fill-white/20" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter">Be</span>
        </div>

        <AnimatePresence mode="wait">
          {view === 'hero' ? (
            <motion.div
              key="nav-hero"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="hidden md:flex gap-8 text-sm font-medium text-slate-300"
            >
              <a href="#" className="hover:text-white transition-colors">{t('nav.about', 'Concepto')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('nav.features', 'Privacidad')}</a>
              <a href="#" className="hover:text-white transition-colors">Roadmap</a>
            </motion.div>
          ) : (
            <motion.div
              key="nav-link"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-medium text-indigo-400 flex items-center gap-2"
            >
              <Smartphone size={16} /> Vinculación de dispositivo
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-colors border border-slate-700/50"
            >
              <Globe className="text-slate-300" size={18} />
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 bg-[#1e293b] rounded-xl p-2 w-32 shadow-xl border border-slate-700/50 flex flex-col z-50"
                >
                  <button onClick={() => { i18n.changeLanguage('es'); setIsLangMenuOpen(false); }} className={`p-2 hover:bg-slate-800 rounded-lg text-sm text-left ${i18n.language.includes('es') ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}>
                    Español
                  </button>
                  <button onClick={() => { i18n.changeLanguage('en'); setIsLangMenuOpen(false); }} className={`p-2 hover:bg-slate-800 rounded-lg text-sm text-left ${i18n.language.includes('en') ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}>
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setView(view === 'hero' ? 'link' : 'hero')}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            {view === 'hero' ? t('nav.login', 'Abrir Be Web') : 'Volver'}
          </button>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6">
        <AnimatePresence mode="wait">
          {view === 'hero' ? (
            <motion.div
              key="hero-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto text-center"
            >
              <h2 className="text-indigo-400 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-4">
                {t('app.slogan', 'We are perceptions')}
              </h2>
              <h1 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tight leading-[1.1]">
                {t('hero.title1', 'Descubre tu')} <br /><span className="gradient-text">{t('hero.title2', 'verdadera esencia')}</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                {t('hero.description', 'La red social de feedback anónimo diseñada para tu crecimiento personal.')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
                <button
                  onClick={() => setView('link')}
                  className="w-full sm:w-auto px-10 py-5 bg-indigo-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30"
                >
                  Vincular Aplicación
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 glass rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Saber más
                </button>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">1</div>
                  <h3 className="text-xl font-bold">Abre Be en tu móvil</h3>
                  <p className="text-slate-400">Accede a tu perfil y selecciona la opción "Vincular Web".</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">2</div>
                  <h3 className="text-xl font-bold">Escanea el código QR</h3>
                  <p className="text-slate-400">Apunta tu cámara a esta pantalla para sincronizar tu cuenta.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">3</div>
                  <h3 className="text-xl font-bold">Explora tu esencia</h3>
                  <p className="text-slate-400">Accede a herramientas exclusivas diseñadas para desktop.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="link-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass rounded-[2rem] overflow-hidden p-8 md:p-12 border-indigo-500/20 relative">
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Monitor size={120} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div>
                      <button
                        onClick={() => setView('hero')}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm mb-6 uppercase tracking-wider font-bold"
                      >
                        <ChevronLeft size={16} /> Volver
                      </button>
                      <h2 className="text-4xl font-black mb-4 tracking-tight">Vincular con <br /><span className="text-indigo-400">Be Web</span></h2>
                      <p className="text-slate-400">Usa el lector de QR de tu aplicación móvil para iniciar sesión de forma instantánea y segura.</p>
                    </div>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-indigo-500 shrink-0 mt-1" size={18} />
                        <span className="text-sm text-slate-300">Sesión encriptada de punto a punto</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-indigo-500 shrink-0 mt-1" size={18} />
                        <span className="text-sm text-slate-300">Sincronización de contactos en tiempo real</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-indigo-500 shrink-0 mt-1" size={18} />
                        <span className="text-sm text-slate-300">Acceso a reportes premium</span>
                      </li>
                    </ul>

                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50">
                      <p className="text-xs text-slate-500 italic">
                        ¿No tienes la App? Descárgala en tu tienda favorita para empezar a recibir feedback de tus contactos.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="p-6 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/40 relative group">
                      <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                      <div className="relative border-4 border-slate-100 rounded-lg overflow-hidden">
                        <QRCodeSVG
                          value="https://be.app/link/777-666-dev-test"
                          size={240}
                          level="H"
                          includeMargin={true}
                          imageSettings={{
                            src: "https://raw.githubusercontent.com/lucide-react/lucide/main/icons/hexagon.svg",
                            x: undefined,
                            y: undefined,
                            height: 40,
                            width: 40,
                            excavate: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-2 justify-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                        ESPERANDO ESCANEO...
                      </div>
                      <p className="text-xs text-slate-500">El código se actualiza cada 60 segundos por seguridad.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Preview (only in hero) */}
        {view === 'hero' && (
          <div className="max-w-6xl mx-auto mt-40">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Shield className="text-cyan-400" />}
                title="Privacidad Desktop"
                description="Toda tu información está protegida con los mismos estándares que en tu móvil."
              />
              <FeatureCard
                icon={<Users className="text-purple-400" />}
                title="Gestión de Equipos"
                description="Ideal para líderes que desean ver la percepción colectiva de sus Workspaces."
              />
              <FeatureCard
                icon={<Zap className="text-amber-400" />}
                title="Reportes Pro"
                description="Exporta tu esencia a PDFs profesionales con un solo clic desde la web."
              />
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 text-center text-slate-500 text-sm">
        <p>© 2026 Be Project. Tu identidad, en perspectiva.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-slate-800/20 border border-slate-700/50 hover:border-indigo-500/30 transition-all text-left group"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </motion.div>
  )
}

export default App
