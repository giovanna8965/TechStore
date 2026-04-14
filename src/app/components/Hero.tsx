import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden border-b border-[var(--neon-cyan)]/30">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated scan lines */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[size:100%_4px]"
        animate={{ backgroundPositionY: ['0px', '4px'] }}
        transition={{ duration: 0.1, repeat: Infinity, ease: 'linear' }}
      />

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,0,255,0.15),transparent_50%)]" />

      <div className="max-w-[1400px] mx-auto px-4 py-20 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--neon-magenta)]/50 bg-[var(--neon-magenta)]/5 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[var(--neon-magenta)]" />
              <span className="text-sm text-[var(--neon-magenta)] mono tracking-wider">LANÇAMENTO 2026</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
            >
              <span className="block text-[var(--neon-cyan)] drop-shadow-[0_0_20px_var(--neon-cyan)]">
                TECNOLOGIA
              </span>
              <span className="block text-[var(--neon-magenta)] drop-shadow-[0_0_20px_var(--neon-magenta)]">
                DO FUTURO
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8 max-w-md"
            >
              Os produtos mais avançados do mercado com até{' '}
              <span className="text-[var(--neon-green)] font-bold">40% OFF</span> em eletrônicos
              selecionados
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[var(--neon-green)] text-background font-bold tracking-wider relative group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORAR PRODUTOS
                  <ChevronRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="absolute inset-0 blur-xl bg-[var(--neon-green)] opacity-50" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] font-bold tracking-wider hover:bg-[var(--neon-cyan)]/10 transition-all relative group"
              >
                VER OFERTAS
                <div className="absolute inset-0 blur-xl bg-[var(--neon-cyan)] opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[var(--neon-cyan)]/20"
            >
              {[
                { value: '500+', label: 'Produtos' },
                { value: '24/7', label: 'Suporte' },
                { value: '100%', label: 'Seguro' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-[var(--neon-cyan)] mono mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="relative"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-[var(--neon-cyan)] blur-[100px] opacity-20 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[var(--neon-magenta)] blur-[120px] opacity-15" />

            {/* Product showcase */}
            <div className="relative aspect-square">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"
                alt="Featured product"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,255,255,0.3)]"
              />

              {/* Rotating border */}
              <motion.div
                className="absolute inset-0 border-2 border-[var(--neon-cyan)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
              />

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[var(--neon-cyan)]" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[var(--neon-magenta)]" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[var(--neon-magenta)]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[var(--neon-cyan)]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />
    </section>
  );
}
