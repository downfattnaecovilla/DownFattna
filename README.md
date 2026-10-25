# Down Fattna Eco Villa - Official Website

A modern, responsive, eco-luxury website for **Down Fattna Eco Villa** located in **Deniyaya, Sri Lanka** (near Patna Sliding Rock and Sinharaja Rainforest).

Built using clean vanilla **HTML5**, **CSS3**, and **JavaScript** (no heavy frameworks or node dependencies required).

---

## 🌟 Key Features

1. **Brand & Nature Aesthetic**
   - Palette tailored for eco-tourism: Forest Emerald, Sage Green, Ceylon Gold, and Warm Sand.
   - Elegant typography with *Playfair Display* and *Plus Jakarta Sans*.

2. **Featured Amenities & Facilities**
   - 🌊 **River Bath Access**: Direct private access to natural mountain stream bathing with crystal clear freshwater pool and smooth river stones.
   - 🍳 **Guest Kitchen**: Equipped kitchen with refrigerator, gas stove, cookware, and tableware for self-catering or preparing group meals.
   - 🍃 **Naturally Cooled (Non-AC)**: Pure eco-living with whisper-quiet ceiling fans, airy wooden architecture, and fresh mountain breezes.
   - 🍖 **BBQ Grill**: Heavy-duty outdoor charcoal barbecue grill and campfire setup for evening cookouts under the stars.
   - 🚗 **Free On-Site Parking**: Secure, private, and complimentary vehicle parking for cars, vans, and SUVs.
   - 🔊 **JBL PartyBox**: High-power JBL PartyBox Bluetooth sound system with dynamic beat-synced lighting for birthday parties and pavilion celebrations.

3. **Quick Booking Bar & Live Price Calculator**
   - Interactive date pickers (Check-in / Check-out).
   - Room options:
     - Deluxe Eco Suite ($65 / night)
     - Forest View Family Villa ($110 / night)
     - Panoramic Sunset Cottage ($85 / night)
   - Add-on experiences: Outdoor BBQ Grill, JBL PartyBox, Sinharaja Rainforest Trek, Patna Rock Adventure, Airport Transfer.
   - **Direct WhatsApp Booking Engine**: Automatically computes the stay duration and total cost, then opens a pre-formatted WhatsApp message ready to send with 1 click to confirm with the villa host.

4. **Open-Air Wooden Dining Pavilion & Events**
   - Highlights Down Fattna's signature timber branch architecture, floating water lilies, and warm ambient Edison filament bulbs.
   - Interactive thumbnail switcher showcasing the spacious pavilion hall, banquet seating, and private party/celebration setups.
   - Farm-to-table authentic Sri Lankan village meals, clay pot curries, and Ceylon tea service.

5. **Interactive Photo Gallery with Lightbox**
   - 100% authentic property photography provided by the owner.
   - Filter categories: All Photos, Villa & Craft, Dining & Pavilion, Rainforest & Streams.
   - Fullscreen modal lightbox with Next/Previous arrows, keyboard navigation (`Esc`, `←`, `→`), and touch-friendly controls.

6. **Experiences & Deniyaya Regional Highlights**
   - Natural river bathing in pristine freshwater mountain streams.
   - Patna Sliding Rock (Patna Ella) guide (5 minutes away).
   - Sinharaja Rainforest UNESCO biosphere reserve guide (15-20 minutes away).
   - Palm-lined private driveway and Andaradeniya tea estate walks.
   - Starlit barbecue evenings and private gathering arrangements.

7. **Location & Interactive Map**
   - Embedded Google Map centered on Deniyaya / Andaradeniya Tea Factory Road.
   - Distance indicators to top local attractions.

8. **Guest Testimonials & FAQ Accordion**
   - Automated review carousel.
   - Smooth FAQ accordion answering travel, meal, river bathing, Non-AC, kitchen, BBQ, and parking questions.

9. **Mobile & Fast Performance**
   - 100% mobile responsive with smooth slide-out navigation drawer.
   - Real DSLR photos optimized from 250MB+ down to ~3.5MB total for lightning-fast sub-second loading without losing visual clarity.
   - Floating WhatsApp button for instant direct customer support.

---

## 📁 File Structure

```text
Down Fattna/
│
├── index.html          # Main homepage and all sections
├── css/
│   └── style.css       # Complete modern styling, layout & animations
├── js/
│   └── main.js         # Interactive calculator, WhatsApp booking, lightbox, scrollspy
├── images/             # Original high-res photographs provided by the villa owner
│   └── opt/            # Web-optimized high-speed responsive images (hero, dining, river, rooms)
└── README.md           # Documentation and quick customization guide
```

---

## 📞 Official Property Details & Contacts

- **Property Name:** Down Fattna Eco Villa
- **Address:** Down Fattna Eco Villa, Andaradeniya Rd, Deniyaya 81500, Southern Province, Sri Lanka
- **WhatsApp / Phone:** `+94 76 910 3981` / `+94 76 095 1659` (Local: `0769103981` / `0760951659`)
- **Email:** `downfattna.ecovilla@gmail.com`
- **WhatsApp Direct Link:** [wa.me/94769103981](https://wa.me/94769103981)

---

## ⚙️ Customization Guide

### 1. WhatsApp & Phone Numbers
The website is pre-configured with the host's direct numbers:
- Primary WhatsApp & Call: `+94 76 910 3981`
- Secondary Call: `+94 76 095 1659`
- To adjust the direct WhatsApp destination, edit `phoneNumber = '94769103981'` in `js/main.js`.

### 2. Update Room Prices & Add-ons
In `js/main.js`:
```javascript
const roomRates = {
  'deluxe-suite': { name: 'Deluxe Eco Suite', price: 65 },
  'family-villa': { name: 'Forest View Family Villa', price: 110 },
  'sunset-cottage': { name: 'Panoramic Sunset Cottage', price: 85 }
};
```
Change the `price` figures to match your current seasonal rates.

### 3. Property Images
The website uses authentic Down Fattna Eco Villa photographs stored in `images/` and pre-optimized in `images/opt/` for instant web performance. The full-resolution originals remain preserved in `images/`.

---

## 🚀 How to Run Locally

Simply double-click `index.html` in Windows File Explorer to open it in any web browser (Google Chrome, Microsoft Edge, Firefox, etc.).
