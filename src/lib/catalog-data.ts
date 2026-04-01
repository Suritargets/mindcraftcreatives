export type SubCategory = {
  name: string;
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
  icon: string;
  subcategories: SubCategory[];
};

export type ProductSpec = {
  label: string;
  values: string[];
};

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  minOrder: string;
  specs?: ProductSpec[];
  printMethods?: string[];
  advantages?: string[];
};

export const categories: Category[] = [
  {
    name: "Kleding & Hoofddeksels",
    slug: "kleding-hoofddeksels",
    icon: "tshirt",
    subcategories: [
      { name: "T-Shirts", slug: "t-shirts" },
      { name: "Polo Shirts", slug: "polo-shirts" },
      { name: "Hoodies", slug: "hoodies" },
      { name: "Caps & Petten", slug: "caps-petten" },
      { name: "Trucker Caps", slug: "trucker-caps" },
      { name: "Bucket Hats", slug: "bucket-hats" },
      { name: "Schorten", slug: "schorten" },
      { name: "Veiligheidsvesten", slug: "veiligheidsvesten" },
    ],
  },
  {
    name: "Tassen & Rugzakken",
    slug: "tassen-rugzakken",
    icon: "bag",
    subcategories: [
      { name: "Tote Bags", slug: "tote-bags" },
      { name: "Rugzakken", slug: "rugzakken" },
      { name: "Koeltassen", slug: "koeltassen" },
      { name: "Sportassen", slug: "sportassen" },
      { name: "Laptoptassen", slug: "laptoptassen" },
      { name: "Shoppers", slug: "shoppers" },
    ],
  },
  {
    name: "Drinkware & Keuken",
    slug: "drinkware-keuken",
    icon: "bottle",
    subcategories: [
      { name: "Waterflessen", slug: "waterflessen" },
      { name: "Travel Mugs", slug: "travel-mugs" },
      { name: "Keramische Mokken", slug: "keramische-mokken" },
      { name: "Thermosflessen", slug: "thermosflessen" },
      { name: "Drinkbekers", slug: "drinkbekers" },
    ],
  },
  {
    name: "Sleutelhangers & Crafts",
    slug: "sleutelhangers-crafts",
    icon: "keychain",
    subcategories: [
      { name: "Acryl Sleutelhangers", slug: "acryl-sleutelhangers" },
      { name: "Metalen Sleutelhangers", slug: "metalen-sleutelhangers" },
      { name: "Rubber Sleutelhangers", slug: "rubber-sleutelhangers" },
      { name: "Polsbandjes", slug: "polsbandjes" },
      { name: "Badges & Pins", slug: "badges-pins" },
      { name: "Magneten", slug: "magneten" },
    ],
  },
  {
    name: "Kantoor & Schrijfwaren",
    slug: "kantoor-schrijfwaren",
    icon: "pen",
    subcategories: [
      { name: "Pennen", slug: "pennen" },
      { name: "Notitieboeken", slug: "notitieboeken" },
      { name: "Sticky Notes", slug: "sticky-notes" },
      { name: "Bureauaccessoires", slug: "bureauaccessoires" },
      { name: "Kalenders", slug: "kalenders" },
    ],
  },
  {
    name: "Tech & Gadgets",
    slug: "tech-gadgets",
    icon: "gadget",
    subcategories: [
      { name: "Power Banks", slug: "power-banks" },
      { name: "USB Sticks", slug: "usb-sticks" },
      { name: "Speakers", slug: "speakers" },
      { name: "Telefoonhouders", slug: "telefoonhouders" },
      { name: "Oordopjes", slug: "oordopjes" },
    ],
  },
  {
    name: "Displays & Beurzen",
    slug: "displays-beurzen",
    icon: "banner",
    subcategories: [
      { name: "Roll-up Banners", slug: "roll-up-banners" },
      { name: "Vlaggen", slug: "vlaggen" },
      { name: "Tafelkleden", slug: "tafelkleden" },
      { name: "Popup Displays", slug: "popup-displays" },
      { name: "Spandoeken", slug: "spandoeken" },
    ],
  },
  {
    name: "Paraplu's & Outdoor",
    slug: "paraplu-outdoor",
    icon: "umbrella",
    subcategories: [
      { name: "Paraplu's", slug: "paraplu" },
      { name: "Strandartikelen", slug: "strandartikelen" },
      { name: "Sportartikelen", slug: "sportartikelen" },
      { name: "Handdoeken", slug: "handdoeken" },
    ],
  },
];

