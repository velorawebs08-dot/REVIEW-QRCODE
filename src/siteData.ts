export interface ReviewCategory {
  id: string;
  label: string;
  messages: string[];
}

export interface BusinessData {
  name: string;
  tagline: string;
  logo: string;
  city: string;
}

export interface ThemeData {
  primary: string;
  bg: string;
  surface?: string;
  muted: string;
  border: string;
}

export interface ReviewLinks {
  googleReviewUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  phone?: string;
  mapsUrl?: string;
  website?: string;
}

export interface SiteData {
  business: BusinessData;
  theme: ThemeData;
  review: ReviewLinks;
  poweredBy: {
    show: boolean;
    text: string;
  };
  reviewMessages: ReviewCategory[];
}

export const siteData: SiteData = {
  business: {
    name: "False Nine",
    tagline: "Wear the game.",
    logo: "https://i.postimg.cc/HLD391Tj/Falsenine-Geometric-Logo.png",
    city: "Sangli",
  },
  theme: {
    primary: "#0A0A0A",
    bg: "#FFFFFF",
    surface: "#F5F5F4",
    muted: "#737373",
    border: "#E5E5E5",
  },
  review: {
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJNYlAJxojwTsRGmjBNIi4w3I",
    instagramUrl: "https://instagram.com/falsenine.football",
    whatsappNumber: "919876543210",
    whatsappMessage: "Hi False Nine, I'd like to enquire about a jersey.",
    phone: "+91 98765 43210",
    mapsUrl: "https://maps.google.com/?q=False+Nine+Sangli",
    website: "https://falsenine.in",
  },
  poweredBy: {
    show: true,
    text: "Powered by Velora Digital",
  },
  reviewMessages: [
    {
      id: "quality",
      label: "Jersey quality",
      messages: [
        "Great jersey quality at {shop}. The fabric feels premium and looks just like the original.",
        "Bought a jersey from {shop} and the stitching and material are top class. Very happy with it.",
        "Excellent quality jerseys here. Soft fabric, perfect finish, worth every rupee.",
        "Genuinely impressed by the jersey quality at {shop}. Comfortable and well made.",
      ],
    },
    {
      id: "print",
      label: "Print and badge",
      messages: [
        "The printing and badge quality is superb. Sharp details, nothing peeling or faded.",
        "Name and number print on my jersey came out perfect. Very neat and long lasting work.",
        "Badge and logo detailing is spot on, just like the real kit. Loved it.",
        "Loved the print quality at {shop}. Clean, sharp and exactly as I wanted.",
      ],
    },
    {
      id: "fit",
      label: "Fit and size",
      messages: [
        "Got the perfect fit on the first try. The size guide at {shop} is accurate.",
        "Great fit and very comfortable to wear. They helped me pick the right size.",
        "Sizes are true to fit and the jersey feels great. No exchange needed.",
        "Found my size easily and the fit is just right. Very happy with my purchase.",
      ],
    },
    {
      id: "price",
      label: "Price",
      messages: [
        "Very fair prices for this quality. Best value jerseys I found in {city}.",
        "Reasonable pricing and no hidden charges. Great value for money at {shop}.",
        "Affordable jerseys without compromising on quality. Totally worth the price.",
        "Good prices compared to other shops. Got a great jersey within my budget.",
      ],
    },
    {
      id: "variety",
      label: "Variety",
      messages: [
        "Huge collection of club, national and retro jerseys. Found exactly the one I wanted.",
        "Great variety at {shop}. New season kits and old classics all in one place.",
        "So many teams and seasons to choose from. A real paradise for football fans.",
        "Best jersey collection in {city}. Easy to find rare and retro kits here.",
      ],
    },
    {
      id: "service",
      label: "Shop service",
      messages: [
        "Smooth and quick service at {shop}. Everything was explained clearly.",
        "Really good shopping experience. Easy to try, choose and buy without any hassle.",
        "Great service from start to finish. Billing was fast and everything was transparent.",
        "Visited {shop} and loved the experience. Will definitely come back for more.",
      ],
    },
    {
      id: "staff",
      label: "Staff behaviour",
      messages: [
        "Very polite and helpful staff. They patiently showed every jersey without any pressure.",
        "The owner and staff are friendly and know their football. Great advice on choosing.",
        "Staff at {shop} were respectful and genuinely helpful. Felt welcome throughout.",
        "Loved the friendly behaviour of the team here. They made buying a jersey easy.",
      ],
    },
    {
      id: "delivery",
      label: "Delivery and packaging",
      messages: [
        "Jersey was packed neatly and arrived on time. Perfect condition, no folds or damage.",
        "Quick delivery and very careful packaging. Exactly what I ordered from {shop}.",
        "Great packaging and the jersey reached me safely. Smooth ordering through WhatsApp.",
        "Order was delivered fast and the packing was top notch. Highly recommended.",
      ],
    },
  ],
};
