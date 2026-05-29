import Home2 from "../assets/contact-us/Home2.jpeg";
import Home from "../assets/contact-us/Home.jpeg";
import Egypt from "../assets/Corporate-Travel/Egypt.jpeg";
import Europe from "../assets/Corporate-Travel/Europe.webp";
import AsiaMiddleEast from "../assets/Corporate-Travel/AsiaMiddleEast.jpeg";
import {
  BookOpen,
  Bus,
  Camera,
  FileCheck,
  Shield,
  Utensils,
} from "lucide-react";

export const indiaData = {
  "north-india": {
    "himachal pradesh": [
      "Manali",
      "Shimla",
      "Dharamshala",
      "Kasol",
      "Dalhousie",
    ],
    uttarakhand: ["Nainital", "Rishikesh", "Haridwar", "Mussoorie", "Auli"],
    "jammu kashmir": ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg"],
    punjab: ["Amritsar", "Chandigarh"],
    haryana: ["Gurugram", "Kurukshetra"],
    delhi: ["New Delhi"],
  },

  "south-india": {
    kerala: ["Munnar", "Alleppey", "Kochi", "Wayanad", "Thekkady"],
    tamilnadu: ["Ooty", "Kodaikanal", "Chennai", "Madurai", "Rameswaram"],
    karnataka: ["Coorg", "Bangalore", "Mysore", "Hampi", "Chikmagalur"],
    andhraPradesh: ["Tirupati", "Visakhapatnam", "Araku Valley"],
    telangana: ["Hyderabad", "Warangal"],
  },

  "west-india": {
    goa: ["North Goa", "South Goa"],
    gujarat: ["Ahmedabad", "Kutch", "Dwarka", "Somnath"],
    rajasthan: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Mount Abu"],
    maharashtra: ["Mumbai", "Lonavala", "Pune", "Mahabaleshwar", "Nashik"],
  },

  "east-india": {
    "west bengal": ["Kolkata", "Darjeeling", "Digha", "Sundarbans"],
    odisha: ["Puri", "Bhubaneswar", "Konark"],
    bihar: ["Bodh Gaya", "Rajgir", "Patna"],
    jharkhand: ["Ranchi", "Deoghar"],
  },

  "north-east": {
    assam: ["Guwahati", "Kaziranga", "Majuli"],
    sikkim: ["Gangtok", "Pelling", "Lachung"],
    meghalaya: ["Shillong", "Cherrapunji", "Dawki"],
    arunachalPradesh: ["Tawang", "Ziro Valley"],
    nagaland: ["Kohima"],
    manipur: ["Imphal"],
    mizoram: ["Aizawl"],
    tripura: ["Agartala"],
  },

  "central-india": {
    "madhya pradesh": ["Bhopal", "Khajuraho", "Ujjain", "Pachmarhi"],
    chhattisgarh: ["Raipur", "Jagdalpur", "Chitrakote Falls"],
  },

  "island-destinations": {
    "andaman nicobar": ["Port Blair", "Havelock Island", "Neil Island"],
    lakshadweep: ["Agatti", "Kavaratti", "Bangaram Island"],
  },
};

export const worldData = {
  asia: {
    japan: ["Tokyo", "Kyoto", "Osaka", "Mount Fuji"],
    thailand: ["Bangkok", "Phuket", "Krabi", "Pattaya"],
    indonesia: ["Bali", "Jakarta"],
    singapore: ["Singapore City"],
    malaysia: ["Kuala Lumpur", "Langkawi"],
    vietnam: ["Hanoi", "Ho Chi Minh City", "Da Nang"],
    dubai: ["Dubai", "Abu Dhabi"],
  },

  europe: {
    france: ["Paris", "Nice", "Lyon"],
    italy: ["Rome", "Venice", "Milan", "Florence"],
    switzerland: ["Zurich", "Lucerne", "Interlaken", "Geneva"],
    germany: ["Berlin", "Munich"],
    spain: ["Barcelona", "Madrid", "Seville"],
    austria: ["Vienna", "Salzburg"],
    netherlands: ["Amsterdam"],
    greece: ["Athens", "Santorini", "Mykonos"],
  },

  america: {
    usa: ["New York", "Los Angeles", "Las Vegas", "Miami", "San Francisco"],
    canada: ["Toronto", "Vancouver", "Montreal", "Niagara Falls"],
    mexico: ["Cancun", "Mexico City"],
    brazil: ["Rio de Janeiro", "Sao Paulo"],
  },

  africa: {
    egypt: ["Cairo", "Luxor", "Sharm El Sheikh"],
    kenya: ["Nairobi", "Masai Mara"],
    southAfrica: ["Cape Town", "Johannesburg", "Durban"],
    morocco: ["Marrakesh", "Casablanca"],
  },

  oceania: {
    australia: ["Sydney", "Melbourne", "Gold Coast", "Perth"],
    newZealand: ["Auckland", "Queenstown", "Wellington"],
    fiji: ["Nadi", "Suva"],
  },

  "middle-east": {
    uae: ["Dubai", "Abu Dhabi", "Sharjah"],
    saudiArabia: ["Riyadh", "Jeddah", "Makkah", "Madinah"],
    qatar: ["Doha"],
    oman: ["Muscat"],
    bahrain: ["Manama"],
    turkey: ["Istanbul", "Antalya", "Cappadocia"],
  },
};

