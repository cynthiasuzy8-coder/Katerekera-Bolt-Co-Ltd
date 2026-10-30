export interface MaterialProduct {
  id: string;
  name: string;
  category: 'hardware' | 'steel' | 'cement' | 'timber' | 'roofing';
  categoryLabel: string;
  sku: string;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  dimensions: string;
  grade: string;
  material: string;
  standard: string;
  price: number;
  unit: string;
  minOrder: number;
  stockStatus: 'In Stock' | 'Ready for Mill Dispatch' | 'Contractor Order';
  stockQty: string;
  leadTime: string;
  image: string;
  specs: { label: string; value: string }[];
  applications: string[];
  recommendedAccessories: string[];
  badge?: string;
  popular?: boolean;
}

export interface QuoteItem {
  product: MaterialProduct;
  quantity: number;
  notes?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'All Materials', count: 20 },
  { id: 'hardware', label: 'Hardware & Fasteners', count: 6 },
  { id: 'steel', label: 'Structural Steel', count: 5 },
  { id: 'cement', label: 'Cement & Aggregates', count: 4 },
  { id: 'timber', label: 'Timber & Formwork', count: 3 },
  { id: 'roofing', label: 'Roofing & Cladding', count: 2 },
] as const;

export const PRODUCTS: MaterialProduct[] = [
  // HARDWARE & FASTENERS (HALLMARK SPECIALTY)
  {
    id: 'bolt-m16-hex-88',
    name: 'Grade 8.8 High-Tensile Structural Hex Bolts',
    category: 'hardware',
    categoryLabel: 'Hardware & Fasteners',
    sku: 'KBC-BLT-88-M16',
    shortDesc: 'Heavy-duty high-tensile structural hexagonal head bolts with matching class 8 nuts and hardened washers for steel framing and civil joints.',
    fullDesc: 'Manufactured from heat-treated alloy steel, our Grade 8.8 structural hex bolts are engineered for heavy structural steelwork, bridge construction, tower erection, and industrial equipment anchoring. Delivers outstanding tensile endurance under dynamic cyclic loading.',
    keyFeatures: [
      'Minimum tensile strength of 800 N/mm²',
      'Yield strength rating of 640 N/mm²',
      'Corrosion-resistant black oxide / zinc trivalent passivation',
      'Class 8 heavy hex nuts with hardened flat washers included',
      'Mill test certificates (MTC) supplied with every batch'
    ],
    dimensions: 'M16 x 80mm (Lengths M12 to M36 available: 40mm - 220mm)',
    grade: 'Grade 8.8 High-Tensile Structural',
    material: 'Quenched & Tempered Medium Carbon Alloy Steel',
    standard: 'DIN 931 / DIN 933 / ISO 4014 / BS 3692',
    price: 1.45,
    unit: 'per piece',
    minOrder: 50,
    stockStatus: 'In Stock',
    stockQty: '18,500 pcs in Central Yard',
    leadTime: 'Immediate Dispatch (Same Day)',
    image: '/src/assets/images/product_industrial_hex_bolts_1793391598896.jpg',
    badge: 'Flagship Item',
    popular: true,
    specs: [
      { label: 'Tensile Strength', value: '800 MPa (116,000 psi)' },
      { label: 'Yield Strength', value: '640 MPa' },
      { label: 'Thread Pitch', value: '2.0mm Coarse Metric' },
      { label: 'Surface Finish', value: 'Zinc Electroplated / Black Oxide' },
      { label: 'Hardness (HRC)', value: '22 - 32 HRC' },
      { label: 'Standard Pack', value: '100 pcs per reinforced carton' }
    ],
    applications: [
      'Structural steel beam-to-column connections',
      'Heavy machinery mounting and base plates',
      'Telecom mast and transmission tower rigging',
      'Precast bridge segment joints'
    ],
    recommendedAccessories: ['Grade 8 Hardened Washers', 'Thread Locker Compound', 'Nyloc Anti-Vibration Nuts']
  },
  {
    id: 'bolt-wedge-anchor-m12',
    name: 'Heavy-Duty Through-Bolt Wedge Anchors',
    category: 'hardware',
    categoryLabel: 'Hardware & Fasteners',
    sku: 'KBC-ANC-WDG-M12',
    shortDesc: 'Torque-controlled expansion anchors for cracked and uncracked concrete foundations, heavy base plates, and structural brackets.',
    fullDesc: 'Katerekera heavy-duty expansion wedge anchors provide uncompromising pull-out resistance in reinforced concrete. Features a 360-degree expanding clip that locks securely into hole walls upon tightening the hex nut.',
    keyFeatures: [
      'ETA Option 1 approved for cracked & uncracked structural concrete',
      'High-shear and high-tension load capacity',
      'Zinc electroplated with 5μm minimum coating thickness',
      'Pre-assembled with nut and DIN 125 washer',
      'Depth mark stamped on sleeve for visual inspection'
    ],
    dimensions: 'M12 x 120mm (Embedment: 75mm)',
    grade: 'Class 5.8 Cold-Formed Carbon Steel',
    material: 'Cold-Drawn Carbon Steel with Stainless Expansion Clip',
    standard: 'ETA-01/0014 / DIN 125 / ISO 7089',
    price: 2.10,
    unit: 'per piece',
    minOrder: 25,
    stockStatus: 'In Stock',
    stockQty: '6,200 pcs',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/product_industrial_hex_bolts_1793391598896.jpg',
    badge: 'Heavy Anchor',
    popular: true,
    specs: [
      { label: 'Hole Diameter', value: '12mm' },
      { label: 'Min. Hole Depth', value: '85mm' },
      { label: 'Char. Tension Resistance', value: '24.2 kN (C20/25 Concrete)' },
      { label: 'Char. Shear Resistance', value: '18.9 kN' },
      { label: 'Tightening Torque', value: '50 Nm' }
    ],
    applications: [
      'Structural column base plate anchorage',
      'Scaffolding wall tie-in fixings',
      'Elevator guide rails and heavy gantry cranes',
      'HVAC chiller and plant room platform fixings'
    ],
    recommendedAccessories: ['SDS-Plus 12mm Hammer Drill Bits', 'Blow-Out Dust Pump', 'Calibrated Torque Wrench']
  },
  {
    id: 'fastener-tek-roofing-screws',
    name: 'Class 3 Self-Drilling Hex Tek Screws with EPDM Washers',
    category: 'hardware',
    categoryLabel: 'Hardware & Fasteners',
    sku: 'KBC-FST-TEK-65',
    shortDesc: 'High-speed self-drilling carbon steel screws with bonded EPDM weather-seal vulcanized washers for metal roofing and purlin fastening.',
    fullDesc: 'Engineered for rapid, watertight fastening of IBR, corrugated, and standing-seam roofing profiles directly into timber purlins or heavy gauge steel beams up to 6mm thickness without pre-drilling.',
    keyFeatures: [
      'Self-drilling hardened drill point (No. 3 & No. 5 points)',
      '16mm vulcanized EPDM washer ensures 100% leakproof seal',
      'Class 3 Ruspert ceramic multi-layer coating resists UV and acid rain',
      '8mm (5/16") magnetic hex drive head prevents cam-out',
      'Salt spray tested exceeding 1,000 hours'
    ],
    dimensions: '12-14 x 65mm (50mm to 100mm lengths in stock)',
    grade: 'Case-Hardened Carbon Steel AISI 1022',
    material: 'Heat-Treated Carbon Steel with Ruspert Coating',
    standard: 'AS 3566.2 / DIN 7504-K',
    price: 0.18,
    unit: 'per piece',
    minOrder: 250,
    stockStatus: 'In Stock',
    stockQty: '120,000 pcs in Stock',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/product_roofing_sheets_fasteners_1793391599776.jpg',
    badge: 'Roofing Essential',
    popular: true,
    specs: [
      { label: 'Drilling Capacity', value: 'Up to 6.0mm mild steel' },
      { label: 'Head Style', value: 'Indented Hex Washer Head (5/16")' },
      { label: 'Coating', value: 'Ruspert 1000 Hr Anti-Corrosion' },
      { label: 'Washer', value: 'Bonded Galvanized Steel + EPDM' },
      { label: 'Packaging', value: 'Box of 500 pcs / Bucket of 2,500 pcs' }
    ],
    applications: [
      'IBR and corrugated profile roofing sheets',
      'Side cladding and sandwich wall panels',
      'Steel truss framing and cold-rolled purlins',
      'Ridge cap and gutter flashing installation'
    ],
    recommendedAccessories: ['5/16" Magnetic Nutsetter Socket', 'Silicone Roof Sealant', 'EPDM Replacement Washers']
  },
  {
    id: 'hardware-threaded-rod-88',
    name: 'All-Thread Continuous High-Tensile Rods (Grade 8.8)',
    category: 'hardware',
    categoryLabel: 'Hardware & Fasteners',
    sku: 'KBC-ROD-88-M20',
    shortDesc: 'Continuous metric threaded rod in Grade 8.8 high-tensile steel for suspended services, civil tie-backs, and structural anchoring.',
    fullDesc: 'Cold-rolled precision threads along the entire bar length allow custom cutting and coupling on-site. Widely utilized in formwork clamping, precast bridge rigging, and mechanical pipe suspension.',
    keyFeatures: [
      'Continuous metric ISO pitch threading throughout',
      'High yield strength for critical structural load-bearing',
      'Available in bright zinc-plated or self-colour oil finish',
      'Supplied in 1m, 2m, and 3m standard lengths'
    ],
    dimensions: 'M20 x 2.0m (M10 - M30 available)',
    grade: 'Grade 8.8 High-Tensile',
    material: 'Medium Carbon Steel',
    standard: 'DIN 975 / DIN 976-1',
    price: 18.50,
    unit: 'per 2m piece',
    minOrder: 10,
    stockStatus: 'In Stock',
    stockQty: '850 lengths in Yard',
    leadTime: 'Same Day Dispatch',
    image: '/src/assets/images/product_industrial_hex_bolts_1793391598896.jpg',
    badge: 'Structural Tie',
    specs: [
      { label: 'Rod Length', value: '2000mm (2.0 meters)' },
      { label: 'Tensile Strength', value: '800 MPa' },
      { label: 'Thread Pitch', value: '2.5mm' },
      { label: 'Finish', value: 'Hot-Dip Galvanized / Bright Zinc' }
    ],
    applications: ['Formwork tie rods', 'Pipe hanger support brackets', 'Ceiling grid framing', 'Foundation hold-down assemblies'],
    recommendedAccessories: ['Heavy Hex Coupler Nuts', 'Beveled Square Washers']
  },
  {
    id: 'hardware-acrow-props',
    name: 'Heavy-Duty Adjustable Steel Scaffolding Acrow Props',
    category: 'hardware',
    categoryLabel: 'Hardware & Fasteners',
    sku: 'KBC-EQP-ACR-02',
    shortDesc: 'Telescopic structural steel props with forged collar and high-tensile locking pin for slab shuttering and temporary structural support.',
    fullDesc: 'Katerekera Acrow Props are engineered for temporary vertical support during concrete slab casting, wall formwork bracing, and structural underpinning. Made of high-grade seamless steel tube with hot-dip galvanized and powder-coated finishes.',
    keyFeatures: [
      'Safe working load up to 28 kN depending on extension',
      'Self-cleaning rolled thread collar prevents concrete seizing',
      'Punched base and top head plates for timber beam nailing',
      'Drop-forged high-tensile captive locking pin'
    ],
    dimensions: 'Size 2: 1.98m to 3.35m extended height',
    grade: 'BS 4074 / EN 1065 Class C',
    material: 'High-Yield Seamless Structural Steel Tube',
    standard: 'EN 1065 / BS 4074:1982',
    price: 34.00,
    unit: 'per piece',
    minOrder: 10,
    stockStatus: 'In Stock',
    stockQty: '620 units in Yard',
    leadTime: 'Immediate Yard Pickup or Truck Delivery',
    image: '/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg',
    badge: 'Formwork Essential',
    specs: [
      { label: 'Closed Height', value: '1.98 meters' },
      { label: 'Extended Height', value: '3.35 meters' },
      { label: 'Outer Tube Dia.', value: '60.3mm x 3.2mm wall' },
      { label: 'Inner Tube Dia.', value: '48.3mm x 3.6mm wall' },
      { label: 'Weight per Prop', value: '18.4 kg' }
    ],
    applications: ['Suspended reinforced concrete slab casting', 'Lintel and beam shuttering', 'Underpinning and wall demolition support'],
    recommendedAccessories: ['Tripod Prop Stabilizers', 'Fork Head U-Crowns']
  },
  {
    id: 'hardware-binding-wire-coil',
    name: 'Annealed Black Mild Steel Binding Wire (16 Gauge)',
    category: 'hardware',
    categoryLabel: 'Hardware & Fasteners',
    sku: 'KBC-FST-BDW-16G',
    shortDesc: 'Soft annealed flexible black binding wire for tying structural rebar cages, stirrups, column ties, and BRC mesh on site.',
    fullDesc: 'Thermal annealing in inert atmosphere furnaces produces maximum ductility and flexibility, allowing steel fixers to twist and knot securely without snapping during heavy concrete pouring.',
    keyFeatures: [
      'Thermally annealed for maximum flexibility and knot strength',
      'Consistent 1.6mm (16 BWG) diameter throughout coil',
      'Clean oiled surface prevents brittle rust during storage',
      '25kg standardized weather-wrapped coils'
    ],
    dimensions: '1.6mm diameter (16 Gauge) x 25kg Coil',
    grade: 'Commercial Quality Annealed Mild Steel',
    material: 'Low Carbon Q195 Annealed Steel Wire',
    standard: 'BS 1052 / ASTM A853',
    price: 36.50,
    unit: 'per 25kg coil',
    minOrder: 2,
    stockStatus: 'In Stock',
    stockQty: '450 coils in Stock',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/product_structural_steel_rebar_1793391599254.jpg',
    badge: 'Rebar Essential',
    specs: [
      { label: 'Wire Diameter', value: '1.60mm (16 BWG)' },
      { label: 'Coil Weight', value: '25.0 kg' },
      { label: 'Tensile Strength', value: '350 - 500 N/mm²' },
      { label: 'Elongation', value: '≥ 18%' }
    ],
    applications: ['Structural rebar cage fixing', 'Stirrup link fastening', 'BRC wire mesh lap binding', 'Packaging and bundling'],
    recommendedAccessories: ['Heavy-Duty Rebar Tying Pliers', 'Bar Benders']
  },

  // STEEL (STRUCTURAL REINFORCEMENT & BEAMS)
  {
    id: 'steel-tmt-rebar-16mm',
    name: 'BS 4449 Grade 500B High-Yield TMT Deformed Rebar',
    category: 'steel',
    categoryLabel: 'Structural Steel',
    sku: 'KBC-STL-TMT-16',
    shortDesc: 'Thermo-mechanically treated high-yield ribbed steel reinforcement rebar for columns, suspended slabs, deep foundations, and civil infrastructure.',
    fullDesc: 'Produced via modern Quenching & Self-Tempering (QST) metallurgical processes, our Grade 500B rebars exhibit superior yield strength, remarkable bendability, weldability, and enhanced bond resistance in concrete.',
    keyFeatures: [
      'Specified characteristic yield strength of 500 MPa (N/mm²)',
      'High ductility class B (Agt ≥ 5.0%, Rm/Re ≥ 1.08)',
      'Cross-ribbed surface pattern guarantees exceptional mechanical grip',
      'Full batch chemical and tensile certification issued with mill stamp',
      'Available in 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, and 32mm'
    ],
    dimensions: '16mm Diameter x 12.0m Standard Length (Weight: 18.96 kg/bar)',
    grade: 'BS 4449 Grade 500B / ASTM A615 Grade 60',
    material: 'Micro-Alloyed Low-Carbon Thermo-Mechanically Treated Steel',
    standard: 'BS 4449:2005 / ISO 6935-2 / KS EAS 412-2',
    price: 24.80,
    unit: 'per 12m length',
    minOrder: 10,
    stockStatus: 'In Stock',
    stockQty: '85 Metric Tonnes in Stock',
    leadTime: 'Same Day Crane Truck Loading',
    image: '/src/assets/images/product_structural_steel_rebar_1793391599254.jpg',
    badge: 'Mill Certified',
    popular: true,
    specs: [
      { label: 'Nominal Diameter', value: '16.0mm' },
      { label: 'Bar Length', value: '12.0 meters' },
      { label: 'Unit Weight', value: '1.58 kg/meter (18.96 kg/bar)' },
      { label: 'Yield Strength (Re)', value: '≥ 500 N/mm²' },
      { label: 'Tensile Strength (Rm)', value: '≥ 575 N/mm²' },
      { label: 'Tonnage Price (Bulk)', value: '$1,120 per Metric Tonne' }
    ],
    applications: [
      'Multi-story building column reinforcement',
      'Suspended bridge decks and abutments',
      'Heavy raft foundations and retaining walls',
      'Culverts and high-pressure water retaining tanks'
    ],
    recommendedAccessories: ['16G Annealed Binding Wire', 'Concrete Cover Spacers (50mm)', 'Bar Cutters & Benders']
  },
  {
    id: 'steel-tmt-rebar-12mm',
    name: 'BS 4449 Grade 500B TMT Steel Rebar (12mm)',
    category: 'steel',
    categoryLabel: 'Structural Steel',
    sku: 'KBC-STL-TMT-12',
    shortDesc: '12mm high-yield ribbed reinforcement steel rebar for residential floor slabs, ring beams, retaining walls, and staircase reinforcement.',
    fullDesc: 'Katerekera 12mm TMT deformed bars provide the optimal strength-to-weight ratio for primary floor slab bottom reinforcement, beam tension bars, and lintel beams.',
    keyFeatures: [
      'Guaranteed 500 MPa minimum yield point',
      'Bendable to 180° around standard mandrels without surface micro-cracks',
      'Excellent resistance to earthquake and dynamic cyclic stresses'
    ],
    dimensions: '12mm Diameter x 12.0m Standard Length (Weight: 10.66 kg/bar)',
    grade: 'BS 4449 Grade 500B',
    material: 'Thermo-Mechanically Treated High-Yield Steel',
    standard: 'BS 4449:2005 / ISO 6935-2',
    price: 14.20,
    unit: 'per 12m length',
    minOrder: 20,
    stockStatus: 'In Stock',
    stockQty: '110 Metric Tonnes in Stock',
    leadTime: 'Immediate Yard Dispatch',
    image: '/src/assets/images/product_structural_steel_rebar_1793391599254.jpg',
    badge: 'Popular Size',
    popular: true,
    specs: [
      { label: 'Nominal Diameter', value: '12.0mm' },
      { label: 'Bar Length', value: '12.0 meters' },
      { label: 'Unit Weight', value: '0.888 kg/meter (10.66 kg/bar)' },
      { label: 'Yield Strength', value: '≥ 500 N/mm²' }
    ],
    applications: ['Floor slab mesh reinforcement', 'Beams and lintels', 'Boundary wall columns', 'Stairway treads and landings'],
    recommendedAccessories: ['Plastic Bar Chairs (25mm)', 'Binding Wire']
  },
  {
    id: 'steel-universal-beam-ipe200',
    name: 'Structural Universal Steel Beams (IPE 200 / UB)',
    category: 'steel',
    categoryLabel: 'Structural Steel',
    sku: 'KBC-STL-BEAM-IPE200',
    shortDesc: 'Hot-rolled structural I-section steel beams for clear-span industrial warehouses, portal frames, mezzanine floors, and roof trusses.',
    fullDesc: 'High-strength structural steel IPE 200 sections deliver immense structural moment capacity with low self-weight. Ideal for industrial portal frames, crane gantries, and commercial mezzanine structures.',
    keyFeatures: [
      'Grade S275JR / S355JR structural steel certified',
      'High section modulus for long-span roof and floor framing',
      'Shot-blasted and pre-primed red oxide or mill finish available',
      'Custom flame-cutting and hole punching services upon request'
    ],
    dimensions: 'IPE 200 (Height: 200mm, Width: 100mm, Web: 5.6mm, Flange: 8.5mm) x 12m',
    grade: 'EN 10025-2 Grade S275JR / S355JR',
    material: 'Hot-Rolled Structural Alloy Steel',
    standard: 'EN 10034 / DIN 1025-5',
    price: 295.00,
    unit: 'per 12m beam',
    minOrder: 1,
    stockStatus: 'Ready for Mill Dispatch',
    stockQty: '48 Beams in Stock',
    leadTime: '24-48 Hours Flatbed Delivery',
    image: '/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg',
    badge: 'Heavy Structural',
    specs: [
      { label: 'Height (h)', value: '200mm' },
      { label: 'Flange Width (b)', value: '100mm' },
      { label: 'Web Thickness (tw)', value: '5.6mm' },
      { label: 'Flange Thickness (tf)', value: '8.5mm' },
      { label: 'Mass per Meter', value: '22.4 kg/m (Total 268.8 kg per 12m)' }
    ],
    applications: ['Warehouse portal frame columns and rafters', 'Mezzanine floor main support beams', 'Crane runways'],
    recommendedAccessories: ['Grade 8.8 M20 Bolts', 'Base Plates 25mm', 'Welding Electrodes E7018']
  },
  {
    id: 'steel-shs-hollow-section-100',
    name: 'Square Hollow Structural Sections (SHS 100x100x4.0mm)',
    category: 'steel',
    categoryLabel: 'Structural Steel',
    sku: 'KBC-STL-SHS-10040',
    shortDesc: 'Cold-formed welded structural square hollow steel tubes for architectural columns, space frames, security gates, and canopy framing.',
    fullDesc: 'Clean geometric lines and high torsional resistance make our SHS square hollow sections the prime choice for exposed architectural steelwork, perimeter fencing, structural canopy posts, and truss systems.',
    keyFeatures: [
      'Uniform wall thickness with clean continuous electric resistance weld',
      'High torsional rigidity against twisting loads',
      'Smooth outer surface simplifies spray painting and galvanizing',
      'Standard 6.0m lengths'
    ],
    dimensions: '100mm x 100mm x 4.0mm wall thickness x 6.0m length',
    grade: 'S275J2H Structural Hollow',
    material: 'Cold-Formed High-Tensile Steel',
    standard: 'EN 10219 / BS 6363',
    price: 78.50,
    unit: 'per 6m length',
    minOrder: 4,
    stockStatus: 'In Stock',
    stockQty: '210 lengths',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/product_structural_steel_rebar_1793391599254.jpg',
    badge: 'Architectural Steel',
    specs: [
      { label: 'Outer Dimensions', value: '100 x 100mm' },
      { label: 'Wall Thickness', value: '4.0mm' },
      { label: 'Weight per Meter', value: '11.8 kg/m (70.8 kg per 6m length)' },
      { label: 'Length', value: '6.0 meters' }
    ],
    applications: ['Canopy columns', 'Perimeter security gates', 'Balustrades and stair handrails', 'Roof truss chords'],
    recommendedAccessories: ['Plastic End Plugs', 'Welded Base Plates', 'Zinc Rich Primer']
  },
  {
    id: 'steel-brc-welded-mesh-a142',
    name: 'BRC Welded Fabric Reinforcing Mesh (Ref A142)',
    category: 'steel',
    categoryLabel: 'Structural Steel',
    sku: 'KBC-STL-MSH-A142',
    shortDesc: 'Prefabricated high-yield ribbed wire mesh for ground bearing floor slabs, driveways, pavements, and precast panels.',
    fullDesc: 'Katerekera BRC mesh sheets drastically reduce steel-fixing labor on site. Accurately spaced and resistance-welded wires control cracking caused by concrete shrinkage and thermal expansion.',
    keyFeatures: [
      '200mm x 200mm grid spacing with 6mm ribbed cold-drawn wires',
      'Provides 142 mm²/m cross-sectional steel area',
      'Sheets measure 4.8m x 2.4m for rapid coverage',
      'Compliant with BS 4483 fabric reinforcement standards'
    ],
    dimensions: '4.8m x 2.4m Sheet (Coverage: 11.52 m² per sheet)',
    grade: 'BS 4483 Grade 500 High-Yield Wire',
    material: 'Cold-Drawn Ribbed Deformed Wire',
    standard: 'BS 4483 / ISO 6935-3',
    price: 42.00,
    unit: 'per sheet',
    minOrder: 5,
    stockStatus: 'In Stock',
    stockQty: '340 sheets in Yard',
    leadTime: 'Same Day Dispatch',
    image: '/src/assets/images/product_structural_steel_rebar_1793391599254.jpg',
    badge: 'Slab Mesh',
    specs: [
      { label: 'Main Wire Pitch', value: '200mm' },
      { label: 'Cross Wire Pitch', value: '200mm' },
      { label: 'Wire Diameter', value: '6.0mm' },
      { label: 'Weight per Sheet', value: '25.6 kg' }
    ],
    applications: ['Ground supported floor slabs', 'Driveways and parking aprons', 'Agricultural floors', 'Culvert box slabs'],
    recommendedAccessories: ['Continuous Wire Mesh Spacers (50mm)', 'Binding Wire']
  },

  // CEMENT & AGGREGATES
  {
    id: 'cement-portland-425n',
    name: 'Portland Limestone Cement CEM II / A-LL 42.5N',
    category: 'cement',
    categoryLabel: 'Cement & Aggregates',
    sku: 'KBC-CEM-PLC-425',
    shortDesc: 'Premium high-early-strength Portland cement for multi-story columns, suspended slabs, bridge piers, precast elements, and high-performance concrete.',
    fullDesc: 'Specially engineered for civil contractors and structural engineers demanding early formwork striking and high ultimate compressive strength. Produces dense concrete with exceptional durability against carbonation and moisture penetration.',
    keyFeatures: [
      'Standard 28-day compressive strength ≥ 42.5 MPa',
      'Rapid 2-day early strength ≥ 20.0 MPa for fast formwork cycling',
      'Micro-fine grain distribution provides outstanding pumpability and finish',
      'Manufactured to strict EN 197-1 and East African standards',
      'Supplied in heavy-duty 3-ply moisture-resistant 50kg bags'
    ],
    dimensions: '50kg Valve Bag (Tonnes: 20 bags per metric tonne)',
    grade: 'CEM II / A-LL 42.5N (High-Strength Structural)',
    material: 'Portland Clinker & Selected Calcium Carbonate Limestone',
    standard: 'EN 197-1 / BS EN 197-1 / KS EAS 18-1',
    price: 9.80,
    unit: 'per 50kg bag',
    minOrder: 20,
    stockStatus: 'In Stock',
    stockQty: '3,800 Bags in Dry Warehouse',
    leadTime: 'Immediate Loading / Direct Mill Delivery for 30T loads',
    image: '/src/assets/images/showcase_commercial_building_site_1793391600572.jpg',
    badge: 'High Early Strength',
    popular: true,
    specs: [
      { label: '28-Day Strength', value: '≥ 42.5 N/mm² (MPa)' },
      { label: '2-Day Early Strength', value: '≥ 20.0 N/mm²' },
      { label: 'Initial Setting Time', value: '≥ 60 minutes' },
      { label: 'Soundness (Expansion)', value: '≤ 10mm' },
      { label: 'Bulk Pallet', value: '40 bags per shrink-wrapped pallet (2.0T)' }
    ],
    applications: [
      'Multi-story reinforced concrete columns and shear walls',
      'Prestressed and post-tensioned bridge beams',
      'Precast concrete hollow core slabs',
      'High-traffic industrial pavements'
    ],
    recommendedAccessories: ['Waterproofing Admixture', 'Concrete Plasticizer', 'Hydrated Lime']
  },
  {
    id: 'cement-portland-325r',
    name: 'Portland Pozzolana Cement CEM IV / B-P 32.5R',
    category: 'cement',
    categoryLabel: 'Cement & Aggregates',
    sku: 'KBC-CEM-PPC-325',
    shortDesc: 'Versatile general-purpose building cement for masonry blockwork, external rendering, plastering, and domestic foundations.',
    fullDesc: 'Katerekera 32.5R Portland Pozzolana cement features superior workability, reduced heat of hydration, and excellent resistance to sulfate attack in soils. The trusted choice for residential walls, mortar, and screeds.',
    keyFeatures: [
      '28-day compressive strength ≥ 32.5 MPa',
      'Enhanced cohesion reduces mortar bleed and shrinkage cracking',
      'Low heat output makes it ideal for mass concrete foundation footings',
      'Cost-effective solution for all non-specialist residential masonry'
    ],
    dimensions: '50kg Bag (20 bags = 1 Tonne)',
    grade: 'CEM IV / B-P 32.5R General Purpose',
    material: 'Portland Clinker with Active Volcanic Pozzolana',
    standard: 'EN 197-1 / KS EAS 18-1',
    price: 8.50,
    unit: 'per 50kg bag',
    minOrder: 20,
    stockStatus: 'In Stock',
    stockQty: '4,500 Bags in Stock',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/showcase_commercial_building_site_1793391600572.jpg',
    badge: 'Masonry Standard',
    specs: [
      { label: '28-Day Strength', value: '≥ 32.5 N/mm²' },
      { label: 'Initial Setting Time', value: '≥ 75 minutes' },
      { label: 'Fineness (Blaine)', value: '≥ 340 m²/kg' }
    ],
    applications: ['Brick and concrete block laying', 'Internal and external plastering', 'Domestic floor screeds', 'Strip foundation footings'],
    recommendedAccessories: ['Plastering River Sand', 'Mortar Bonding Agent']
  },
  {
    id: 'aggregate-blue-stone-20mm',
    name: 'Clean Crushed Granite Blue Stone Aggregates (20mm)',
    category: 'cement',
    categoryLabel: 'Cement & Aggregates',
    sku: 'KBC-AGG-BLU-20MM',
    shortDesc: 'Hard, angular machine-crushed blue granite stone aggregates for structural concrete mixes (Class 20/25/30).',
    fullDesc: 'Screened to strict 10mm-20mm graded size limits. Zero organic impurities, low flakiness index, and zero clay coating ensure maximal aggregate interlock and compressive load transfer in structural concrete.',
    keyFeatures: [
      'Clean machine-washed blue granite quarry stone',
      'Nominal graded size 20mm (3/4")',
      'Aggregate Crushing Value (ACV) < 22%',
      'Delivered by 10-wheel and 12-wheel tipper trucks'
    ],
    dimensions: 'Sold by Tipper Truckload (15 Tonnes / 20 Tonnes) or per Tonne',
    grade: 'Structural Coarse Aggregate Grade A',
    material: 'Crushed Basalt / Granite Quarry Rock',
    standard: 'BS 882 / ASTM C33',
    price: 26.00,
    unit: 'per metric tonne',
    minOrder: 5,
    stockStatus: 'In Stock',
    stockQty: '500+ Tonnes in Quarry Yard',
    leadTime: 'Same Day Tipper Truck Delivery',
    image: '/src/assets/images/showcase_commercial_building_site_1793391600572.jpg',
    badge: 'Quarry Direct',
    specs: [
      { label: 'Grading Size', value: '10mm - 20mm' },
      { label: 'Specific Gravity', value: '2.68' },
      { label: 'Water Absorption', value: '< 0.8%' },
      { label: 'Flakiness Index', value: '< 18%' }
    ],
    applications: ['Structural concrete mixing (C20, C25, C30)', 'Culvert headwalls', 'Heavy foundation sub-bases'],
    recommendedAccessories: ['Portland 42.5N Cement', 'Washed River Sand']
  },
  {
    id: 'aggregate-river-sand-washed',
    name: 'Triple-Washed Sharp River Sand for Concrete & Plaster',
    category: 'cement',
    categoryLabel: 'Cement & Aggregates',
    sku: 'KBC-AGG-SND-WSH',
    shortDesc: 'Coarse and medium graded clean river sand free of clay, silt, and salts for flawless concrete strength and smooth wall finishing.',
    fullDesc: 'Sourced from natural freshwater river beds and triple washed to eliminate organic silts and saline minerals that cause concrete efflorescence and rebar corrosion.',
    keyFeatures: [
      'Zero salinity and zero deleterious vegetable matter',
      'Graded coarse sharp particles create optimal cement paste bonding',
      'Minimal silt content (< 3.0% by volume)'
    ],
    dimensions: 'Sold by Metric Tonne or 18-Tonne Tipper Truck',
    grade: 'Zone II Fine Aggregate for Concrete',
    material: 'Natural Silica River Sand',
    standard: 'BS 882 / ASTM C33',
    price: 22.50,
    unit: 'per metric tonne',
    minOrder: 5,
    stockStatus: 'In Stock',
    stockQty: '600+ Tonnes Available',
    leadTime: 'Same Day Tipper Dispatch',
    image: '/src/assets/images/showcase_commercial_building_site_1793391600572.jpg',
    badge: 'Triple Washed',
    specs: [
      { label: 'Silt Content', value: '< 2.5%' },
      { label: 'Chloride Content', value: 'Nil (< 0.01%)' },
      { label: 'Grading Zone', value: 'BS Zone II' }
    ],
    applications: ['Structural concrete batching', 'Wall plaster and floor screeds', 'Block laying mortar'],
    recommendedAccessories: ['Portland 32.5R Cement', 'Plastering Trowels']
  },

  // TIMBER & FORMWORK
  {
    id: 'timber-marine-plywood-18mm',
    name: 'Phenolic Film-Faced Marine Shuttering Plywood (18mm)',
    category: 'timber',
    categoryLabel: 'Timber & Formwork',
    sku: 'KBC-TMB-PLY-18',
    shortDesc: 'High-density phenolic brown film-faced waterproof marine plywood boards for smooth architectural concrete off-shutter finishes.',
    fullDesc: 'Katerekera 18mm formwork boards feature 13 cross-laminated hardwood birch veneers bonded with WBP (Water Boiled Proof) phenolic resin glue. Gives concrete surfaces a mirror-smooth architectural finish and can be reused up to 15 times with proper release oil.',
    keyFeatures: [
      '120g/m² high-wear dynea phenolic film coating on both faces',
      'WBP boiling waterproof glue tested 72 hours in boiling water',
      'All 4 factory edges sealed with acrylic waterproof paint',
      'Resistant to concrete chemical alkali attack and abrasion',
      'Guarantees 12-15 re-uses per board on site'
    ],
    dimensions: '18mm Thickness x 1220mm x 2440mm (4ft x 8ft)',
    grade: 'Class 3 Exterior Marine Formwork Plywood',
    material: '13-Ply Full Hardwood Core with Phenolic Impregnated Surface',
    standard: 'EN 636-3 / BS 1088 / EN 314-2 Class 3',
    price: 38.50,
    unit: 'per 4ft x 8ft board',
    minOrder: 5,
    stockStatus: 'In Stock',
    stockQty: '780 Boards in Yard',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg',
    badge: 'Formwork Grade',
    popular: true,
    specs: [
      { label: 'Sheet Size', value: '1220 x 2440mm (8ft x 4ft)' },
      { label: 'Board Thickness', value: '18.0mm (± 0.5mm)' },
      { label: 'Core Veneers', value: 'Full Eucalyptus / Birch Hardwood' },
      { label: 'Surface Coating', value: 'Dynea Brown Film 120 g/m²' },
      { label: 'Board Weight', value: '31.5 kg per board' }
    ],
    applications: [
      'Fair-faced architectural concrete slab casting',
      'Column and retaining wall formwork shutters',
      'Heavy-duty scaffolding decking and ramp walkways',
      'Precast concrete mould fabrication'
    ],
    recommendedAccessories: ['Chemical Mould Release Oil', 'Formwork Tie Rods & Wing Nuts', 'Acrow Props']
  },
  {
    id: 'timber-cypress-beams-2x4',
    name: 'Pressure-Treated Structural Cypress Timber Beams (2"x4")',
    category: 'timber',
    categoryLabel: 'Timber & Formwork',
    sku: 'KBC-TMB-CYP-24',
    shortDesc: 'Kiln-dried pressure-treated structural cypress timber for roof trusses, purlins, wall framing, and formwork bracing.',
    fullDesc: 'Vacuum-pressure impregnated with CCA (Copper Chrome Arsenic) wood preservatives to hazard class H3. Protects timber permanently against subterranean termites, wood-boring insects, and wet rot fungi.',
    keyFeatures: [
      'Vacuum pressure treated to Hazard Class H3 (Exterior above ground)',
      'Kiln-dried to 14-16% moisture content prevents warping and twisting',
      'Precision planed all round for accurate truss assembly',
      'Straight structural grade timber sourced from sustainable plantations'
    ],
    dimensions: '2" x 4" (50mm x 100mm) x 14ft & 16ft Lengths',
    grade: 'Structural Timber Grade S7 / C16',
    material: 'Kiln-Dried Cupressus Lusitanica (Cypress)',
    standard: 'BS 5268 / KS 02-94',
    price: 9.20,
    unit: 'per 14ft piece',
    minOrder: 10,
    stockStatus: 'In Stock',
    stockQty: '1,400 pieces in Dry Shed',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg',
    badge: 'Treated Timber',
    specs: [
      { label: 'Cross Section', value: '50mm x 100mm (2" x 4")' },
      { label: 'Standard Length', value: '4.27m (14 ft)' },
      { label: 'Preservative', value: 'CCA Pressure Impregnated' },
      { label: 'Moisture Content', value: '14% ± 2%' }
    ],
    applications: ['Roof truss rafters and king posts', 'Wall framing and stud partitions', 'Formwork stiffener soldiers and walers'],
    recommendedAccessories: ['Truss Gang Nails', 'Galvanized Framing Nails 4"', 'Wood Preservative Touch-Up']
  },
  {
    id: 'timber-cypress-purlins-2x2',
    name: 'Treated Hardwood Roofing Purlins & Battens (2"x2")',
    category: 'timber',
    categoryLabel: 'Timber & Formwork',
    sku: 'KBC-TMB-PRL-22',
    shortDesc: 'Straight, seasoned structural battens for securing IBR roofing sheets, clay tiles, and gypsum ceiling hangers.',
    fullDesc: 'Treated against pest infestation and seasoned to avoid roofing sheet sag and screw pull-out under heavy wind uplift.',
    keyFeatures: [
      'H3 pressure treated for termite immunity',
      'High screw holding power',
      'Straight-grained with minimal knot clusters'
    ],
    dimensions: '2" x 2" (50mm x 50mm) x 14ft Length',
    grade: 'Structural Grade Battens',
    material: 'Treated Plantation Pine & Cypress',
    standard: 'BS 5268',
    price: 4.80,
    unit: 'per 14ft piece',
    minOrder: 20,
    stockStatus: 'In Stock',
    stockQty: '2,200 pieces',
    leadTime: 'Immediate Yard Dispatch',
    image: '/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg',
    badge: 'Roofing Battens',
    specs: [
      { label: 'Dimensions', value: '50mm x 50mm' },
      { label: 'Length', value: '4.27 meters (14ft)' },
      { label: 'Treatment', value: 'CCA Anti-Termite' }
    ],
    applications: ['Roofing sheet purlins', 'Ceiling noggin framing', 'Fencing battens'],
    recommendedAccessories: ['Tek Roofing Screws 65mm', 'Concrete Nails']
  },

  // ROOFING & CLADDING
  {
    id: 'roofing-ibr-gauge28-charcoal',
    name: 'Heavy IBR Profile Color-Coated Roofing Sheets (Gauge 28)',
    category: 'roofing',
    categoryLabel: 'Roofing & Cladding',
    sku: 'KBC-ROF-IBR-28C',
    shortDesc: 'Deep-fluted industrial inverted box rib (IBR) roofing and wall cladding sheets in premium baked-enamel Charcoal Grey, Tile Red, and Forest Green.',
    fullDesc: 'Engineered for commercial warehouses, high-end residential estates, and industrial plants. The bold deep 36mm trapezoidal flutes provide unmatched water discharge velocity during tropical downpours and permit flat roof pitches down to 5 degrees.',
    keyFeatures: [
      'Nominal thickness: 0.40mm (Heavy Gauge 28)',
      'Hot-dip Aluzinc (55% Aluminum, 43.4% Zinc, 1.6% Silicon) base metal',
      'Pre-painted with high-durability polyester finish resisting UV fading',
      'Wide effective cover width of 686mm minimizes lap waste',
      'Cut to custom lengths up to 12 meters to eliminate end laps'
    ],
    dimensions: 'Gauge 28 (0.40mm) x Effective Width 686mm x 3.0m Length (Lengths up to 10m available)',
    grade: 'Heavy Structural Aluzinc AZ150',
    material: 'Aluzinc-Coated High-Tensile Steel with Baked Enamel Primer & Topcoat',
    standard: 'ASTM A792 / SANS 10214 / ISO 9364',
    price: 13.90,
    unit: 'per 3m sheet',
    minOrder: 10,
    stockStatus: 'In Stock',
    stockQty: '1,800 Sheets in Stock',
    leadTime: 'Immediate Yard Dispatch (Custom cutting in 24 hrs)',
    image: '/src/assets/images/product_roofing_sheets_fasteners_1793391599776.jpg',
    badge: 'Tropical Weatherproof',
    popular: true,
    specs: [
      { label: 'Sheet Profile', value: 'Trapezoidal IBR (Inverted Box Rib)' },
      { label: 'Gauge / Thickness', value: 'Gauge 28 (0.40mm BMT)' },
      { label: 'Flute Depth', value: '36.5mm Deep Rib' },
      { label: 'Coating Mass', value: 'AZ150 (150 g/m² Aluzinc)' },
      { label: 'Color Options', value: 'Charcoal Grey, Tile Red, Forest Green, Royal Blue' },
      { label: 'Min. Roof Pitch', value: '5° Degrees' }
    ],
    applications: [
      'Commercial warehouses and industrial factories',
      'Contemporary residential residential estates',
      'Canopies, aircraft hangars and sports complexes',
      'Architectural wall cladding facades'
    ],
    recommendedAccessories: ['Class 3 Tek Screws 65mm', 'Roll-Top Ridge Caps', 'Foam Purlin Poly-Fill Closures']
  },
  {
    id: 'roofing-ridge-cap-g28',
    name: 'Roll-Top Industrial Ridge Caps & Valley Flashings (G28)',
    category: 'roofing',
    categoryLabel: 'Roofing & Cladding',
    sku: 'KBC-ROF-RDG-28C',
    shortDesc: 'Pre-formed color-matched apex ridge caps and roof flashing sheets with anti-capillary hems for 100% wind and driving-rain seal.',
    fullDesc: 'Katerekera ridge caps provide the crucial crowning seal along the roof apex. Features anti-capillary stiffened hem folds that prevent rainwater from siphoning back under roofing sheets.',
    keyFeatures: [
      'Precision roll-formed matching IBR colors exactly',
      'Stiffened return hems prevent wind vibration and edge warping',
      '450mm total girth with 2.4m standard lengths'
    ],
    dimensions: 'Girth 450mm x 2.4m Length (Gauge 28)',
    grade: 'AZ150 Color-Coated Aluzinc',
    material: 'Aluzinc Steel Coil matching IBR Sheets',
    standard: 'ASTM A792',
    price: 11.50,
    unit: 'per 2.4m piece',
    minOrder: 4,
    stockStatus: 'In Stock',
    stockQty: '420 pcs in Stock',
    leadTime: 'Immediate Dispatch',
    image: '/src/assets/images/product_roofing_sheets_fasteners_1793391599776.jpg',
    badge: 'Apex Seal',
    specs: [
      { label: 'Length', value: '2.40 meters' },
      { label: 'Girth', value: '450mm (225mm each wing)' },
      { label: 'Gauge', value: 'Gauge 28 (0.40mm)' }
    ],
    applications: ['Apex roof peak ridge sealing', 'Hip roof junction waterproofing', 'Barge board flashings'],
    recommendedAccessories: ['Tek Screws with Washers', 'Roofing Sealant Mastic']
  }
];

