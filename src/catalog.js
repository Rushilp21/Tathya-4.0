export const categories = [
  {
    id: 'headphones',
    label: 'Headphones',
    uses: [
      { label: 'Casual listening', option: 'cheaper', reason: 'Standard stereo covers music and podcasts at the lowest price.' },
      { label: 'Immersive listening', option: 'selection', reason: 'You get 3D audio at a lower price than the upgrade.' },
      { label: 'Noisy commute', option: 'upgrade', reason: 'Active noise cancellation helps reduce background noise on a noisy commute.' },
    ],
    products: {
      cheaper: { name: 'Stereo Headphones', price: 1199, image: 'stereo', features: ['Keeps standard stereo', 'Gives up 3D audio'] },
      selection: { name: 'Spatial Headphones', price: 1499, image: 'spatial', features: ['3D audio', 'No active noise cancellation'] },
      upgrade: { name: 'Quiet Commute Headphones', price: 2299, image: 'commute', features: ['Keeps 3D audio', 'Adds active noise cancellation'] },
    },
  },
  {
    id: 'shoes',
    label: 'Running shoes',
    uses: [
      { label: 'Short casual walks', option: 'cheaper', reason: 'The basic road outsole covers short walks without the added cost of extra cushioning.' },
      { label: 'Regular road runs', option: 'selection', reason: 'Extra cushioning suits regular runs, and the outsole is designed for roads.' },
      { label: 'Loose trails', option: 'upgrade', reason: 'The lugged outsole provides more grip on loose trails.' },
    ],
    products: {
      cheaper: { name: 'Basic Road Trainer', price: 1899, image: 'basic', features: ['Keeps the road outsole', 'Gives up extra cushioning'] },
      selection: { name: 'Cushioned Road Runner', price: 2499, image: 'road', features: ['Extra cushioning', 'Road outsole'] },
      upgrade: { name: 'Trail Runner', price: 3499, image: 'trail', features: ['Keeps extra cushioning', 'Adds a grippier lugged outsole for loose trails'] },
    },
  },
  {
    id: 'cookware',
    label: 'Cookware',
    uses: [
      { label: 'Gas cooking', option: 'cheaper', reason: 'You keep the nonstick surface without paying for induction compatibility.' },
      { label: 'Induction cooking', option: 'selection', reason: 'The induction-compatible base works on your cooktop at a lower price than the lidded upgrade.' },
      { label: 'Covered simmering on induction', option: 'upgrade', reason: 'The fitted glass lid lets you simmer covered on an induction cooktop.' },
    ],
    products: {
      cheaper: { name: 'Gas Cooktop Pan', price: 1199, image: 'gas', features: ['Keeps the nonstick surface', 'Gives up induction compatibility'] },
      selection: { name: 'Everyday Induction Pan', price: 1599, image: 'induction', features: ['Nonstick surface', 'Induction-compatible base'] },
      upgrade: { name: 'Induction Pan With Lid', price: 2099, image: 'lid', features: ['Keeps induction compatibility', 'Adds a fitted glass lid'] },
    },
  },
]
