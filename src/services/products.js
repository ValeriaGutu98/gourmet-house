import { supabase } from './supabase';

const FALLBACK_PRODUCTS = [
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    title: 'BELUGA XX',
    category: 'From the sea',
    origin: 'China',
    species: 'Huso huso',
    pearl_size: '3.3–3.5 mm',
    appearance: 'Lighter grey with pronounced marbling.',
    taste: 'Low salinity with marine mineral and cream.',
    texture: 'Silk texture.',
    images: [
      'https://gourmethouse.com/cdn/shop/files/BelugaCaviarXX_125g_Closed_84711ec7-3d65-4be4-b38e-0424939c4739_1000x.jpg?v=1766070653',
      'https://gourmethouse.com/cdn/shop/files/BelugaCaviarXX_125g_Open_a10652c4-dc82-4075-a6a8-082edaf05c53_1000x.jpg?v=1766070653'
    ],
    product_variants: [
      { id: 'v1', weight: '30g', price: 225.00 },
      { id: 'v2', weight: '50g', price: 375.00 },
      { id: 'v3', weight: '100g', price: 750.00 },
      { id: 'v4', weight: '125g', price: 937.50 },
      { id: 'v5', weight: '200g', price: 1500.00 },
      { id: 'v6', weight: '250g', price: 1875.00 },
      { id: 'v7', weight: '500g', price: 3750.00 },
      { id: 'v8', weight: '1000g', price: 7500.00 }
    ]
  },
  {
    id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    title: 'IMPERIAL OSETRA',
    category: 'From the sea',
    origin: 'Iran',
    species: 'Acipenser gueldenstaedtii',
    pearl_size: '2.9–3.2 mm',
    appearance: 'Amber gold with warm hues.',
    taste: 'Rich nuttiness with toasted oak notes.',
    texture: 'Firm and popping texture.',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800',
      'https://images.unsplash.com/photo-1599059813005-11265ba4b2ce?q=80&w=800'
    ],
    product_variants: [
      { id: 'v4', weight: '30g', price: 180.00 },
      { id: 'v5', weight: '50g', price: 290.00 },
      { id: 'v6', weight: '125g', price: 710.00 }
    ]
  },
  {
    id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    title: 'ROYAL SEVRUGA',
    category: 'From the sea',
    origin: 'Bulgaria',
    species: 'Acipenser stellatus',
    pearl_size: '2.0–2.5 mm',
    appearance: 'Platinum grey.',
    taste: 'Intense marine salinity with iodine.',
    texture: 'Creamy and melting texture.',
    images: [
      'https://images.unsplash.com/photo-1599059813005-11265ba4b2ce?q=80&w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'
    ],
    product_variants: [
      { id: 'v7', weight: '30g', price: 130.00 },
      { id: 'v8', weight: '50g', price: 210.00 },
      { id: 'v9', weight: '125g', price: 520.00 }
    ]
  }
];

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*)');

    if (error) {
      console.warn("Failed to fetch products from Supabase. Using fallback local data. Error detail:", error.message);
      return { data: FALLBACK_PRODUCTS, isFallback: true };
    }

    if (!data || data.length === 0) {
      console.log("No products found in database, using fallback data.");
      return { data: FALLBACK_PRODUCTS, isFallback: true };
    }

    return { data, isFallback: false };
  } catch (err) {
    console.warn("Unexpected error fetching products. Using fallback local data:", err);
    return { data: FALLBACK_PRODUCTS, isFallback: true };
  }
}

export async function fetchProductById(id) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.warn("Failed to fetch product from Supabase. Using fallback local data. Error detail:", error.message);
      const fallback = FALLBACK_PRODUCTS.find(p => p.id === id);
      return { data: fallback, isFallback: true };
    }

    return { data, isFallback: false };
  } catch (err) {
    console.warn("Unexpected error fetching product. Using fallback local data:", err);
    const fallback = FALLBACK_PRODUCTS.find(p => p.id === id);
    return { data: fallback, isFallback: true };
  }
}
