import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Bath,
  Brush,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Droplets,
  Home,
  Instagram,
  Leaf,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  LayoutGrid,
  Truck,
  X
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || "916385180325";
const ALT_WHATSAPP = import.meta.env.VITE_WHATSAPP_ALT_NUMBER || "916385170325";
const INSTAGRAM = import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/alltimecleaningservice/";

const services = [
  { title: "Home Deep Cleaning", icon: Home, text: "Detailed cleaning for bedrooms, living rooms, floors and high-touch areas." },
  { title: "Kitchen Cleaning", icon: Sparkles, text: "Degreasing, cabinets, counters, sinks and hard-to-reach kitchen areas." },
  { title: "Toilet & Bathroom", icon: Bath, text: "Deep sanitisation, tile cleaning, fixtures and stain removal." },
  { title: "Water Tank Cleaning", icon: Droplets, text: "Professional tank cleaning to remove dirt, sludge and buildup." },
  { title: "Sump Cleaning", icon: Droplets, text: "Thorough sump cleaning for cleaner and safer water storage." },
  { title: "Tiles Cleaning", icon: LayoutGrid, text: "Restore tile surfaces and grout with professional cleaning methods." },
  { title: "Garden Cleaning", icon: Leaf, text: "Garden cleanup, trimming support and removal of unwanted waste." },
  { title: "Home Shifting", icon: Truck, text: "Reliable packing, loading, moving and setup support for your home shift." }
];

const gallery = [
  ["/assets/before-after.png", "Before & After", "See the transformation"],
  ["/assets/special-services.png", "Specialized Services", "Tiles, garden & shifting"],
  ["/assets/team.png", "Cleaning Team", "Professional service support"],
  ["/assets/service-collage.png", "Cleaning Solutions", "Cleaning for every space"]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Home Deep Cleaning",
    date: "",
    time: "",
    address: "",
    notes: ""
  });

  const whatsappLink = useMemo(() => {
    const text = encodeURIComponent(
      `Hello All Time Cleaning Service! I would like to book a cleaning service.\n\nName: ${form.name || "-"}\nPhone: ${form.phone || "-"}\nService: ${form.service}\nPreferred date: ${form.date || "-"}\nPreferred time: ${form.time || "-"}\nAddress: ${form.address || "-"}\nNotes: ${form.notes || "-"}`
    );
    return `https://wa.me/${WHATSAPP}?text=${text}`;
  }, [form]);

  const directWhatsApp = `https://wa.me/${WHATSAPP}`;
  const altWhatsApp = `https://wa.me/${ALT_WHATSAPP}`;

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitBooking = async (e) => {
    e.preventDefault();
    setStatus("Preparing your WhatsApp booking...");

    try {
      await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
    } catch {
      // WhatsApp booking should still work if the API/MongoDB is temporarily unavailable.
    }

    setStatus("Opening WhatsApp...");
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="All Time Cleaning Service home">
            <img src="/assets/logo.jpg" alt="All Time Cleaning Service logo" />
            <div>
              <strong>ALL TIME</strong>
              <span>CLEANING SERVICE</span>
            </div>
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("results")}>Our Work</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
            <button className="nav-book" onClick={() => setBookingOpen(true)}>
              Book Now
            </button>
          </nav>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow one" />
          <div className="hero-glow two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={16} /> YOUR CLEANLINESS, OUR COMMITMENT</div>
              <h1>Professional Cleaning.<br /><span>Fresh Home.</span><br />Peace of Mind.</h1>
              <p>
                Trusted cleaning services for homes and businesses across Vellore.
                We bring the right tools, trained hands and attention to detail to every job.
              </p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => setBookingOpen(true)}>
                  Book on WhatsApp <ArrowRight size={19} />
                </button>
                <a className="secondary-btn" href={`tel:+${WHATSAPP}`}>
                  <Phone size={18} /> Call Now
                </a>
              </div>
              <div className="trust-row">
                <div><CheckCircle2 /> Home & Commercial</div>
                <div><CheckCircle2 /> Flexible Booking</div>
                <div><CheckCircle2 /> Professional Team</div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <img src="/assets/cleaner.png" alt="Professional cleaner with cleaning equipment" />
              </div>
              <div className="floating-card">
                <div className="round-icon"><Brush size={20} /></div>
                <div><b>Clean spaces.</b><span>Happy people.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="poster-strip">
          <div className="container poster-grid">
            <img src="/assets/poster-front.jpeg" alt="All Time Cleaning Service original poster" />
            <div className="poster-copy">
  <span className="section-kicker">WELCOME TO ALL TIME CLEANING SERVICE</span>

  <h2>Professional Cleaning Services in Vellore</h2>

  <p>
    ALL TIME CLEANING SERVICE is a trusted cleaning company serving Vellore,
    Anaicut, Govindareddypalayam and nearby areas. We provide high-quality
    residential and commercial cleaning services with experienced staff and
    modern cleaning equipment.
  </p>

  <p>
    We specialize in Home Deep Cleaning, Kitchen Cleaning, Toilet & Bathroom
    Cleaning, Water Tank Cleaning, Sump Cleaning, Tiles Cleaning, Garden
    Cleaning and Home Shifting Services.
  </p>

  <p>
    Our mission is to keep every home and workplace clean, hygienic and fresh.
    Customer satisfaction is our first priority.
  </p>

  <button className="text-btn" onClick={() => scrollTo("services")}>
    View Our Services <ArrowRight size={17} />
  </button>