export const COMPANY_INFO = {
  name: 'Katerekera Bolt Co Ltd',
  shortName: 'Katerekera Bolt Co.',
  tagline: 'Heavy Structural Fasteners & Mill-Certified Building Materials',
  regNumber: 'REG-UGA-884192-B',
  taxId: 'TIN-1004892819',
  address: {
    yard: 'Katerekera Industrial Supply Depot, Plot 42 Heavy Industrial Zone',
    city: 'Kampala, Uganda',
    region: 'East Africa Central Logistics Corridor',
    coordinates: '0.3136° N, 32.5811° E'
  },
  phone: '+256 701 448 920 / +256 772 319 804',
  emergencyLine: '+256 750 992 100 (24/7 Site Pour Dispatch)',
  email: 'sales@katerekerabolt.co.ug',
  quoteEmail: 'procurement@katerekerabolt.co.ug',
  operatingHours: 'Mon - Fri: 7:00 AM - 6:00 PM | Sat: 7:30 AM - 4:00 PM | Emergency Deliveries: 24/7',
  yardCapacity: '80-Tonne Automated Weighbridge · 4 Overhead Gantry Cranes · 8 Flatbed Delivery Trucks'
};

export const CASE_STUDIES = [
  {
    id: 'cs-expressway',
    title: 'Northern Metropolitan Expressway Flyovers',
    client: 'Consortium of Civil Engineers & UNRA',
    materialsSupplied: '1,200 Metric Tonnes Grade 500B Rebars · 4,500 Sets M24 & M30 High-Tensile Anchor Bolts',
    impact: 'Zero structural failure across all 6 interchange bridge piers with ultrasonic weld inspection passed.',
    year: '2025 - 2026',
    image: '/src/assets/images/showcase_commercial_building_site_1793391600572.jpg'
  },
  {
    id: 'cs-namanve-logistics',
    title: 'Namanve Mega Warehousing Hub (50,000 m²)',
    client: 'Great Lakes Logistics Park',
    materialsSupplied: '38,000 sq.m Heavy IBR G28 Charcoal Roofing · 185 Tonnes Structural IPE Beams · 150,000 Tek Fasteners',
    impact: 'Completed 3 weeks ahead of schedule with zero weather water leaks through 2 heavy monsoon seasons.',
    year: '2025',
    image: '/src/assets/images/hero_construction_steel_warehouse_1793391598897.jpg'
  },
  {
    id: 'cs-kololo-towers',
    title: 'Kololo Horizon 14-Story Commercial Tower',
    client: 'Apex Urban Developers',
    materialsSupplied: '42.5N High-Early-Strength Cement (12,000 bags) · Marine Plywood Formwork · High-Yield BRC A142',
    impact: '7-day floor slab cycling achieved through high-early-strength 42.5N certified batch consistency.',
    year: '2026',
    image: '/src/assets/images/showcase_commercial_building_site_1793391600572.jpg'
  }
];