// Quick-access icon categories (top row like yahik.com)
export const quickCategories = [
  { name: "Pennen", slug: "pennen", icon: "pen" },
  { name: "Notitieboeken", slug: "notitieboeken", icon: "notebook" },
  { name: "Tote Bags", slug: "tote-bags", icon: "bag" },
  { name: "Waterflessen", slug: "waterflessen", icon: "bottle" },
  { name: "Rugzakken", slug: "rugzakken", icon: "backpack" },
  { name: "Paraplu's", slug: "paraplu", icon: "umbrella" },
  { name: "Travel Mugs", slug: "travel-mugs", icon: "mug" },
  { name: "Mokken", slug: "keramische-mokken", icon: "ceramicmug" },
  { name: "T-Shirts", slug: "t-shirts", icon: "tshirt" },
  { name: "Sleutelhangers", slug: "acryl-sleutelhangers", icon: "keychain" },
  { name: "Koeltassen", slug: "koeltassen", icon: "coolerbag" },
  { name: "Hoodies", slug: "hoodies", icon: "hoodie" },
  { name: "Schorten", slug: "schorten", icon: "apron" },
  { name: "Power Banks", slug: "power-banks", icon: "gadget" },
  { name: "Promo Ideeën", slug: "promo-ideeen", icon: "idea" },
];