</div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">WHAT WE DO</span>
              <h2>Cleaning services for <span>every corner.</span></h2>
              <p>From everyday deep cleaning to tanks, gardens and shifting — choose the service you need.</p>
            </div>
            <div className="services-grid">
              {services.map(({ title, icon: Icon, text }) => (
                <article className="service-card" key={title}>
                  <div className="service-icon"><Icon size={25} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <button onClick={() => { setForm({ ...form, service: title }); setBookingOpen(true); }}>
                    Book this service <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="section results-section">
          <div className="container">
            <div className="section-heading split">
              <div>
                <span className="section-kicker">OUR WORK</span>
                <h2>See the <span>difference.</span></h2>
              </div>
              <p>
                
  Explore our real cleaning transformations including Bathroom Cleaning, Kitchen Cleaning, Water Tank Cleaning, Tiles Cleaning, Garden Cleaning and Home Shifting Services completed across Vellore and nearby areas.
</p>
              
            </div>
            <div className="gallery-grid">
              {gallery.map(([src, title, text], index) => (
                <article className={`gallery-card gallery-${index + 1}`} key={src}>
                  <img src={src} alt={title} />
                  <div className="gallery-overlay">
                    <span>{title}</span>
                    <b>{text}</b>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-banner">
          <div className="container booking-inner">
            <div>
              <span className="section-kicker light">READY WHEN YOU ARE</span>
              <h2>Tell us what needs cleaning.</h2>
              <p>Choose a service, select a preferred time and continue straight to WhatsApp.</p>
            </div>
            <button className="white-btn" onClick={() => setBookingOpen(true)}>
              <MessageCircle size={20} /> Book via WhatsApp
            </button>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <span className="section-kicker">CONTACT</span>
              <h2>Let’s make your space <span>shine.</span></h2>
              <p className="contact-lead">
                Call us directly or send your booking details through WhatsApp. For updates and
                service photos, follow us on Instagram.
              </p>

              <div className="contact-items">
                <a href={`tel:+${WHATSAPP}`}><span><Phone /></span><div><small>CALL / WHATSAPP</small><b>+91 63851 80325</b></div></a>
                <a href={`tel:+${ALT_WHATSAPP}`}><span><Phone /></span><div><small>ALTERNATE NUMBER</small><b>+91 63851 70325</b></div></a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer"><span><Instagram /></span><div><small>INSTAGRAM</small><b>Follow our work</b></div></a>
              </div>
            </div>

            <div className="address-card">
              <div className="address-icon"><Home /></div>
              <span>OUR LOCATION</span>
              <h3>Govindareddypalayam</h3>
              <p>130/4 Bharathiyar Street,<br />Govindareddypalayam, Anaicut Taluk,<br />Vellore District – 632105.</p>
              <div className="mini-actions">
                <a href={directWhatsApp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div><b>ALL TIME CLEANING SERVICE</b><span>Your Cleanliness, Our Commitment</span></div>
          <div>© {new Date().getFullYear()} All Time Cleaning Service</div>
        </div>
      </footer>

      <a className="whatsapp-float" href={directWhatsApp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <MessageCircle size={28} />
      </a>

      {bookingOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setBookingOpen(false)}>
          <div className="booking-modal">
            <button className="close-modal" onClick={() => setBookingOpen(false)} aria-label="Close"><X /></button>
            <div className="modal-heading">
              <span className="section-kicker">WHATSAPP BOOKING</span>
              <h2>Book your cleaning.</h2>
              <p>Fill this once and we'll open WhatsApp with your booking details.</p>
            </div>
            <form onSubmit={submitBooking}>
              <div className="form-row">
                <label>Name<input required name="name" value={form.name} onChange={update} placeholder="Your name" /></label>
                <label>Phone<input required name="phone" value={form.phone} onChange={update} placeholder="10-digit mobile number" /></label>
              </div>
              <div className="form-row">
                <label>Service
                  <select name="service" value={form.service} onChange={update}>
                    {services.map(s => <option key={s.title}>{s.title}</option>)}
                  </select>
                </label>
                <label>Preferred date<input type="date" required name="date" value={form.date} onChange={update} /></label>
              </div>
              <div className="form-row">
                <label>Preferred time<input type="time" name="time" value={form.time} onChange={update} /></label>
                <label>Address<input required name="address" value={form.address} onChange={update} placeholder="Service address" /></label>
              </div>
              <label>Notes<textarea name="notes" value={form.notes} onChange={update} placeholder="Anything we should know?"></textarea></label>
              <button className="primary-btn full" type="submit"><MessageCircle size={19} /> Continue to WhatsApp</button>
              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
