import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  color: string;
  index: number;
  onClick: () => void;
}

export function CategoryCard({ icon: Icon, title, count, color, index, onClick }: CategoryCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative bg-card border border-[var(--neon-cyan)]/20 p-6 text-left group overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--neon-cyan)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.02]" />

      {/* Icon */}
      <div className="relative mb-4">
        <div
          className="w-12 h-12 border-2 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform"
          style={{ borderColor: color }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div
          className="absolute inset-0 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Content */}
      <h3 className="text-lg mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mono">
        {count} produtos
      </p>

      {/* Corner accent */}
      <div
        className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: color }}
      />

      {/* Hover scan line */}
      <motion.div
        className="absolute inset-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, ${color}, transparent)`,
        }}
        animate={{
          y: [0, 200],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.button>
  );
}