export const products: Product[] = [
  // Kleding
  {
    id: "p1", name: "Custom T-Shirt Bedrukt", category: "kleding-hoofddeksels", subcategory: "t-shirts",
    description: "100% katoen, full color bedrukking",
    minOrder: "50 stuks",
    specs: [
      { label: "Materiaal", values: ["100% ringspun katoen", "180 gsm"] },
      { label: "Maten", values: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
      { label: "Kleuren", values: ["Wit", "Zwart", "Navy", "Rood", "Grijs", "Koningsblauw", "Groen"] },
    ],
    printMethods: ["Zeefdruk", "DTG (Direct to Garment)", "Vinyl transfer", "Sublimatie (witte shirts)"],
    advantages: ["Hoge kwaliteit ringspun katoen", "Pre-shrunk (krimpt niet)", "Dubbel gestikte naden", "Geschikt voor industrieel wassen"],
  },
  {
    id: "p2", name: "Polo Shirt Met Logo", category: "kleding-hoofddeksels", subcategory: "polo-shirts",
    description: "Geborduurd logo, diverse kleuren",
    minOrder: "30 stuks",
    specs: [
      { label: "Materiaal", values: ["65% polyester, 35% katoen", "220 gsm piqué"] },
      { label: "Maten", values: ["S", "M", "L", "XL", "2XL", "3XL"] },
      { label: "Kleuren", values: ["Wit", "Zwart", "Navy", "Bordeaux", "Koningsblauw"] },
    ],
    printMethods: ["Borduren", "Zeefdruk", "DTG", "Heat transfer"],
    advantages: ["Professionele uitstraling", "Ademend piqué materiaal", "Versterkte kraag", "Ideaal voor bedrijfskleding"],
  },
  {
    id: "p3", name: "Hoodie Met Bedrukking", category: "kleding-hoofddeksels", subcategory: "hoodies",
    description: "Fleece hoodie, zeefdruk of DTG",
    minOrder: "25 stuks",
    specs: [
      { label: "Materiaal", values: ["80% katoen, 20% polyester", "280 gsm fleece"] },
      { label: "Maten", values: ["S", "M", "L", "XL", "2XL"] },
      { label: "Kleuren", values: ["Zwart", "Navy", "Grijs Melange", "Wit", "Bordeaux"] },
    ],
    printMethods: ["Zeefdruk", "DTG", "Borduren", "Vinyl transfer"],
    advantages: ["Zachte fleece binnenkant", "Kangoeroezak", "Verstelbare capuchon met koord", "Dubbel gevoerde capuchon"],
  },
  { id: "p4", name: "Baseball Cap Custom", category: "kleding-hoofddeksels", subcategory: "caps-petten", description: "Geborduurde pet, verstelbaar", minOrder: "50 stuks",
    specs: [
      { label: "Materiaal", values: ["100% katoen twill", "Gestructureerd 6-panel"] },
      { label: "Sluiting", values: ["Metalen gesp", "Klittenband", "Snapback"] },
      { label: "Kleuren", values: ["Zwart", "Wit", "Navy", "Rood", "Kaki"] },
    ],
    printMethods: ["Borduren (voorkant)", "Borduren (zijkant)", "Zeefdruk", "Patch applicatie"],
    advantages: ["Voorgevormde klep", "Ademende oogjes", "Universele pasvorm", "Wasbaar tot 30°C"],
  },
  { id: "p5", name: "Trucker Cap Bedrukt", category: "kleding-hoofddeksels", subcategory: "trucker-caps", description: "Mesh back, custom design", minOrder: "50 stuks",
    specs: [
      { label: "Materiaal", values: ["Katoen voorkant, mesh achterkant"] },
      { label: "Sluiting", values: ["Snapback plastic sluiting"] },
      { label: "Kleuren", values: ["Zwart/wit", "Navy/wit", "Rood/wit", "Volledig zwart"] },
    ],
    printMethods: ["Borduren", "Sublimatie (voorkant)", "Patch applicatie"],
    advantages: ["Optimale ventilatie", "Retro/casual look", "Lichtgewicht", "Verstelbare snapback"],
  },
  { id: "p6", name: "Schort Met Logo", category: "kleding-hoofddeksels", subcategory: "schorten", description: "Kookschort met bedrijfslogo", minOrder: "25 stuks",
    specs: [
      { label: "Materiaal", values: ["Poly-katoen blend", "Canvas-look"] },
      { label: "Maten", values: ["One-size met verstelbare nekband"] },
      { label: "Kleuren", values: ["Zwart", "Wit", "Denim blauw", "Bordeaux"] },
    ],
    printMethods: ["Borduren", "Zeefdruk", "Heat transfer"],
    advantages: ["Verstelbare nekband", "Grote voorzak", "Geschikt voor horeca", "Machinewasbaar"],
  },
  // Tassen
  { id: "p7", name: "Katoenen Tote Bag", category: "tassen-rugzakken", subcategory: "tote-bags", description: "Eco-vriendelijk, full color print", minOrder: "100 stuks" },
  { id: "p8", name: "Rugzak Met Logo", category: "tassen-rugzakken", subcategory: "rugzakken", description: "Duurzame rugzak, geborduurd", minOrder: "30 stuks" },
  { id: "p9", name: "Koeltas Bedrukt", category: "tassen-rugzakken", subcategory: "koeltassen", description: "Isolerende koeltas met print", minOrder: "50 stuks" },
  { id: "p10", name: "Sporttas Custom", category: "tassen-rugzakken", subcategory: "sportassen", description: "Grote sporttas met logo", minOrder: "30 stuks" },
  // Drinkware
  {
    id: "p11", name: "RVS Waterfles", category: "drinkware-keuken", subcategory: "waterflessen",
    description: "500ml, dubbelwandig, laser gegraveerd",
    minOrder: "50 stuks",
    specs: [
      { label: "Materiaal", values: ["18/8 Pro Grade roestvrij staal"] },
      { label: "Inhoud", values: ["500ml / 17oz"] },
      { label: "Afmetingen", values: ["Hoogte: 26cm", "Diameter: 6.5cm"] },
      { label: "Isolatie", values: ["Dubbelwandig vacuüm", "Warm: 12 uur", "Koud: 24 uur"] },
      { label: "Kleuren", values: ["RVS", "Mat zwart", "Wit", "Navy", "Rood", "Groen"] },
    ],
    printMethods: ["Laser gravering", "Zeefdruk", "UV full color print", "Powder coating + gravering"],
    advantages: ["BPA-vrij en Phthalaat-vrij", "Lekvrije schroefdop", "Zweetvrije buitenkant", "Geschikt voor koolzuurhoudende dranken"],
  },
  {
    id: "p12", name: "Travel Mug Thermal", category: "drinkware-keuken", subcategory: "travel-mugs",
    description: "350ml, lekvrij, full color wrap",
    minOrder: "50 stuks",
    specs: [
      { label: "Materiaal", values: ["Dubbelwandig roestvrij staal"] },
      { label: "Inhoud", values: ["350ml / 12oz"] },
      { label: "Deksel", values: ["Slide-lock lekvrij deksel", "BPA-vrij kunststof"] },
      { label: "Kleuren", values: ["RVS", "Mat zwart", "Wit", "Rosé goud"] },
    ],
    printMethods: ["Full color wrap print", "Laser gravering", "Zeefdruk"],
    advantages: ["Past in standaard bekerhouders", "One-hand open/close deksel", "Dubbelwandige isolatie", "Vaatwasmachinebestendig (handwas aanbevolen)"],
  },
  {
    id: "p13", name: "Keramische Mok Bedrukt", category: "drinkware-keuken", subcategory: "keramische-mokken",
    description: "330ml, sublimatie print",
    minOrder: "36 stuks",
    specs: [
      { label: "Materiaal", values: ["Hoogwaardig keramiek", "Polyester coating voor sublimatie"] },
      { label: "Inhoud", values: ["330ml / 11oz"] },
      { label: "Kleuren basis", values: ["Wit (standaard)", "Zwart met gekleurde binnenkant", "Tweekleurig"] },
    ],
    printMethods: ["Sublimatie (full wrap)", "Zeefdruk", "UV print"],
    advantages: ["Vaatwasmachinebestendig", "Magnetronbestendig", "Levendige full-color print", "Krasvaste afbeelding"],
  },
  {
    id: "p14", name: "Thermosfles Premium", category: "drinkware-keuken", subcategory: "thermosflessen",
    description: "750ml, vacuüm geïsoleerd",
    minOrder: "25 stuks",
    specs: [
      { label: "Materiaal", values: ["304 roestvrij staal", "BPA-vrij"] },
      { label: "Inhoud", values: ["750ml / 25oz"] },
      { label: "Isolatie", values: ["Drievoudig vacuüm geïsoleerd", "Warm: 18 uur", "Koud: 36 uur"] },
      { label: "Kleuren", values: ["Mat zwart", "RVS", "Midnight blauw", "Forest groen", "Wit"] },
    ],
    printMethods: ["Laser gravering", "UV full color print", "Powder coating + gravering", "Zeefdruk"],
    advantages: ["Premium geschenkkwaliteit", "Extra grote opening voor ijsblokjes", "Anti-slip bodem", "Levenslange garantie op isolatie"],
  },
  // Sleutelhangers & Crafts
  { id: "p15", name: "Acryl Sleutelhanger Custom", category: "sleutelhangers-crafts", subcategory: "acryl-sleutelhangers", description: "Elke vorm mogelijk, full color", minOrder: "100 stuks" },
  { id: "p16", name: "Siliconen Polsbandje", category: "sleutelhangers-crafts", subcategory: "polsbandjes", description: "Bedrukt of gegraveerd, diverse kleuren", minOrder: "100 stuks" },
  { id: "p17", name: "Emaille Pin Custom", category: "sleutelhangers-crafts", subcategory: "badges-pins", description: "Hard of soft emaille, eigen ontwerp", minOrder: "100 stuks" },
  { id: "p18", name: "Metalen Sleutelhanger", category: "sleutelhangers-crafts", subcategory: "metalen-sleutelhangers", description: "Gegraveerd, premium kwaliteit", minOrder: "50 stuks" },
  // Kantoor
  { id: "p19", name: "Bedrukte Pen", category: "kantoor-schrijfwaren", subcategory: "pennen", description: "Balpen met logo, diverse kleuren", minOrder: "100 stuks" },
  { id: "p20", name: "Notitieboek A5 Custom", category: "kantoor-schrijfwaren", subcategory: "notitieboeken", description: "Hardcover, bedrukte omslag", minOrder: "50 stuks" },
  { id: "p21", name: "Bureau Organizer", category: "kantoor-schrijfwaren", subcategory: "bureauaccessoires", description: "Bamboe organizer met gravering", minOrder: "25 stuks" },
  // Tech
  { id: "p22", name: "Power Bank 10000mAh", category: "tech-gadgets", subcategory: "power-banks", description: "Met bedrijfslogo, USB-C", minOrder: "50 stuks" },
  { id: "p23", name: "USB Stick Custom", category: "tech-gadgets", subcategory: "usb-sticks", description: "8GB/16GB/32GB, eigen vormgeving", minOrder: "50 stuks" },
  { id: "p24", name: "Bluetooth Speaker Mini", category: "tech-gadgets", subcategory: "speakers", description: "Draagbaar, met logo bedrukking", minOrder: "25 stuks" },
  // Displays
  { id: "p25", name: "Roll-up Banner 85x200", category: "displays-beurzen", subcategory: "roll-up-banners", description: "Full color, incl. draagtas", minOrder: "1 stuk" },
  { id: "p26", name: "Beachflag Custom", category: "displays-beurzen", subcategory: "vlaggen", description: "Dubbelzijdig bedrukt, diverse maten", minOrder: "1 stuk" },
  { id: "p27", name: "Tafelkleed Bedrukt", category: "displays-beurzen", subcategory: "tafelkleden", description: "Full color, stretch of standaard", minOrder: "1 stuk" },
  { id: "p28", name: "Spandoek PVC", category: "displays-beurzen", subcategory: "spandoeken", description: "Weerbestendig, met ogen", minOrder: "1 stuk" },
  // Paraplu
  { id: "p29", name: "Paraplu Met Logo", category: "paraplu-outdoor", subcategory: "paraplu", description: "Automatisch, winddicht", minOrder: "25 stuks" },
  { id: "p30", name: "Strandhanddoek Bedrukt", category: "paraplu-outdoor", subcategory: "handdoeken", description: "Full color sublimatie", minOrder: "25 stuks" },
];
