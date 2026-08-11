export type GalleryTone = "day" | "golden" | "dusk" | "night" | "mist";

export type Motif =
  | "coast"
  | "peaks"
  | "forest"
  | "dunes"
  | "islands"
  | "skyline"
  | "tundra"
  | "vines";

export type PaletteName =
  | "sunlit"
  | "ember"
  | "fjord"
  | "saffron"
  | "arctic"
  | "alpine"
  | "moss"
  | "aegean"
  | "slate"
  | "dusk";

export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Host {
  name: string;
  since: string;
  responseTime: string;
  bio: string;
}

export interface GalleryFrame {
  caption: string;
  tone: GalleryTone;
}

export interface Destination {
  slug: string;
  name: string;
  location: string;
  region: string;
  tripType: string;
  tagline: string;
  summary: string;
  description: string[];
  pricePerNight: number;
  cleaningFee: number;
  serviceFeeRate: number;
  rating: number;
  bedrooms: number;
  beds: number;
  baths: number;
  maxGuests: number;
  motif: Motif;
  palette: PaletteName;
  featured: boolean;
  highlights: string[];
  amenities: string[];
  houseRules: string[];
  gallery: GalleryFrame[];
  host: Host;
  reviews: Review[];
}

export type TripStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Trip {
  id: string;
  slug: string;
  status: TripStatus;
  checkIn: string;
  checkOut: string;
  guests: number;
  nightlyRate: number;
  total: number;
  bookedOn: string;
  note: string;
}
