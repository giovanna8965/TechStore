import { motion } from 'motion/react';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  specs?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card border border-[var(--neon-cyan)]/20 overflow-hidden"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--neon-cyan)] opacity-50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-magenta)] opacity-50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--neon-magenta)] opacity-50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--neon-cyan)] opacity-50" />

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/0 via-transparent to-[var(--neon-magenta)]/0 group-hover:from-[var(--neon-cyan)]/10 group-hover:to-[var(--neon-magenta)]/10 transition-all duration-500" />

      {/* Stock badge */}
      {!product.inStock && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-destructive/90 border border-destructive mono text-xs tracking-wider">
          ESGOTADO
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[var(--muted)]/30 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--neon-cyan)_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.03]" />
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
        />
        {/* Image glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-4 relative z-10">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3 h-3 text-[var(--neon-cyan)]" />
          <span className="text-xs text-[var(--neon-cyan)] mono tracking-wider uppercase">
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-base mb-2 text-foreground group-hover:text-[var(--neon-cyan)] transition-colors line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Specs */}
        {product.specs && (
          <p className="text-xs text-muted-foreground mono mb-3 line-clamp-1">
            {product.specs}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < product.rating
                  ? 'fill-[var(--neon-orange)] text-[var(--neon-orange)]'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground mono ml-1">
            ({product.rating}.0)
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground mono mb-1">PREÇO</p>
            <p className="text-2xl font-bold text-[var(--neon-green)] drop-shadow-[0_0_10px_var(--neon-green)]">
              R$ {product.price.toLocaleString('pt-BR')}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="px-4 py-2 bg-[var(--neon-green)]/10 border-2 border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)] hover:text-background transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--neon-green)]/10 disabled:hover:text-[var(--neon-green)] relative group/btn"
          >
            <ShoppingCart className="w-5 h-5" />
            <div className="absolute inset-0 blur-lg bg-[var(--neon-green)] opacity-0 group-hover/btn:opacity-30 transition-opacity" />
          </motion.button>
        </div>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-0 group-hover:opacity-100"
        animate={{
          y: [0, 400],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}
