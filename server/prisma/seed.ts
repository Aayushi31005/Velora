import { PrismaClient } from "@prisma/client";

declare const process: { exit(code?: number): never };

const prisma = new PrismaClient();

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home", slug: "home" },
  { name: "Accessories", slug: "accessories" },
  { name: "Gaming", slug: "gaming" },
] as const;

const products = [
  {
    title: "Aurora Wireless Headphones",
    slug: "aurora-wireless-headphones",
    description:
      "Premium over-ear wireless headphones with active noise cancellation and all-day battery life.",
    price: "249.99",
    stock: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "electronics",
  },
  {
    title: "Pulse Smartwatch Pro",
    slug: "pulse-smartwatch-pro",
    description:
      "Slim smartwatch with health tracking, workout modes, and message notifications for daily use.",
    price: "199.99",
    stock: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "electronics",
  },
  {
    title: "Nova Bluetooth Speaker",
    slug: "nova-bluetooth-speaker",
    description:
      "Portable speaker with deep bass, splash resistance, and strong battery performance for travel.",
    price: "89.99",
    stock: 31,
    imageUrl:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "electronics",
  },
  {
    title: "Focus 4K Webcam",
    slug: "focus-4k-webcam",
    description:
      "Crisp 4K webcam with auto-light correction and dual microphones for meetings and streaming.",
    price: "129.99",
    stock: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1623949556303-b0d17d198863?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "electronics",
  },
  {
    title: "Everyday Premium Hoodie",
    slug: "everyday-premium-hoodie",
    description:
      "Soft brushed hoodie with a structured fit, roomy pockets, and comfortable everyday layering.",
    price: "74.00",
    stock: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "fashion",
  },
  {
    title: "Tailored Oxford Shirt",
    slug: "tailored-oxford-shirt",
    description:
      "Clean-cut oxford shirt designed for office wear, dinner plans, and polished casual outfits.",
    price: "58.00",
    stock: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "fashion",
  },
  {
    title: "Weekend Linen Dress",
    slug: "weekend-linen-dress",
    description:
      "Breathable linen-blend dress with a relaxed silhouette and elevated everyday styling.",
    price: "84.00",
    stock: 13,
    imageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "fashion",
  },
  {
    title: "CloudSoft Lounge Joggers",
    slug: "cloudsoft-lounge-joggers",
    description:
      "Stretch lounge joggers with a tapered shape, soft interior, and easy all-day comfort.",
    price: "49.99",
    stock: 26,
    imageUrl:
      "https://images.unsplash.com/photo-1506629905607-248c5b0a0f59?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "fashion",
  },
  {
    title: "Halo Ceramic Table Lamp",
    slug: "halo-ceramic-table-lamp",
    description:
      "Modern ceramic table lamp that adds warm ambient lighting and sculptural style to any room.",
    price: "79.00",
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home",
  },
  {
    title: "Drift Throw Blanket",
    slug: "drift-throw-blanket",
    description:
      "Cozy woven throw blanket with rich texture, ideal for sofas, reading nooks, and bedrooms.",
    price: "52.00",
    stock: 23,
    imageUrl:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home",
  },
  {
    title: "Aroma Diffuser Pro",
    slug: "aroma-diffuser-pro",
    description:
      "Ultrasonic diffuser with soft lighting modes and long-lasting mist for calm home environments.",
    price: "41.00",
    stock: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home",
  },
  {
    title: "Stoneware Dinner Set",
    slug: "stoneware-dinner-set",
    description:
      "Sixteen-piece stoneware dinner set with matte glaze, built for both hosting and daily meals.",
    price: "119.00",
    stock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "home",
  },
  {
    title: "Heritage Leather Backpack",
    slug: "heritage-leather-backpack",
    description:
      "Refined backpack with laptop sleeve, padded straps, and premium leather detailing for commuting.",
    price: "159.99",
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "accessories",
  },
  {
    title: "Summit Polarized Sunglasses",
    slug: "summit-polarized-sunglasses",
    description:
      "Lightweight sunglasses with polarized lenses and a timeless frame for bright outdoor days.",
    price: "68.00",
    stock: 21,
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "accessories",
  },
  {
    title: "Metro Slim Wallet",
    slug: "metro-slim-wallet",
    description:
      "Minimal leather wallet with quick-access card slots and a compact silhouette for daily carry.",
    price: "39.99",
    stock: 29,
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "accessories",
  },
  {
    title: "Chrono Steel Watch",
    slug: "chrono-steel-watch",
    description:
      "Stainless steel watch with a clean face, dependable movement, and versatile everyday styling.",
    price: "179.00",
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "accessories",
  },
  {
    title: "Apex Mechanical Keyboard",
    slug: "apex-mechanical-keyboard",
    description:
      "Responsive mechanical keyboard with tactile switches, subtle backlighting, and compact layout.",
    price: "139.99",
    stock: 17,
    imageUrl:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "gaming",
  },
  {
    title: "Titan RGB Gaming Mouse",
    slug: "titan-rgb-gaming-mouse",
    description:
      "Ergonomic gaming mouse with programmable buttons, adjustable DPI, and smooth glide feet.",
    price: "59.99",
    stock: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "gaming",
  },
  {
    title: "Vertex Gaming Chair",
    slug: "vertex-gaming-chair",
    description:
      "High-back gaming chair with lumbar support, adjustable armrests, and all-session comfort.",
    price: "289.00",
    stock: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1770195483917-b3bb444b7a29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhbWluZyUyMGNoYWlyfGVufDB8fDB8fHww",
    categorySlug: "gaming",
  },
  {
    title: "Phantom XL Mouse Pad",
    slug: "phantom-xl-mouse-pad",
    description:
      "Extended desk mat with a smooth low-friction surface and anti-slip rubber base for gaming setups.",
    price: "29.50",
    stock: 33,
    imageUrl:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=80",
    categorySlug: "gaming",
  },
] as const;

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
      },
      create: {
        name: category.name,
        slug: category.slug,
      },
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        category: {
          connect: {
            slug: product.categorySlug,
          },
        },
      },
      create: {
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
        category: {
          connect: {
            slug: product.categorySlug,
          },
        },
      },
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
