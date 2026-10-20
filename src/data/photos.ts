export interface Photo {
  id: string
  src: string
  title: string
  category: string
  description: string
}

export const CATEGORIES = ['全部', '极光', '几何', '海浪', '星云'] as const

export const PHOTOS: Photo[] = [
  { id: 'aurora-1', src: 'gallery/aurora-1.jpg', title: '极光之舞', category: '极光', description: '冰原上空舞动的绿色光带' },
  { id: 'aurora-2', src: 'gallery/aurora-2.jpg', title: '夜幕光帘', category: '极光', description: '如同垂落天幕的柔光帘幕' },
  { id: 'aurora-3', src: 'gallery/aurora-3.jpg', title: '冰原绿焰', category: '极光', description: '极寒之地点燃的冷焰' },
  { id: 'aurora-4', src: 'gallery/aurora-4.jpg', title: '天际涟漪', category: '极光', description: '大气层中扩散的光之涟漪' },
  { id: 'geometry-1', src: 'gallery/geometry-1.jpg', title: '秩序 NO.7', category: '几何', description: '理性与色彩的精确排列' },
  { id: 'geometry-2', src: 'gallery/geometry-2.jpg', title: '折叠空间', category: '几何', description: '多维空间在平面上的投影' },
  { id: 'geometry-3', src: 'gallery/geometry-3.jpg', title: '黄金分割', category: '几何', description: '数学之美构筑的视觉节奏' },
  { id: 'geometry-4', src: 'gallery/geometry-4.jpg', title: '维度切片', category: '几何', description: '高维物体的一瞬截面' },
  { id: 'ocean-1', src: 'gallery/ocean-1.jpg', title: '深海回声', category: '海浪', description: '来自深渊的蓝色回响' },
  { id: 'ocean-2', src: 'gallery/ocean-2.jpg', title: '潮汐之间', category: '海浪', description: '涨落之间的时间切片' },
  { id: 'ocean-3', src: 'gallery/ocean-3.jpg', title: '蔚蓝深处', category: '海浪', description: '阳光无法抵达的静谧' },
  { id: 'ocean-4', src: 'gallery/ocean-4.jpg', title: '浪花变奏', category: '海浪', description: '波浪谱写的视觉乐章' },
  { id: 'nebula-1', src: 'gallery/nebula-1.jpg', title: '玫瑰星云', category: '星云', description: '三千光年外的浪漫' },
  { id: 'nebula-2', src: 'gallery/nebula-2.jpg', title: '尘埃摇篮', category: '星云', description: '恒星诞生前的温柔' },
  { id: 'nebula-3', src: 'gallery/nebula-3.jpg', title: '引力透镜', category: '星云', description: '时空弯曲留下的光痕' },
  { id: 'nebula-4', src: 'gallery/nebula-4.jpg', title: '恒星摇篮', category: '星云', description: '宇宙最原始的灶台' },
]
