import { ShoppingCart, Search, Menu, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ cartCount, onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--neon-cyan)]/30 bg-background/95 backdrop-blur-md"
    >
      {/* Top line glow effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-50" />

      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <Zap className="w-8 h-8 text-[var(--neon-cyan)] drop-shadow-[0_0_10px_var(--neon-cyan)]" />
              <div className="absolute inset-0 blur-xl bg-[var(--neon-cyan)] opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
            <h1 className="text-2xl tracking-wider">
              <span className="text-[var(--neon-cyan)] drop-shadow-[0_0_8px_var(--neon-cyan)]">TECH</span>
              <span className="text-[var(--neon-magenta)] drop-shadow-[0_0_8px_var(--neon-magenta)]">STORE</span>
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['Produtos', 'Smartphones', 'Notebooks', 'Áudio', 'Gaming'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className="px-4 py-2 relative group text-sm tracking-wide"
              >
                <span className="relative z-10 text-foreground/80 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {item}
                </span>
                <div className="absolute inset-0 bg-[var(--neon-cyan)]/0 group-hover:bg-[var(--neon-cyan)]/10 border border-transparent group-hover:border-[var(--neon-cyan)]/50 transition-all" />
              </motion.button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neon-cyan)]/50 group-focus-within:text-[var(--neon-cyan)] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full pl-10 pr-4 py-2 bg-[var(--input-background)] border border-[var(--neon-cyan)]/20 focus:border-[var(--neon-cyan)] outline-none transition-all placeholder:text-foreground/30"
              />
              <div className="absolute inset-0 bg-[var(--neon-cyan)]/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 hover:bg-[var(--neon-cyan)]/10 border border-transparent hover:border-[var(--neon-cyan)]/50 transition-all"
            >
              <Search className="w-5 h-5 text-[var(--neon-cyan)]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 hover:bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 hover:border-[var(--neon-green)] transition-all group"
            >
              <ShoppingCart className="w-5 h-5 text-[var(--neon-green)]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--neon-magenta)] text-[10px] font-bold flex items-center justify-center border border-background mono"
                >
                  {cartCount}
                </motion.span>
              )}
              <div className="absolute inset-0 blur-lg bg-[var(--neon-green)] opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 hover:bg-[var(--neon-cyan)]/10 border border-transparent hover:border-[var(--neon-cyan)]/50 transition-all"
            >
              <Menu className="w-5 h-5 text-[var(--neon-cyan)]" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/30 to-transparent" />
    </motion.header>
  );
}
