/* =========================================================================
   STORE SETTINGS — this is the only file you need to edit to run your shop.
   ========================================================================= */
window.STORE = {
  brand: "PeakFlow",                       // Your business name
  tagline: "Bottles built for training.",
  email: "orders@example.com",             // Where customers contact you / order requests go
  currency: "USD",                         // USD, EUR, GBP, ...
  locale: "en-US",
  freeShippingFrom: 50,                    // Shown in banner; set to 0 to hide
  instagram: "",                           // e.g. "https://instagram.com/yourbrand" (leave "" to hide)

  /* PRODUCTS
     - price: number in your currency (display only — Stripe charges what you set there)
     - stripeLink: paste the Stripe Payment Link for this product (https://buy.stripe.com/...)
       If left empty, the "Buy" button opens a pre-filled order email instead.
     - shape: steel | shaker | jug | bundle   (controls the illustration)
  */
  products: [
    {
      id: "core-steel",
      name: "Core Steel 750ml",
      price: 29,
      color: "#c6ff3d",
      shape: "steel",
      badge: "Bestseller",
      short: "Double-wall insulated. Cold for 24h, hot for 12h.",
      features: ["18/8 stainless steel", "Leak-proof sport cap", "BPA-free, fits car holders"],
      stripeLink: ""
    },
    {
      id: "shaker-pro",
      name: "Shaker Pro 700ml",
      price: 19,
      color: "#3dd6ff",
      shape: "shaker",
      badge: "",
      short: "Lump-free protein shakes with a steel whisk ball.",
      features: ["Stainless whisk ball", "Twist-lock, leak-proof lid", "Dishwasher safe"],
      stripeLink: ""
    },
    {
      id: "gallon",
      name: "Hydro Gallon 2.2L",
      price: 34,
      color: "#ff7a3d",
      shape: "jug",
      badge: "New",
      short: "Hourly time markers to hit your daily water goal.",
      features: ["Motivational time markers", "Carry handle + straw lid", "Tritan, BPA-free"],
      stripeLink: ""
    },
    {
      id: "bundle",
      name: "Gym Starter Bundle",
      price: 69,
      oldPrice: 82,
      color: "#b06bff",
      shape: "bundle",
      badge: "Save 15%",
      short: "Core Steel + Shaker Pro + Hydro Gallon.",
      features: ["All three bottles", "Free shipping", "Gift-ready box"],
      stripeLink: ""
    }
  ]
};
