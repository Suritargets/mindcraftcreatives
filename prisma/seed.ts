import { PrismaClient } from "@prisma/client";
import { neon } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

const sql = neon(process.env.DATABASE_URL!);
const adapter = new PrismaNeon(sql);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================
  // CATEGORIES - Product
  // ============================================
  const productCategories = [
    {
      name: "Kleding & Hoofddeksels", slug: "kleding-hoofddeksels", icon: "tshirt",
      subs: [
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
      name: "Tassen & Rugzakken", slug: "tassen-rugzakken", icon: "bag",
      subs: [
        { name: "Tote Bags", slug: "tote-bags" },
        { name: "Rugzakken", slug: "rugzakken" },
        { name: "Koeltassen", slug: "koeltassen" },
        { name: "Sportassen", slug: "sportassen" },
        { name: "Laptoptassen", slug: "laptoptassen" },
        { name: "Shoppers", slug: "shoppers" },
      ],
    },
    {
      name: "Drinkware & Keuken", slug: "drinkware-keuken", icon: "bottle",
      subs: [
        { name: "Waterflessen", slug: "waterflessen" },
        { name: "Travel Mugs", slug: "travel-mugs" },
        { name: "Keramische Mokken", slug: "keramische-mokken" },
        { name: "Thermosflessen", slug: "thermosflessen" },
        { name: "Drinkbekers", slug: "drinkbekers" },
      ],
    },
    {
      name: "Sleutelhangers & Crafts", slug: "sleutelhangers-crafts", icon: "keychain",
      subs: [
        { name: "Acryl Sleutelhangers", slug: "acryl-sleutelhangers" },
        { name: "Metalen Sleutelhangers", slug: "metalen-sleutelhangers" },
        { name: "Rubber Sleutelhangers", slug: "rubber-sleutelhangers" },
        { name: "Polsbandjes", slug: "polsbandjes" },
        { name: "Badges & Pins", slug: "badges-pins" },
        { name: "Magneten", slug: "magneten" },
      ],
    },
    {
      name: "Kantoor & Schrijfwaren", slug: "kantoor-schrijfwaren", icon: "pen",
      subs: [
        { name: "Pennen", slug: "pennen" },
        { name: "Notitieboeken", slug: "notitieboeken" },
        { name: "Sticky Notes", slug: "sticky-notes" },
        { name: "Bureauaccessoires", slug: "bureauaccessoires" },
        { name: "Kalenders", slug: "kalenders" },
      ],
    },
    {
      name: "Tech & Gadgets", slug: "tech-gadgets", icon: "gadget",
      subs: [
        { name: "Power Banks", slug: "power-banks" },
        { name: "USB Sticks", slug: "usb-sticks" },
        { name: "Speakers", slug: "speakers" },
        { name: "Telefoonhouders", slug: "telefoonhouders" },
        { name: "Oordopjes", slug: "oordopjes" },
      ],
    },
    {
      name: "Displays & Beurzen", slug: "displays-beurzen", icon: "banner",
      subs: [
        { name: "Roll-up Banners", slug: "roll-up-banners" },
        { name: "Vlaggen", slug: "vlaggen" },
        { name: "Tafelkleden", slug: "tafelkleden" },
        { name: "Popup Displays", slug: "popup-displays" },
        { name: "Spandoeken", slug: "spandoeken" },
      ],
    },
    {
      name: "Paraplu's & Outdoor", slug: "paraplu-outdoor", icon: "umbrella",
      subs: [
        { name: "Paraplu's", slug: "paraplu" },
        { name: "Strandartikelen", slug: "strandartikelen" },
        { name: "Sportartikelen", slug: "sportartikelen" },
        { name: "Handdoeken", slug: "handdoeken" },
      ],
    },
  ];

  // Create parent categories + subcategories
  const catMap: Record<string, string> = {};

  for (const cat of productCategories) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon },
      create: { name: cat.name, slug: cat.slug, icon: cat.icon, type: "PRODUCT" },
    });
    catMap[cat.slug] = parent.id;

    for (const sub of cat.subs) {
      const child = await prisma.category.upsert({
        where: { slug: sub.slug },
        update: { name: sub.name, parentId: parent.id },
        create: { name: sub.name, slug: sub.slug, icon: cat.icon, type: "PRODUCT", parentId: parent.id },
      });
      catMap[sub.slug] = child.id;
    }
  }

  // ============================================
  // CATEGORIES - Service
  // ============================================
  const serviceCategories = [
    { name: "Ontwerp & Design", slug: "ontwerp", icon: "pen" },
    { name: "Drukwerk & Productie", slug: "drukwerk", icon: "printer" },
    { name: "Branding & Marketing", slug: "branding", icon: "badge" },
    { name: "Signage & Displays", slug: "signage", icon: "building" },
    { name: "Digitale Diensten", slug: "digitaal", icon: "globe" },
  ];

  for (const cat of serviceCategories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon },
      create: { name: cat.name, slug: cat.slug, icon: cat.icon, type: "SERVICE" },
    });
    catMap[cat.slug] = created.id;
  }

  // ============================================
  // CATEGORIES - Portfolio
  // ============================================
  const portfolioCategories = [
    { name: "Branding", slug: "pf-branding", icon: "badge" },
    { name: "Evenement", slug: "pf-evenement", icon: "star" },
    { name: "Signage", slug: "pf-signage", icon: "building" },
    { name: "Verpakking", slug: "pf-verpakking", icon: "box" },
    { name: "Digitaal", slug: "pf-digitaal", icon: "globe" },
    { name: "Drukwerk", slug: "pf-drukwerk", icon: "printer" },
  ];

  for (const cat of portfolioCategories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon },
      create: { name: cat.name, slug: cat.slug, icon: cat.icon, type: "PORTFOLIO" },
    });
    catMap[cat.slug] = created.id;
  }

  // ============================================
  // PRODUCTS
  // ============================================
  const products = [
    { name: "Custom T-Shirt Bedrukt", slug: "custom-t-shirt-bedrukt", category: "kleding-hoofddeksels", subcategory: "t-shirts", description: "100% katoen, full color bedrukking", minOrder: "50 stuks", printMethods: ["Zeefdruk", "DTG (Direct to Garment)", "Vinyl transfer", "Sublimatie (witte shirts)"], advantages: ["Hoge kwaliteit ringspun katoen", "Pre-shrunk (krimpt niet)", "Dubbel gestikte naden", "Geschikt voor industrieel wassen"], tags: ["Populair", "Bestseller"],
      specs: [
        { label: "Materiaal", values: ["100% ringspun katoen", "180 gsm"] },
        { label: "Maten", values: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
        { label: "Kleuren", values: ["Wit", "Zwart", "Navy", "Rood", "Grijs", "Koningsblauw", "Groen"] },
      ],
    },
    { name: "Polo Shirt Met Logo", slug: "polo-shirt-met-logo", category: "kleding-hoofddeksels", subcategory: "polo-shirts", description: "Geborduurd logo, diverse kleuren", minOrder: "30 stuks", printMethods: ["Borduren", "Zeefdruk", "DTG", "Heat transfer"], advantages: ["Professionele uitstraling", "Ademend piqué materiaal", "Versterkte kraag", "Ideaal voor bedrijfskleding"], tags: ["Populair"],
      specs: [
        { label: "Materiaal", values: ["65% polyester, 35% katoen", "220 gsm piqué"] },
        { label: "Maten", values: ["S", "M", "L", "XL", "2XL", "3XL"] },
        { label: "Kleuren", values: ["Wit", "Zwart", "Navy", "Bordeaux", "Koningsblauw"] },
      ],
    },
    { name: "Hoodie Met Bedrukking", slug: "hoodie-met-bedrukking", category: "kleding-hoofddeksels", subcategory: "hoodies", description: "Fleece hoodie, zeefdruk of DTG", minOrder: "25 stuks", printMethods: ["Zeefdruk", "DTG", "Borduren", "Vinyl transfer"], advantages: ["Zachte fleece binnenkant", "Kangoeroezak", "Verstelbare capuchon met koord", "Dubbel gevoerde capuchon"], tags: [],
      specs: [
        { label: "Materiaal", values: ["80% katoen, 20% polyester", "280 gsm fleece"] },
        { label: "Maten", values: ["S", "M", "L", "XL", "2XL"] },
        { label: "Kleuren", values: ["Zwart", "Navy", "Grijs Melange", "Wit", "Bordeaux"] },
      ],
    },
    { name: "Baseball Cap Custom", slug: "baseball-cap-custom", category: "kleding-hoofddeksels", subcategory: "caps-petten", description: "Geborduurde pet, verstelbaar", minOrder: "50 stuks", printMethods: ["Borduren (voorkant)", "Borduren (zijkant)", "Zeefdruk", "Patch applicatie"], advantages: ["Voorgevormde klep", "Ademende oogjes", "Universele pasvorm", "Wasbaar tot 30°C"], tags: [],
      specs: [
        { label: "Materiaal", values: ["100% katoen twill", "Gestructureerd 6-panel"] },
        { label: "Sluiting", values: ["Metalen gesp", "Klittenband", "Snapback"] },
        { label: "Kleuren", values: ["Zwart", "Wit", "Navy", "Rood", "Kaki"] },
      ],
    },
    { name: "Trucker Cap Bedrukt", slug: "trucker-cap-bedrukt", category: "kleding-hoofddeksels", subcategory: "trucker-caps", description: "Mesh back, custom design", minOrder: "50 stuks", printMethods: ["Borduren", "Sublimatie (voorkant)", "Patch applicatie"], advantages: ["Optimale ventilatie", "Retro/casual look", "Lichtgewicht", "Verstelbare snapback"], tags: [],
      specs: [
        { label: "Materiaal", values: ["Katoen voorkant, mesh achterkant"] },
        { label: "Sluiting", values: ["Snapback plastic sluiting"] },
        { label: "Kleuren", values: ["Zwart/wit", "Navy/wit", "Rood/wit", "Volledig zwart"] },
      ],
    },
    { name: "Schort Met Logo", slug: "schort-met-logo", category: "kleding-hoofddeksels", subcategory: "schorten", description: "Kookschort met bedrijfslogo", minOrder: "25 stuks", printMethods: ["Borduren", "Zeefdruk", "Heat transfer"], advantages: ["Verstelbare nekband", "Grote voorzak", "Geschikt voor horeca", "Machinewasbaar"], tags: [],
      specs: [
        { label: "Materiaal", values: ["Poly-katoen blend", "Canvas-look"] },
        { label: "Maten", values: ["One-size met verstelbare nekband"] },
        { label: "Kleuren", values: ["Zwart", "Wit", "Denim blauw", "Bordeaux"] },
      ],
    },
    // Tassen
    { name: "Katoenen Tote Bag", slug: "katoenen-tote-bag", category: "tassen-rugzakken", subcategory: "tote-bags", description: "Eco-vriendelijk, full color print", minOrder: "100 stuks", tags: ["Eco-vriendelijk"], specs: [] },
    { name: "Rugzak Met Logo", slug: "rugzak-met-logo", category: "tassen-rugzakken", subcategory: "rugzakken", description: "Duurzame rugzak, geborduurd", minOrder: "30 stuks", tags: [], specs: [] },
    { name: "Koeltas Bedrukt", slug: "koeltas-bedrukt", category: "tassen-rugzakken", subcategory: "koeltassen", description: "Isolerende koeltas met print", minOrder: "50 stuks", tags: [], specs: [] },
    { name: "Sporttas Custom", slug: "sporttas-custom", category: "tassen-rugzakken", subcategory: "sportassen", description: "Grote sporttas met logo", minOrder: "30 stuks", tags: [], specs: [] },
    // Drinkware
    { name: "RVS Waterfles", slug: "rvs-waterfles", category: "drinkware-keuken", subcategory: "waterflessen", description: "500ml, dubbelwandig, laser gegraveerd", minOrder: "50 stuks", printMethods: ["Laser gravering", "Zeefdruk", "UV full color print", "Powder coating + gravering"], advantages: ["BPA-vrij en Phthalaat-vrij", "Lekvrije schroefdop", "Zweetvrije buitenkant", "Geschikt voor koolzuurhoudende dranken"], tags: ["Premium"],
      specs: [
        { label: "Materiaal", values: ["18/8 Pro Grade roestvrij staal"] },
        { label: "Inhoud", values: ["500ml / 17oz"] },
        { label: "Afmetingen", values: ["Hoogte: 26cm", "Diameter: 6.5cm"] },
        { label: "Isolatie", values: ["Dubbelwandig vacuüm", "Warm: 12 uur", "Koud: 24 uur"] },
        { label: "Kleuren", values: ["RVS", "Mat zwart", "Wit", "Navy", "Rood", "Groen"] },
      ],
    },
    { name: "Travel Mug Thermal", slug: "travel-mug-thermal", category: "drinkware-keuken", subcategory: "travel-mugs", description: "350ml, lekvrij, full color wrap", minOrder: "50 stuks", printMethods: ["Full color wrap print", "Laser gravering", "Zeefdruk"], advantages: ["Past in standaard bekerhouders", "One-hand open/close deksel", "Dubbelwandige isolatie", "Vaatwasmachinebestendig"], tags: [],
      specs: [
        { label: "Materiaal", values: ["Dubbelwandig roestvrij staal"] },
        { label: "Inhoud", values: ["350ml / 12oz"] },
        { label: "Deksel", values: ["Slide-lock lekvrij deksel", "BPA-vrij kunststof"] },
        { label: "Kleuren", values: ["RVS", "Mat zwart", "Wit", "Rosé goud"] },
      ],
    },
    { name: "Keramische Mok Bedrukt", slug: "keramische-mok-bedrukt", category: "drinkware-keuken", subcategory: "keramische-mokken", description: "330ml, sublimatie print", minOrder: "36 stuks", tags: [], specs: [
      { label: "Materiaal", values: ["Hoogwaardig keramiek", "Polyester coating voor sublimatie"] },
      { label: "Inhoud", values: ["330ml / 11oz"] },
      { label: "Kleuren basis", values: ["Wit (standaard)", "Zwart met gekleurde binnenkant", "Tweekleurig"] },
    ] },
    { name: "Thermosfles Premium", slug: "thermosfles-premium", category: "drinkware-keuken", subcategory: "thermosflessen", description: "750ml, vacuüm geïsoleerd", minOrder: "25 stuks", tags: ["Premium"], specs: [
      { label: "Materiaal", values: ["304 roestvrij staal", "BPA-vrij"] },
      { label: "Inhoud", values: ["750ml / 25oz"] },
      { label: "Isolatie", values: ["Drievoudig vacuüm geïsoleerd", "Warm: 18 uur", "Koud: 36 uur"] },
      { label: "Kleuren", values: ["Mat zwart", "RVS", "Midnight blauw", "Forest groen", "Wit"] },
    ] },
    // Sleutelhangers
    { name: "Acryl Sleutelhanger Custom", slug: "acryl-sleutelhanger-custom", category: "sleutelhangers-crafts", subcategory: "acryl-sleutelhangers", description: "Elke vorm mogelijk, full color", minOrder: "100 stuks", tags: [], specs: [] },
    { name: "Siliconen Polsbandje", slug: "siliconen-polsbandje", category: "sleutelhangers-crafts", subcategory: "polsbandjes", description: "Bedrukt of gegraveerd, diverse kleuren", minOrder: "100 stuks", tags: [], specs: [] },
    { name: "Emaille Pin Custom", slug: "emaille-pin-custom", category: "sleutelhangers-crafts", subcategory: "badges-pins", description: "Hard of soft emaille, eigen ontwerp", minOrder: "100 stuks", tags: [], specs: [] },
    { name: "Metalen Sleutelhanger", slug: "metalen-sleutelhanger", category: "sleutelhangers-crafts", subcategory: "metalen-sleutelhangers", description: "Gegraveerd, premium kwaliteit", minOrder: "50 stuks", tags: ["Premium"], specs: [] },
    // Kantoor
    { name: "Bedrukte Pen", slug: "bedrukte-pen", category: "kantoor-schrijfwaren", subcategory: "pennen", description: "Balpen met logo, diverse kleuren", minOrder: "100 stuks", tags: ["Populair"], specs: [] },
    { name: "Notitieboek A5 Custom", slug: "notitieboek-a5-custom", category: "kantoor-schrijfwaren", subcategory: "notitieboeken", description: "Hardcover, bedrukte omslag", minOrder: "50 stuks", tags: [], specs: [] },
    { name: "Bureau Organizer", slug: "bureau-organizer", category: "kantoor-schrijfwaren", subcategory: "bureauaccessoires", description: "Bamboe organizer met gravering", minOrder: "25 stuks", tags: ["Eco-vriendelijk"], specs: [] },
    // Tech
    { name: "Power Bank 10000mAh", slug: "power-bank-10000mah", category: "tech-gadgets", subcategory: "power-banks", description: "Met bedrijfslogo, USB-C", minOrder: "50 stuks", tags: ["Nieuw"], specs: [] },
    { name: "USB Stick Custom", slug: "usb-stick-custom", category: "tech-gadgets", subcategory: "usb-sticks", description: "8GB/16GB/32GB, eigen vormgeving", minOrder: "50 stuks", tags: [], specs: [] },
    { name: "Bluetooth Speaker Mini", slug: "bluetooth-speaker-mini", category: "tech-gadgets", subcategory: "speakers", description: "Draagbaar, met logo bedrukking", minOrder: "25 stuks", tags: [], specs: [] },
    // Displays
    { name: "Roll-up Banner 85x200", slug: "roll-up-banner-85x200", category: "displays-beurzen", subcategory: "roll-up-banners", description: "Full color, incl. draagtas", minOrder: "1 stuk", tags: [], specs: [] },
    { name: "Beachflag Custom", slug: "beachflag-custom", category: "displays-beurzen", subcategory: "vlaggen", description: "Dubbelzijdig bedrukt, diverse maten", minOrder: "1 stuk", tags: [], specs: [] },
    { name: "Tafelkleed Bedrukt", slug: "tafelkleed-bedrukt", category: "displays-beurzen", subcategory: "tafelkleden", description: "Full color, stretch of standaard", minOrder: "1 stuk", tags: [], specs: [] },
    { name: "Spandoek PVC", slug: "spandoek-pvc", category: "displays-beurzen", subcategory: "spandoeken", description: "Weerbestendig, met ogen", minOrder: "1 stuk", tags: [], specs: [] },
    // Paraplu
    { name: "Paraplu Met Logo", slug: "paraplu-met-logo", category: "paraplu-outdoor", subcategory: "paraplu", description: "Automatisch, winddicht", minOrder: "25 stuks", tags: [], specs: [] },
    { name: "Strandhanddoek Bedrukt", slug: "strandhanddoek-bedrukt", category: "paraplu-outdoor", subcategory: "handdoeken", description: "Full color sublimatie", minOrder: "25 stuks", tags: [], specs: [] },
  ];

  for (const p of products) {
    const categoryId = catMap[p.category];
    if (!categoryId) { console.warn(`Category not found: ${p.category}`); continue; }

    const created = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name, description: p.description, minOrder: p.minOrder,
        categoryId, subcategory: p.subcategory,
        printMethods: p.printMethods || [], advantages: p.advantages || [], tags: p.tags || [],
      },
      create: {
        name: p.name, slug: p.slug, description: p.description, minOrder: p.minOrder,
        categoryId, subcategory: p.subcategory, status: "ACTIEF",
        printMethods: p.printMethods || [], advantages: p.advantages || [], tags: p.tags || [],
      },
    });

    // Seed specs
    if (p.specs && p.specs.length > 0) {
      await prisma.productSpec.deleteMany({ where: { productId: created.id } });
      for (let i = 0; i < p.specs.length; i++) {
        await prisma.productSpec.create({
          data: { productId: created.id, label: p.specs[i].label, values: p.specs[i].values, sortOrder: i },
        });
      }
    }
  }

  console.log(`✅ ${products.length} producten geseeded`);

  // ============================================
  // SERVICES
  // ============================================
  const services = [
    { name: "Grafisch Ontwerp", slug: "grafisch-ontwerp", category: "ontwerp", description: "Professioneel grafisch ontwerp voor al uw communicatie-uitingen.", icon: "pen", features: ["Logo ontwerp", "Visitekaartjes", "Flyers & Brochures"] },
    { name: "Logo Design", slug: "logo-design", category: "ontwerp", description: "Unieke logo's die uw merk identiteit versterken.", icon: "star", features: ["Concept ontwikkeling", "Variaties", "Stijlgids"] },
    { name: "Offsetdruk", slug: "offsetdruk", category: "drukwerk", description: "Hoogwaardig offsetdrukwerk voor grote oplages.", icon: "printer", features: ["Visitekaartjes", "Brochures", "Posters"] },
    { name: "Groot Formaat Print", slug: "groot-formaat-print", category: "drukwerk", description: "Banners, roll-ups en groot formaat printwerk.", icon: "image", features: ["Banners", "Roll-ups", "Posters"] },
    { name: "Merk Identiteit", slug: "merk-identiteit", category: "branding", description: "Complete merkidentiteit ontwikkeling voor uw bedrijf.", icon: "badge", features: ["Stijlgids", "Merkstrategie", "Huisstijl"] },
    { name: "Verpakkingsontwerp", slug: "verpakkingsontwerp", category: "branding", description: "Aantrekkelijke verpakkingen die opvallen in het schap.", icon: "box", status: "CONCEPT" as const, features: ["Product verpakking", "Label design", "Mockups"] },
    { name: "Gevel Reclame", slug: "gevel-reclame", category: "signage", description: "Opvallende gevelreclame en lichtreclame.", icon: "building", features: ["Lichtreclame", "Gevelletters", "Raambelettering"] },
    { name: "Voertuig Belettering", slug: "voertuig-belettering", category: "signage", description: "Professionele voertuigbelettering en wraps.", icon: "truck", features: ["Auto wraps", "Belettering", "Ontwerp"] },
    { name: "Social Media Design", slug: "social-media-design", category: "digitaal", description: "Visuele content voor uw social media kanalen.", icon: "phone", features: ["Post templates", "Story designs", "Advertenties"] },
    { name: "Webdesign", slug: "webdesign", category: "digitaal", description: "Moderne en responsieve websites.", icon: "globe", status: "CONCEPT" as const, features: ["Website ontwerp", "Landing pages", "UI/UX"] },
  ];

  for (const s of services) {
    const categoryId = catMap[s.category];
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: { name: s.name, description: s.description, icon: s.icon, features: s.features, categoryId },
      create: {
        name: s.name, slug: s.slug, description: s.description, icon: s.icon,
        categoryId, status: s.status || "ACTIEF", features: s.features,
      },
    });
  }
  console.log(`✅ ${services.length} diensten geseeded`);

  // ============================================
  // PORTFOLIO
  // ============================================
  const portfolioItems = [
    { title: "Rebranding Fernandes Groep", slug: "rebranding-fernandes-groep", description: "Complete merkidentiteit vernieuwing inclusief logo, huisstijl en drukwerk.", category: "pf-branding", mediaType: "SLIDER" as const, images: ["/placeholder-1.jpg", "/placeholder-2.jpg", "/placeholder-3.jpg"], status: "GEPUBLICEERD" as const, client: "Fernandes Groep N.V.", date: "2024-06", tags: ["Logo", "Huisstijl", "Drukwerk"] },
    { title: "Event Merchandise SuriPop", slug: "event-merchandise-suripop", description: "T-shirts, banners en promotional items voor SuriPop festival.", category: "pf-evenement", mediaType: "FOTO" as const, images: ["/placeholder-1.jpg"], status: "GEPUBLICEERD" as const, client: "SuriPop Foundation", date: "2024-05", tags: ["Merchandise", "Festival"] },
    { title: "Voertuig Wrap - Taxi Fleet", slug: "voertuig-wrap-taxi-fleet", description: "Volledige voertuigbelettering voor 15 taxi's in Paramaribo.", category: "pf-signage", mediaType: "VIDEO" as const, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", images: ["/placeholder-1.jpg"], status: "GEPUBLICEERD" as const, client: "Taxi Centrale Paramaribo", date: "2024-04", tags: ["Wrap", "Voertuig"] },
    { title: "Packaging Design - SuriSpice", slug: "packaging-design-surispice", description: "Verpakkingsontwerp voor nieuwe kruidenlijn.", category: "pf-verpakking", mediaType: "SLIDER" as const, images: ["/placeholder-1.jpg", "/placeholder-2.jpg"], status: "CONCEPT" as const, client: "SuriSpice N.V.", date: "2024-03", tags: ["Verpakking"] },
    { title: "Gevelreclame Restaurant Javaans", slug: "gevelreclame-restaurant-javaans", description: "LED gevelreclame en raambelettering.", category: "pf-signage", mediaType: "FOTO" as const, images: ["/placeholder-1.jpg"], status: "GEPUBLICEERD" as const, client: "Restaurant Javaans", date: "2024-02", tags: ["LED", "Gevel"] },
    { title: "Social Media Campagne TeleSur", slug: "social-media-campagne-telesur", description: "Maandelijkse social media content creatie.", category: "pf-digitaal", mediaType: "VIDEO" as const, videoUrl: "https://www.youtube.com/watch?v=example", images: ["/placeholder-1.jpg"], status: "GEPUBLICEERD" as const, client: "TeleSur N.V.", date: "2024-01", tags: ["Social Media", "Campagne"] },
  ];

  for (const p of portfolioItems) {
    const categoryId = catMap[p.category];
    await prisma.portfolioItem.upsert({
      where: { slug: p.slug },
      update: { title: p.title, description: p.description, categoryId, mediaType: p.mediaType, videoUrl: p.videoUrl, images: p.images, status: p.status, client: p.client, date: p.date, tags: p.tags },
      create: {
        title: p.title, slug: p.slug, description: p.description, categoryId,
        mediaType: p.mediaType, videoUrl: p.videoUrl, images: p.images,
        status: p.status, client: p.client, date: p.date, tags: p.tags,
      },
    });
  }
  console.log(`✅ ${portfolioItems.length} portfolio items geseeded`);

  // ============================================
  // QUOTES
  // ============================================
  const quotes = [
    { quoteNumber: "Q-001", company: "TeleSur N.V.", contact: "Ricardo Martinus", email: "r.martinus@telesur.sr", phone: "+597 8123456", status: "NIEUW" as const, items: [{ productName: "Custom T-Shirt Bedrukt", quantity: 200, notes: "Logo op voorzijde, wit" }, { productName: "Baseball Cap Custom", quantity: 100, notes: "Geborduurd logo" }] },
    { quoteNumber: "Q-002", company: "Fernandes Bottling", contact: "Samira Djoe", email: "s.djoe@fernandes.sr", phone: "+597 8654321", status: "IN_BEHANDELING" as const, internalNotes: "Klant wil sample voor goedkeuring. Levertijd bespreken - Samira belt donderdag.", items: [{ productName: "RVS Waterfles", quantity: 500, notes: "Blauw, logo gegraveerd" }, { productName: "Koeltas Bedrukt", quantity: 200 }, { productName: "Katoenen Tote Bag", quantity: 300 }] },
    { quoteNumber: "Q-003", company: "Hakrinbank", contact: "Dennis Wongsoredjo", email: "d.wong@hakrinbank.sr", phone: "+597 7112233", status: "OFFERTE_VERSTUURD" as const, internalNotes: "Offerte verstuurd op 25 maart. Follow-up gepland voor 2 april.", items: [{ productName: "Polo Shirt Met Logo", quantity: 150, notes: "Navy, geborduurd" }, { productName: "Bedrukte Pen", quantity: 500, notes: "Zilver met blauw logo" }, { productName: "Notitieboek A5 Custom", quantity: 300, notes: "Hardcover, full color omslag" }] },
    { quoteNumber: "Q-004", company: "Assuria N.V.", contact: "Michelle Blokland", email: "m.blokland@assuria.sr", phone: "+597 8998877", status: "AFGEROND" as const, internalNotes: "Afgerond en geleverd op 20 maart. Klant zeer tevreden.", items: [{ productName: "Roll-up Banner 85x200", quantity: 5, notes: "Diverse ontwerpen" }, { productName: "Tafelkleed Bedrukt", quantity: 10, notes: "Stretch, wit met logo" }] },
    { quoteNumber: "Q-005", company: "Staatsolie", contact: "Brian Soerodjmisier", email: "b.soero@staatsolie.sr", phone: "+597 7554433", status: "AFGEROND" as const, items: [{ productName: "Hoodie Met Bedrukking", quantity: 100, notes: "Zwart, groot logo achterkant" }, { productName: "Power Bank 10000mAh", quantity: 50, notes: "Met full color print" }, { productName: "Bluetooth Speaker Mini", quantity: 50 }, { productName: "USB Stick Custom", quantity: 110, notes: "16GB, custom vorm" }] },
    { quoteNumber: "Q-006", company: "Surinaamse Brouwerij", contact: "Patrick Roelofsen", email: "p.roelofsen@srbrouwerij.sr", phone: "+597 8776655", status: "IN_BEHANDELING" as const, internalNotes: "Groot evenement in mei. Snelle levering nodig.", items: [{ productName: "Custom T-Shirt Bedrukt", quantity: 1000, notes: "Diverse kleuren en maten" }, { productName: "Beachflag Custom", quantity: 500, notes: "Evenement vlaggen" }] },
    { quoteNumber: "Q-007", company: "De Surinaamsche Bank", contact: "Anita Ramdat", email: "a.ramdat@dsb.sr", phone: "+597 7221144", status: "OFFERTE_VERSTUURD" as const, items: [{ productName: "Polo Shirt Met Logo", quantity: 200 }, { productName: "Bedrukte Pen", quantity: 500 }, { productName: "Notitieboek A5 Custom", quantity: 200 }, { productName: "Paraplu Met Logo", quantity: 50 }, { productName: "Travel Mug Thermal", quantity: 50 }] },
  ];

  for (const q of quotes) {
    const existing = await prisma.quote.findUnique({ where: { quoteNumber: q.quoteNumber } });
    if (!existing) {
      await prisma.quote.create({
        data: {
          quoteNumber: q.quoteNumber, company: q.company, contact: q.contact,
          email: q.email, phone: q.phone, status: q.status,
          internalNotes: q.internalNotes,
          items: {
            create: q.items.map((item, i) => ({
              productName: item.productName, quantity: item.quantity,
              notes: item.notes, sortOrder: i,
            })),
          },
        },
      });
    }
  }
  console.log(`✅ ${quotes.length} offertes geseeded`);

  // ============================================
  // WIDGETS
  // ============================================
  const widgets = [
    { name: "WhatsApp Chat Button", type: "WHATSAPP" as const, position: "FLOATING" as const, enabled: true, config: { nummer: "+5978581854", bericht: "Hallo! Ik heb een vraag.", label: "Chat met ons", kleur: "#25D366" } },
    { name: "Offerte CTA Banner", type: "CTA_BANNER" as const, position: "FOOTER" as const, enabled: true, config: { titel: "Offerte nodig?", tekst: "Vraag vandaag nog een vrijblijvende offerte aan!", knopTekst: "Offerte Aanvragen", link: "#contact" } },
    { name: "Nieuwsbrief Aanmelding", type: "NEWSLETTER" as const, position: "FOOTER" as const, enabled: false, config: { titel: "Blijf op de hoogte", tekst: "Ontvang onze nieuwste aanbiedingen en updates.", placeholder: "Uw e-mailadres", knopTekst: "Aanmelden" } },
    { name: "Social Media Links", type: "SOCIAL" as const, position: "FOOTER" as const, enabled: true, config: { facebook: "https://www.facebook.com/mindcraftcreatives", instagram: "", whatsapp: "https://wa.me/5978581854", linkedin: "" } },
    { name: "Cookie Melding", type: "CUSTOM" as const, position: "POPUP" as const, enabled: true, config: { titel: "Cookies", tekst: "Deze website gebruikt cookies om uw ervaring te verbeteren.", knopTekst: "Accepteren", link: "/privacy" } },
  ];

  for (let i = 0; i < widgets.length; i++) {
    const w = widgets[i];
    await prisma.widget.upsert({
      where: { id: `widget-${i + 1}` },
      update: { name: w.name, type: w.type, position: w.position, enabled: w.enabled, config: w.config, sortOrder: i },
      create: { id: `widget-${i + 1}`, name: w.name, type: w.type, position: w.position, enabled: w.enabled, config: w.config, sortOrder: i },
    });
  }
  console.log(`✅ ${widgets.length} widgets geseeded`);

  // ============================================
  // COMMERCIAL AREAS
  // ============================================
  const commercialAreas = [
    { name: "Homepage Hero Banner", location: "Homepage - Boven", type: "BANNER" as const, content: "Speciale aanbieding: 20% korting op alle T-shirts!", linkUrl: "/catalogus/kleding-hoofddeksels", enabled: true },
    { name: "Catalogus Sidebar Promo", location: "Catalogus - Zijbalk", type: "SIDEBAR" as const, content: "Bulk bestelling? Vraag een offerte aan voor extra korting.", linkUrl: "/offerte", enabled: true },
    { name: "Seizoen Popup", location: "Alle pagina's", type: "POPUP" as const, content: "Kerst collectie nu beschikbaar! Bestel voor 1 december voor levering.", linkUrl: "/catalogus", enabled: false },
    { name: "Product Pagina Upsell", location: "Product Detail - Onder", type: "INLINE" as const, content: "Combineer met onze andere producten en bespaar!", linkUrl: "/catalogus", enabled: true },
  ];

  for (let i = 0; i < commercialAreas.length; i++) {
    const ca = commercialAreas[i];
    await prisma.commercialArea.upsert({
      where: { id: `ca-${i + 1}` },
      update: { name: ca.name, location: ca.location, type: ca.type, content: ca.content, linkUrl: ca.linkUrl, enabled: ca.enabled, sortOrder: i },
      create: { id: `ca-${i + 1}`, name: ca.name, location: ca.location, type: ca.type, content: ca.content, linkUrl: ca.linkUrl, enabled: ca.enabled, sortOrder: i },
    });
  }
  console.log(`✅ ${commercialAreas.length} commercial zones geseeded`);

  // ============================================
  // SETTINGS
  // ============================================
  const settings = [
    { key: "bedrijfsnaam", value: "Mindcraft Creatives", group: "bedrijf" },
    { key: "handelsnaam", value: "Mindcraft Creatives", group: "bedrijf" },
    { key: "adres", value: "Paramaribo, Suriname", group: "bedrijf" },
    { key: "email", value: "info@mindcraftcreatives.com", group: "bedrijf" },
    { key: "telefoon", value: "+597 8000000", group: "bedrijf" },
    { key: "facebookUrl", value: "https://www.facebook.com/mindcraftcreatives", group: "social" },
    { key: "instagramUrl", value: "", group: "social" },
    { key: "whatsappNummer", value: "5978581854", group: "social" },
    { key: "offertEmailOntvanger", value: "info@mindcraftcreatives.com", group: "offerte" },
    { key: "standaardLevertijdTekst", value: "7-14 werkdagen", group: "offerte" },
    { key: "betalingsvoorwaardenTekst", value: "50% aanbetaling, 50% bij levering", group: "offerte" },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: { key: s.key, value: s.value, group: s.group },
    });
  }
  console.log(`✅ ${settings.length} instellingen geseeded`);

  console.log("\n🎉 Database seeding voltooid!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
