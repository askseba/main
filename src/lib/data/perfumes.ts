// Unified data layer for Ask Seba PWA
// Single source of truth for all perfume and user data

export interface Perfume {
  id: string
  name: string
  brand: string
  image: string
  score?: number // Match percentage (0-100)
  matchPercentage?: number // Alias for score
  status?: 'safe' | 'warning' | 'danger'
  price?: number
  originalPrice?: number | null
  description?: string
  isSafe?: boolean
  variant?: 'on-sale' | 'just-arrived'
}

export interface RadarDataPoint {
  label: string
  value: number
  color?: string
}

export interface UserStats {
  totalMatches: number
  savedPerfumes: number
  searches: number
  samples: number
}

// All perfumes database
export const perfumes: Perfume[] = [
  // Featured / Bestsellers
  {
    id: '1',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Bleu',
    score: 92,
    matchPercentage: 92,
    status: 'safe',
    price: 450,
    isSafe: true,
    description: 'عطر فاخر يجمع بين الحمضيات والأخشاب'
  },
  {
    id: '2',
    name: 'Aventus',
    brand: 'Creed',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Aventus',
    score: 88,
    matchPercentage: 88,
    status: 'safe',
    price: 550,
    isSafe: true,
    description: 'عطر ملكي بلمسات من الأناناس والبرغموت'
  },
  {
    id: '3',
    name: 'Oud Wood',
    brand: 'Tom Ford',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Oud',
    score: 85,
    matchPercentage: 85,
    status: 'safe',
    price: 650,
    isSafe: true,
    description: 'مزيج فاخر من العود والورد'
  },
  {
    id: '4',
    name: 'Sauvage',
    brand: 'Dior',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Sauvage',
    score: 87,
    matchPercentage: 87,
    status: 'safe',
    price: 480,
    isSafe: true,
    description: 'عطر قوي بلمسات من الفلفل والبرغموت'
  },
  {
    id: '5',
    name: 'Terre d\'Hermès',
    brand: 'Hermès',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Terre',
    score: 90,
    matchPercentage: 90,
    status: 'safe',
    price: 520,
    isSafe: true,
    description: 'عطر ترابي بلمسات من البرتقال والفلين'
  },
  
  // Disliked
  {
    id: '6',
    name: 'Flowerbomb',
    brand: 'Viktor & Rolf',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Flower',
    score: 45,
    matchPercentage: 45,
    status: 'danger',
    price: 380,
    isSafe: false,
    description: 'عطر زهري قوي قد لا يناسب الجميع'
  },
  {
    id: '7',
    name: 'Black Opium',
    brand: 'YSL',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Black',
    score: 38,
    matchPercentage: 38,
    status: 'danger',
    price: 420,
    isSafe: false,
    description: 'عطر حلو قوي بلمسات من الفانيليا والقهوة'
  },
  
  // Wishlist
  {
    id: '8',
    name: 'Noir',
    brand: 'Tom Ford',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Noir',
    score: 82,
    matchPercentage: 82,
    status: 'warning',
    price: 680,
    isSafe: true,
    variant: 'just-arrived',
    description: 'عطر ليلي فاخر بلمسات من التوابل'
  },
  {
    id: '9',
    name: 'Baccarat Rouge',
    brand: 'Maison Francis',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Baccarat',
    score: 75,
    matchPercentage: 75,
    status: 'warning',
    price: 750,
    isSafe: true,
    variant: 'just-arrived',
    description: 'عطر فاخر بلمسات من الزعفران والعنبر'
  },
  {
    id: '10',
    name: 'Santal 33',
    brand: 'Le Labo',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Santal',
    score: 88,
    matchPercentage: 88,
    status: 'safe',
    price: 620,
    isSafe: true,
    description: 'عطر خشبي بلمسات من الصندل والفانيليا'
  },
  {
    id: '11',
    name: 'Creed Aventus',
    brand: 'Creed',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Aventus2',
    score: 90,
    matchPercentage: 90,
    status: 'safe',
    price: 580,
    isSafe: true,
    description: 'نسخة محدودة من Aventus الكلاسيكي'
  },
  {
    id: '12',
    name: 'Amouage',
    brand: 'Amouage',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Amouage',
    score: 85,
    matchPercentage: 85,
    status: 'safe',
    price: 720,
    isSafe: true,
    description: 'عطر عماني فاخر بلمسات من اللبان والورد'
  },
  {
    id: '13',
    name: 'Byredo',
    brand: 'Byredo',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Byredo',
    score: 80,
    matchPercentage: 80,
    status: 'warning',
    price: 590,
    isSafe: true,
    variant: 'just-arrived',
    description: 'عطر سويدي معاصر بلمسات من الفانيليا'
  },
  {
    id: '14',
    name: 'Diptyque',
    brand: 'Diptyque',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Diptyque',
    score: 78,
    matchPercentage: 78,
    status: 'warning',
    price: 540,
    isSafe: true,
    variant: 'just-arrived',
    description: 'عطر فرنسي بلمسات من الورد والمسك'
  },
  {
    id: '15',
    name: 'Penhaligon',
    brand: 'Penhaligon',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Penhaligon',
    score: 83,
    matchPercentage: 83,
    status: 'safe',
    price: 650,
    isSafe: true,
    description: 'عطر بريطاني كلاسيكي بلمسات من الخزامى'
  },
  {
    id: '16',
    name: 'Maison Margiela',
    brand: 'MM',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=MM',
    score: 77,
    matchPercentage: 77,
    status: 'warning',
    price: 580,
    isSafe: true,
    variant: 'just-arrived',
    description: 'عطر معاصر بلمسات من الجلد والتبغ'
  },
  {
    id: '17',
    name: 'Kilian',
    brand: 'Kilian',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Kilian',
    score: 81,
    matchPercentage: 81,
    status: 'safe',
    price: 690,
    isSafe: true,
    description: 'عطر فاخر بلمسات من الفانيليا والكاكاو'
  },
  {
    id: '18',
    name: 'Roja',
    brand: 'Roja',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Roja',
    score: 79,
    matchPercentage: 79,
    status: 'warning',
    price: 850,
    isSafe: true,
    variant: 'just-arrived',
    description: 'عطر فاخر بلمسات من العود والورد'
  },
  {
    id: '19',
    name: 'Xerjoff',
    brand: 'Xerjoff',
    image: 'https://via.placeholder.com/300x400/F2F0EB/5B4233?text=Xerjoff',
    score: 84,
    matchPercentage: 84,
    status: 'safe',
    price: 780,
    isSafe: true,
    description: 'عطر إيطالي فاخر بلمسات من العود والمسك'
  }
]

