import { motion } from 'framer-motion'
import { Hexagon, Shield, Users, Zap, ArrowRight } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Hexagon className="text-white fill-white/20" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter">Be</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Concepto</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Roadmap</a>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
          Entrar
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-4">
              We are perceptions
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              Descubre tu <span className="gradient-text">verdadera esencia</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              La primera red social de feedback anónimo diseñada para el autoconocimiento real.
              Mira a través de los ojos de quienes te conocen.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="w-full md:w-auto px-8 py-4 bg-indigo-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                Empezar Ahora
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full md:w-auto px-8 py-4 glass rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                Explorar el Concepto
              </button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="text-cyan-400" />}
              title="Anonimato Total"
              description="Calificaciones completamente privadas. Sin comentarios escritos para evitar el acoso."
            />
            <FeatureCard
              icon={<Users className="text-purple-400" />}
              title="Múltiples Ámbitos"
              description="Laboral, social, deportivo o personal. Entiende cómo te perciben en cada área de tu vida."
            />
            <FeatureCard
              icon={<Zap className="text-amber-400" />}
              title="IA Psciológica"
              description="Recibe consejos personalizados basados en los datos de percepción para tu crecimiento."
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 text-center text-slate-500 text-sm">
        <p>© 2026 Be Project. Hecho para el autoconocimiento.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 transition-all text-left"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default App
