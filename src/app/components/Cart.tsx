import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l-2 border-[var(--neon-cyan)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="relative border-b border-[var(--neon-cyan)]/30 p-6">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-[var(--neon-green)]" />
                  <h2 className="text-xl">CARRINHO</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-destructive/20 border border-transparent hover:border-destructive transition-all"
                >
                  <X className="w-5 h-5 text-destructive" />
                </motion.button>
              </div>

              <p className="text-sm text-muted-foreground mono mt-2">
                {items.length} {items.length === 1 ? 'item' : 'itens'}
              </p>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Seu carrinho está vazio</p>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative group border border-[var(--neon-cyan)]/20 p-4 hover:border-[var(--neon-cyan)]/50 transition-all"
                  >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--neon-cyan)]/50" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--neon-cyan)]/50" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--neon-cyan)]/50" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--neon-cyan)]/50" />

                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 bg-muted/30 p-2 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--neon-cyan)_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.03]" />
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain relative z-10"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm mb-1 line-clamp-2">{item.name}</h4>
                        <p className="text-[var(--neon-green)] font-bold mb-2">
                          R$ {item.price.toLocaleString('pt-BR')}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 border border-[var(--neon-cyan)]/50 hover:border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 flex items-center justify-center transition-all"
                          >
                            <Minus className="w-3 h-3 text-[var(--neon-cyan)]" />
                          </motion.button>

                          <span className="w-8 text-center mono text-sm">{item.quantity}</span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-[var(--neon-cyan)]/50 hover:border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 flex items-center justify-center transition-all"
                          >
                            <Plus className="w-3 h-3 text-[var(--neon-cyan)]" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRemoveItem(item.id)}
                        className="self-start p-2 hover:bg-destructive/20 border border-transparent hover:border-destructive transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--neon-cyan)]/30 p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />

                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground mono text-sm">TOTAL</span>
                  <span className="text-3xl font-bold text-[var(--neon-green)] drop-shadow-[0_0_10px_var(--neon-green)]">
                    R$ {total.toLocaleString('pt-BR')}
                  </span>
                </div>

                {/* Checkout button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[var(--neon-green)] text-background font-bold tracking-wider relative group overflow-hidden"
                >
                  <span className="relative z-10">FINALIZAR COMPRA</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="absolute inset-0 blur-xl bg-[var(--neon-green)] opacity-50" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
