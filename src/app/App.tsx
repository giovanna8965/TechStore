import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch,
  Camera,
  ChevronDown,
} from "lucide-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryCard } from "./components/CategoryCard";
import { ProductCard, Product } from "./components/ProductCard";
import { Cart, CartItem } from "./components/Cart";

// Mock products data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 8999,
    image:
       "https://images.unsplash.com/photo-1696446702403-4d4ad34e0a80?w=400&h=400&fit=crop",
    category: "Smartphones",
    rating: 5,
    inStock: true,
    specs: '6.7" | A17 Pro | 256GB',
  },
  {
    id: 2,
    name: 'MacBook Pro M3 14"',
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Notebooks",
    rating: 5,
    inStock: true,
    specs: "M3 | 16GB | 512GB SSD",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?w=400&h=400&fit=crop",
    category: "Áudio",
    rating: 5,
    inStock: true,
    specs: "Noise Cancelling | 30h bateria",
  },
  {
    id: 4,
    name: "PlayStation 5 Slim",
    price: 3899,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    category: "Gaming",
    rating: 5,
    inStock: true,
    specs: "1TB SSD | 4K 120fps",
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    price: 7499,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "Smartphones",
    rating: 5,
    inStock: true,
    specs: '6.8" | Snapdragon 8 Gen 3',
  },
  {
    id: 6,
    name: "Dell XPS 15",
    price: 9999,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    category: "Notebooks",
    rating: 4,
    inStock: true,
    specs: "i7-13700H | 32GB | RTX 4060",
  },
  {
    id: 7,
    name: "AirPods Pro 2",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
    category: "Áudio",
    rating: 5,
    inStock: false,
    specs: "USB-C | Noise Cancelling",
  },
  {
    id: 8,
    name: "Xbox Series X",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    category: "Gaming",
    rating: 5,
    inStock: true,
    specs: "1TB | 4K 120fps | Ray Tracing",
  },
  {
    id: 9,
    name: "Apple Watch Ultra 2",
    price: 5299,
    image:
      "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?w=400&h=400&fit=crop",
    category: "Wearables",
    rating: 5,
    inStock: true,
    specs: "49mm | GPS + Cellular | Titanium",
  },
  {
    id: 10,
    name: "Sony A7 IV",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1606980707359-ab6fe8461800?w=400&h=400&fit=crop",
    category: "Câmeras",
    rating: 5,
    inStock: true,
    specs: "33MP | 4K 60fps | Full Frame",
  },
  {
    id: 11,
    name: "Razer Blade 15",
    price: 11999,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    category: "Gaming",
    rating: 5,
    inStock: true,
    specs: "i9-13900H | RTX 4070 | 165Hz",
  },
  {
    id: 12,
    name: "Google Pixel 8 Pro",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    category: "Smartphones",
    rating: 4,
    inStock: true,
    specs: '6.7" | Tensor G3 | 12GB',
  },
];

const CATEGORIES = [
  {
    icon: Smartphone,
    title: "Smartphones",
    count: 25,
    color: "#00ffff",
  },
  {
    icon: Laptop,
    title: "Notebooks",
    count: 18,
    color: "#ff00ff",
  },
  {
    icon: Headphones,
    title: "Áudio",
    count: 32,
    color: "#00ff88",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    count: 15,
    color: "#ffaa00",
  },
  {
    icon: Watch,
    title: "Wearables",
    count: 12,
    color: "#ff0055",
  },
  {
    icon: Camera,
    title: "Câmeras",
    count: 8,
    color: "#00ffff",
  },
];

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | null
  >(null);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "name"
  >("featured");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          p.category
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory,
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (
    id: number,
    quantity: number,
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id),
    );
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main content */}
      <main className="pt-[72px]">
        {/* Hero */}
        <Hero />

        {/* Categories */}
        <section className="max-w-[1400px] mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl mb-2">CATEGORIAS</h2>
            <p className="text-muted-foreground">
              Explore por categoria
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, i) => (
              <CategoryCard
                key={category.title}
                icon={category.icon}
                title={category.title}
                count={category.count}
                color={category.color}
                index={i}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.title
                      ? null
                      : category.title,
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="max-w-[1400px] mx-auto px-4 py-16 relative">
          {/* Section header with filters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl mb-2">
                {selectedCategory
                  ? selectedCategory.toUpperCase()
                  : "TODOS OS PRODUTOS"}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} produtos encontrados
              </p>
            </motion.div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground mono">
                ORDENAR:
              </span>
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as any)
                  }
                  className="appearance-none bg-card border border-[var(--neon-cyan)]/30 px-4 py-2 pr-10 text-sm mono cursor-pointer hover:border-[var(--neon-cyan)] focus:border-[var(--neon-cyan)] outline-none transition-all"
                >
                  <option value="featured">DESTAQUES</option>
                  <option value="price-asc">MENOR PREÇO</option>
                  <option value="price-desc">
                    MAIOR PREÇO
                  </option>
                  <option value="name">NOME</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neon-cyan)] pointer-events-none" />
              </div>

              {selectedCategory && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 border border-destructive/50 text-destructive text-sm mono hover:bg-destructive/10 transition-all"
                >
                  LIMPAR FILTRO
                </motion.button>
              )}
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  index={i}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--neon-cyan)]/30 mt-20 relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent" />

          <div className="max-w-[1400px] mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg mb-4 text-[var(--neon-cyan)]">
                  TECHSTORE
                </h3>
                <p className="text-sm text-muted-foreground">
                  A melhor loja de eletrônicos do futuro
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-sm">PRODUTOS</h4>
                <ul className="space-y-2 text-sm text-muted-foreground mono">
                  <li>Smartphones</li>
                  <li>Notebooks</li>
                  <li>Gaming</li>
                  <li>Áudio</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm">AJUDA</h4>
                <ul className="space-y-2 text-sm text-muted-foreground mono">
                  <li>Entrega</li>
                  <li>Pagamento</li>
                  <li>Garantia</li>
                  <li>Trocas</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm">CONTATO</h4>
                <ul className="space-y-2 text-sm text-muted-foreground mono">
                  <li>contato@techstore.com</li>
                  <li>(11) 9999-9999</li>
                  <li>WhatsApp</li>
                  <li>Suporte 24/7</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[var(--neon-cyan)]/20 mt-8 pt-8 text-center">
              <p className="text-sm text-muted-foreground mono">
                © 2026 TECHSTORE. Tecnologia do futuro, hoje.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Cart */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full blur-[150px] opacity-[0.03]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--neon-magenta)] rounded-full blur-[150px] opacity-[0.03]" />
      </div>
    </div>
  );
}