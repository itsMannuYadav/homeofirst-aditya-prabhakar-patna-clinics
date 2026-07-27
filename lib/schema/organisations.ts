export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",

  name: "Homeofirst",

  url: "https://homeofirst.in",

  logo: "https://homeofirst.in/assets/HomeoFirstLogo.jpg",

  image: "https://homeofirst.in/assets/dr-paramjeet.jpg",

  description:
    "Online homeopathic consultation platform offering expert treatment for skin diseases, hair problems, arthritis and chronic illnesses.",

  telephone: "+919135109967",

  email: "contact@homeofirst.in",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Hajipur",
    addressRegion: "Bihar",
    addressCountry: "IN"
  },

  sameAs: [
    "https://www.instagram.com/homeofirst._",
    "https://facebook.com/homeofirst._"
  ]
};