// Helper functions
export function getPerfumeById(id: string): Perfume | undefined {
  return perfumes.find(p => p.id === id)
}

export function getPerfumesByStatus(status: 'safe' | 'warning' | 'danger'): Perfume[] {
  return perfumes.filter(p => p.status === status)
}

export function getFeaturedPerfumes(limit: number = 3): Perfume[] {
  return perfumes
    .filter(p => p.score && p.score >= 85)
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, limit)
}

export function getFavoritesPerfumes(): Perfume[] {
  return perfumes.filter(p => 
    ['1', '2', '3', '4', '5'].includes(p.id)
  )
}

export function getDislikedPerfumes(): Perfume[] {
  return perfumes.filter(p => 
    ['6', '7'].includes(p.id)
  )
}

export function getWishlistPerfumes(): Perfume[] {
  return perfumes.filter(p => 
    ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'].includes(p.id)
  )
}

// Radar chart data
export const defaultRadarData: RadarDataPoint[] = [
  { label: 'خشبي', value: 85 },
  { label: 'شرقي', value: 75 },
  { label: 'زهري', value: 30 },
  { label: 'حمضيات', value: 45 },
  { label: 'حار', value: 60 },
  { label: 'سويتي', value: 70 }
]

// User stats
export const defaultUserStats: UserStats = {
  totalMatches: 23,
  savedPerfumes: 12,
  searches: 45,
  samples: 3
}

// Calculate status from score
export function calculateStatus(score: number): 'safe' | 'warning' | 'danger' {
  if (score >= 90) return 'safe'
  if (score >= 80) return 'warning'
  return 'danger'
}

// Normalize perfume data (ensure score and matchPercentage are synced)
export function normalizePerfume(perfume: Perfume): Perfume {
  const score = perfume.score ?? perfume.matchPercentage ?? 0
  const matchPercentage = perfume.matchPercentage ?? perfume.score ?? 0
  
  return {
    ...perfume,
    score,
    matchPercentage,
    status: perfume.status ?? calculateStatus(score),
    isSafe: perfume.isSafe ?? score >= 80
  }
}
