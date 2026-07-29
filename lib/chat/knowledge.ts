import { SITE } from "@/lib/site";
import { GROUPS } from "@/data/treatments";

const TREATMENT_SUMMARY = GROUPS.map(
  (g) => `${g.title}: ${g.items.join(", ")}`,
).join("\n");

const FAQS = `
Q: Is homeopathy safe for children and the elderly?
A: Yes. Homeopathic medicines are highly diluted and act gently. They're safe for newborns, pregnant women, the elderly, and can be taken alongside most conventional medicines — but My First Care never names or recommends medicines; only the doctor does.

Q: How long does treatment usually take?
A: Acute issues like cold or fever may respond within days. Chronic conditions (skin, arthritis, asthma) typically improve over 3–9 months of consistent treatment under the doctor's care.

Q: Are there side effects?
A: Properly prescribed homeopathic remedies have no toxic side effects. Some patients experience a brief early aggravation. Medicine choices are only made by Dr. Paramjeet.

Q: Can I take homeopathy with my regular medication?
A: Often yes, but Dr. Paramjeet must review current medicines. Never stop prescribed medication without consulting a doctor.

Q: Dietary restrictions?
A: Patients are often asked to avoid strong substances like raw onion, garlic, coffee, mint, and tobacco around the time of taking remedies. Specific guidance is given in consultation.

Q: First consultation?
A: Usually 45–60 minutes. Dr. Paramjeet asks about symptoms, history, lifestyle, sleep, and emotional state. First consultation is free as advertised on the site.

Q: Online follow-ups?
A: Follow-ups can be arranged via WhatsApp for patients outside Hajipur. First visit preferred in person.

Q: How to book?
A: Appointments are booked ONLY via the official online booking form on the website (Book appointment button). My First Care cannot book or confirm slots in chat. After submitting the form, the clinic team confirms the appointment. Walk-ins are welcome but appointments are prioritized. For urgent help, call or WhatsApp the clinic.
`.trim();

export function buildClinicKnowledge(): string {
  return `
CLINIC KNOWLEDGE BASE (use only these facts; do not invent):

Brand: ${SITE.name} — "${SITE.tagline}"
Doctor: ${SITE.doctor}, Homeopathy Specialist
Flagship clinic: ${SITE.mainClinic}, ${SITE.city}
Address: ${SITE.address}
Phone: ${SITE.phone}
Email: ${SITE.email}
Hours: ${SITE.hours}
WhatsApp booking available
Instagram: ${SITE.instagram}
Stats: ${SITE.stats.years} years practice, ${SITE.stats.patients} patients, ~${SITE.stats.rating}★ rating
Award: Recognized; award associated with Kapil Dev mentioned on About page

Clinics:
${SITE.clinics
  .map(
    (c) =>
      `- ${c.name} (${c.location}) — ${c.address} [${c.status}${c.isFlagship ? ", flagship" : ""}]`,
  )
  .join("\n")}

Offers / services:
- First consultation free
- Personalized homeopathic care
- Medicine delivery / doorstep framing mentioned on site
- Video-call framing for remote access; first visit preferred in person
- Classical individualized homeopathy; long careful consultations

Treatment areas:
${TREATMENT_SUMMARY}

Doctor bio:
For more than two decades, Dr. Paramjeet has practiced at Prabhakar's Clinic, Hajipur. Practice defined by long consultations, classical prescribing, and respect for each patient's story. Timeline: began 1998; present clinic at Station Road from 2012; 2 lakh+ patients today.

FAQs:
${FAQS}

Site pages users may ask about: Home, About, The Doctor, Clinics, Treatments, Gallery, Contact.
`.trim();
}