export const tags = [
  "All Tags",
  "GROUP TOUR",
  "PRIVATE TOUR",
  "FAMILY",
  "COUPLE",
  "SOLO",

  "ADVENTURE",
  "TREKKING",
  "BEACH",
  "MOUNTAINS",
  "WILDLIFE",

  "HONEYMOON",
  "LUXURY",
  "BUDGET",
  "RELAXATION",

  "CULTURE",
  "WEEKEND GETAWAY",
];

export const priceRanges = [
  { id: 1, label: "Under ₹ 20,000", min: 0, max: 20000 },
  { id: 2, label: "₹ 20,000 - ₹ 80,000", min: 20000, max: 80000 },
  { id: 3, label: "₹ 80,000 - ₹ 1.4L", min: 80000, max: 140000 },
  { id: 4, label: "₹ 1.4L - ₹ 2L", min: 140000, max: 200000 },
  { id: 5, label: "₹ 2L above", min: 200000, max: Infinity },
];

export const DEFAULT_ITINERARY = [
  {
    day: 1,
    title: "Into the Valley",
    desc: "Touch down at Srinagar Airport and transfer straight to Pahalgam where the Lidder river sets the vibe. Check in, breathe the mountain air, and just be. No agenda tonight.",
  },
  {
    day: 2,
    title: "ABC Valley + Dal Lake Nights",
    desc: "Morning drive to Aru & Betaab Valley. Afternoon return to Srinagar for a shikara ride on the iconic Dal Lake as the sun dips behind the Zabarwan hills.",
  },
  {
    day: 3,
    title: "Up in the Clouds",
    desc: "Full day in Gulmarg. Cable-car up to Kongdori, panoramic Himalayan views, optional skiing or snowplay. Evening back at the houseboat.",
  },
  {
    day: 4,
    title: "Mughal Vibes + Evening Free",
    desc: "Explore the Mughal Gardens — Nishat, Shalimar, Chashme Shahi. Afternoon free for local bazaars and saffron shopping.",
  },
  {
    day: 5,
    title: "Slow Day, High Views",
    desc: "Leisurely breakfast. Optional Dachigam nature walk or simply relax on the houseboat deck. Farewell dinner with traditional Wazwan cuisine.",
  },
  {
    day: 6,
    title: "Until Next Time",
    desc: "Transfer to Srinagar Airport. Carry the mountains home in your heart.",
  },
];

export const contactSlides = [
  {
    id: 1,
    destination: "Greek Islands",
    backgroundImage: Home2,
    description: "Whitewashed villages, sunsets and crystal clear waters.",
    highlights: [
      "Tailor-made itineraries curated by travel experts.",
      "Hand-picked stays, local experiences and guided tours.",
      "Visa, flights, insurance and FOREX assistance in one place.",
    ],
  },
  {
    id: 2,
    destination: "Swiss Alps",
    backgroundImage: Home,
    description: "Snow-capped peaks, scenic trains and cosy mountain towns.",
    highlights: [
      "Tailor-made itineraries curated by travel experts.",
      "Hand-picked stays, local experiences and guided tours.",
      "Visa, flights, insurance and FOREX assistance in one place.",
    ],
  },
  {
    id: 3,
    destination: "Maldives",
    backgroundImage: Home,
    description: "Overwater villas, coral reefs and endless shades of blue.",
    highlights: [
      "Tailor-made itineraries curated by travel experts.",
      "Hand-picked stays, local experiences and guided tours.",
      "Visa, flights, insurance and FOREX assistance in one place.",
    ],
  },
];

export const corporateSlides = [
  {
    id: 1,
    destination: "Egypt",
    backgroundImage: Egypt,
    description: "Inspire your team with unforgettable incentive travel",
    highlights: [
      "Explore the great pyramids of Giza",
      "Sail down the Nile on a luxury cruise",
      "Scuba diving and Red Sea beach retreats",
      "Curated experiences for corporate groups",
    ],
  },
  {
    id: 2,
    destination: "Europe",
    backgroundImage: Europe,
    description: "Conferences, incentives and rewards across iconic cities",
    highlights: [
      "Custom itineraries for conferences & exhibitions",
      "Team bonding in Paris, Rome, Amsterdam and more",
      "Curated gala dinners & unique venues",
      "End-to-end visa, flights and logistics support",
    ],
  },
  {
    id: 3,
    destination: "Asia & Middle East",
    backgroundImage: AsiaMiddleEast,
    description: "Short-haul getaways for meetings and incentives",
    highlights: [
      "Dubai, Singapore, Bali, Thailand and more",
      "Modern convention centres & beach resorts",
      "Team activities, desert safaris and cruises",
      "Dedicated on-tour support team",
    ],
  },
];

export const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
];

export const INCLUDES = [
  { icon: Shield, label: "Hotel" },
  { icon: Utensils, label: "Meals" },
  { icon: Camera, label: "Sightseeing" },
  { icon: Bus, label: "Transport" },
  { icon: BookOpen, label: "Guide" },
  { icon: FileCheck, label: "Permits" },
];
