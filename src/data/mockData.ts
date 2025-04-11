export interface GunplaProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  grade: string;
  scale: string;
  series: string;
  manufacturer: string;
  modelNumber: string;
  releaseDate?: string;
  discount?: number;
}

export const mockProducts: GunplaProduct[] = [
  {
    id: "1",
    name: "RX-78-2 Gundam",
    price: 55.00,
    image: "/images/barbatos/33tos.png",
    grade: "Master Grade",
    scale: "1/100",
    series: "Mobile Suit Gundam",
    modelNumber: "RX-78-2",
    manufacturer: "Earth Federation",
    description: "The RX-78-2 Gundam is the iconic mobile suit that started the Gundam franchise. This Master Grade kit features incredible detail and articulation, with a full inner frame and realistic proportions. The kit includes multiple weapons such as the beam rifle, beam saber, hyper bazooka, and shield. The armor features a classic white, blue, red, and yellow color scheme with panel line details. Perfect for both beginners and experienced modelers, this kit offers a satisfying build experience and impressive final display presence.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "2",
    name: "Gundam Barbatos",
    price: 45.00,
    image: "/images/barbatos/33tos.png",
    grade: "Master Grade",
    scale: "1/100",
    series: "Mobile Suit Gundam: Iron-Blooded Orphans",
    modelNumber: "ASW-G-08",
    manufacturer: "Teiwaz",
    description: "The Gundam Barbatos is the main mobile suit from Iron-Blooded Orphans, featuring a unique design that combines medieval knight aesthetics with futuristic technology. This Master Grade kit includes the iconic mace weapon, smooth articulation for dynamic poses, and detailed inner frame. The kit features a distinctive color scheme with white, blue, and red armor, along with gold accents. The Barbatos's unique Ahab Reactor system is represented through detailed back thrusters and energy conduits. Perfect for fans of the series and those looking for a unique Gundam design.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "3",
    name: "Wing Gundam Zero EW",
    price: 50.00,
    image: "/images/barbatos/33tos.png",
    grade: "Real Grade",
    scale: "1/144",
    series: "New Mobile Report Gundam Wing",
    modelNumber: "XXXG-00W0",
    manufacturer: "Operation Meteor Scientists",
    description: "The Wing Gundam Zero EW is a beautifully designed mobile suit from Gundam Wing: Endless Waltz. This Real Grade kit features the iconic angelic wings, twin buster rifles, and beam sabers. The kit includes a detailed inner frame with excellent articulation, allowing for dynamic poses with the massive wings. The white and blue color scheme is accented with gold and red details. The wings feature a unique transformation mechanism and can be displayed in both flight and folded positions. A must-have for fans of the series and collectors of unique Gundam designs.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "4",
    name: "Nu Gundam",
    price: 65.00,
    image: "/images/barbatos/33tos.png",
    grade: "Real Grade",
    scale: "1/144",
    series: "Mobile Suit Gundam: Char's Counterattack",
    modelNumber: "RX-93",
    manufacturer: "Anaheim Electronics",
    description: "The Nu Gundam is Amuro Ray's final mobile suit in Char's Counterattack, featuring the iconic psycho-frame technology and fin funnel system. This Real Grade kit includes detailed fin funnels that can be displayed in both deployed and stored positions. The kit features a sophisticated inner frame with excellent articulation, allowing for dynamic poses. The white and blue color scheme is accented with yellow and red details. The psycho-frame effect is represented through clear green parts. Perfect for fans of the Universal Century timeline and those looking for a technically impressive build.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "5",
    name: "Unicorn Gundam",
    price: 60.00,
    image: "/images/barbatos/33tos.png",
    grade: "Perfect Grade",
    scale: "1/60",
    series: "Mobile Suit Gundam Unicorn",
    modelNumber: "RX-0",
    manufacturer: "Anaheim Electronics",
    description: "The Unicorn Gundam is a revolutionary mobile suit featuring the NT-D system and psycho-frame technology. This Perfect Grade kit includes a full transformation mechanism between Unicorn and Destroy modes, with psycho-frame parts that light up in red. The kit features an incredibly detailed inner frame, multiple weapons including beam magnum and beam sabers, and excellent articulation. The white armor plates can be removed to reveal the psycho-frame underneath. Perfect for experienced modelers looking for a challenging and rewarding build with impressive display presence.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "6",
    name: "Sazabi",
    price: 75.00,
    image: "/images/barbatos/33tos.png",
    grade: "Real Grade",
    scale: "1/144",
    series: "Mobile Suit Gundam: Char's Counterattack",
    modelNumber: "MSN-04",
    manufacturer: "Neo Zeon",
    description: "The Sazabi is Char Aznable's final mobile suit, featuring a massive and imposing design with advanced technology. This Real Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including beam shot rifle, beam tomahawk, and funnels. The kit features a distinctive red color scheme with gold accents and detailed panel lines. The funnels can be displayed in both deployed and stored positions. Perfect for fans of Char's mobile suits and those looking for a challenging build with impressive presence.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "7",
    name: "Freedom Gundam",
    price: 58.00,
    image: "/images/barbatos/33tos.png",
    grade: "Master Grade",
    scale: "1/100",
    series: "Mobile Suit Gundam SEED",
    modelNumber: "ZGMF-X10A",
    manufacturer: "ZAFT",
    description: "The Freedom Gundam is Kira Yamato's second mobile suit, featuring a sleek design and powerful weaponry. This Master Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including beam rifles, rail cannons, and beam sabers. The kit features a distinctive blue and white color scheme with red and yellow accents. The wings can be displayed in both flight and folded positions. Perfect for fans of Gundam SEED and those looking for a balanced build with impressive display options.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "8",
    name: "Exia Gundam",
    price: 48.00,
    image: "/images/barbatos/33tos.png",
    grade: "Perfect Grade",
    scale: "1/60",
    series: "Mobile Suit Gundam 00",
    modelNumber: "GN-001",
    manufacturer: "Celestial Being",
    description: "The Exia Gundam is Setsuna F. Seiei's first Gundam, featuring a unique design optimized for close combat. This Perfect Grade kit includes a detailed inner frame with excellent articulation, allowing for dynamic sword-fighting poses. The kit features a distinctive blue and white color scheme with red and yellow accents. The GN Drive is represented through clear green parts that can be illuminated. Perfect for fans of Gundam 00 and those looking for a challenging build with impressive display presence.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "9",
    name: "Sinanju",
    price: 70.00,
    image: "/images/barbatos/33tos.png",
    grade: "Master Grade",
    scale: "1/100",
    series: "Mobile Suit Gundam Unicorn",
    modelNumber: "MSN-06S",
    manufacturer: "Neo Zeon",
    description: "The Sinanju is a powerful mobile suit piloted by Full Frontal, featuring a sleek and aggressive design. This Master Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including beam rifle, beam axe, and shield. The kit features a distinctive red and black color scheme with gold accents and detailed panel lines. The thrusters and verniers are represented through clear parts. Perfect for fans of Neo Zeon mobile suits and those looking for a challenging build with impressive presence.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "10",
    name: "Strike Freedom Gundam",
    price: 80.00,
    image: "/images/barbatos/33tos.png",
    grade: "Perfect Grade",
    scale: "1/60",
    series: "Mobile Suit Gundam SEED Destiny",
    modelNumber: "ZGMF-X20A",
    manufacturer: "Terminal",
    description: "The Strike Freedom Gundam is Kira Yamato's ultimate mobile suit, featuring a powerful design with dragoon system. This Perfect Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including beam rifles, dragoons, and beam sabers. The kit features a distinctive blue and white color scheme with gold accents. The dragoons can be displayed in both deployed and stored positions. Perfect for fans of Gundam SEED Destiny and those looking for a challenging build with impressive display options.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "11",
    name: "Destiny Gundam",
    price: 62.00,
    image: "/images/barbatos/33tos.png",
    grade: "Master Grade",
    scale: "1/100",
    series: "Mobile Suit Gundam SEED Destiny",
    modelNumber: "ZGMF-X42S",
    manufacturer: "ZAFT",
    description: "The Destiny Gundam is Shinn Asuka's final mobile suit, featuring a powerful design with wings of light. This Master Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including beam rifle, beam boomerang, and beam sabers. The kit features a distinctive red and black color scheme with gold accents. The wings of light are represented through clear parts that can be illuminated. Perfect for fans of Gundam SEED Destiny and those looking for a balanced build with impressive display options.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "12",
    name: "00 Raiser",
    price: 68.00,
    image: "/images/barbatos/33tos.png",
    grade: "Real Grade",
    scale: "1/144",
    series: "Mobile Suit Gundam 00",
    modelNumber: "GN-0000+GNR-010",
    manufacturer: "Celestial Being",
    description: "The 00 Raiser is Setsuna F. Seiei's final Gundam, featuring a unique design with twin drive system and raiser unit. This Real Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including GN swords and beam rifles. The kit features a distinctive blue and white color scheme with red accents. The GN particles are represented through clear green parts. Perfect for fans of Gundam 00 and those looking for a challenging build with impressive display options.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "13",
    name: "Astray Red Frame",
    price: 52.00,
    image: "/images/barbatos/33tos.png",
    grade: "Master Grade",
    scale: "1/100",
    series: "Mobile Suit Gundam SEED Astray",
    modelNumber: "MBF-P02",
    manufacturer: "Orb Union",
    description: "The Astray Red Frame is a unique mobile suit featuring a distinctive design with katana. This Master Grade kit includes detailed inner frame, excellent articulation, and a full complement of weapons including beam rifle and katana. The kit features a distinctive red and white color scheme with gold accents. The katana can be displayed in both sheathed and unsheathed positions. Perfect for fans of Gundam SEED Astray and those looking for a balanced build with impressive display options.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "14",
    name: "Banshee Norn",
    price: 72.00,
    image: "/images/barbatos/33tos.png",
    grade: "Perfect Grade",
    scale: "1/60",
    series: "Mobile Suit Gundam Unicorn",
    modelNumber: "RX-0[N]",
    manufacturer: "Earth Federation",
    description: "The Banshee Norn is the upgraded version of the Unicorn Gundam Unit 2, featuring a unique design with psycho-frame technology. This Perfect Grade kit includes a full transformation mechanism between Unicorn and Destroy modes, with psycho-frame parts that light up in gold. The kit features an incredibly detailed inner frame, multiple weapons including beam magnum and beam sabers, and excellent articulation. The black armor plates can be removed to reveal the psycho-frame underneath. Perfect for experienced modelers looking for a challenging and rewarding build with impressive display presence.",
    category: "Gundam",
    stock: 10
  },
  {
    id: "15",
    name: "Hi-Nu Gundam",
    price: 85.00,
    image: "/images/barbatos/33tos.png",
    grade: "Real Grade",
    scale: "1/144",
    series: "Mobile Suit Gundam: Char's Counterattack - Beltorchika's Children",
    modelNumber: "RX-93-ν2",
    manufacturer: "Anaheim Electronics",
    description: "The Hi-Nu Gundam is an upgraded version of the Nu Gundam, featuring a unique design with fin funnel system. This Real Grade kit includes detailed fin funnels that can be displayed in both deployed and stored positions. The kit features a sophisticated inner frame with excellent articulation, allowing for dynamic poses. The white and blue color scheme is accented with yellow and red details. The psycho-frame effect is represented through clear green parts. Perfect for fans of the Universal Century timeline and those looking for a technically impressive build.",
    category: "Gundam",
    stock: 10
  }
]; 