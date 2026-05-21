import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════
   STORE DATA — Real products from real stores we built
   ═══════════════════════════════════════════════════════════ */
const stores = [
  {
    id: 'nutanix',
    name: 'Nutanix',
    type: 'Corporate',
    tagline: 'Gear That Moves',
    description: 'Premium branded merchandise for the hybrid multicloud team — polos, outerwear, bags, and accessories fulfilled through their own private storefront.',
    url: 'https://nutanix-store.vercel.app',
    color: '#024DA1',
    products: ['Embroidered Polos', 'Quarter-Zip Pullover', 'Team Backpack', 'Custom Hats', 'Golf Bags'],
    categories: ['Polos', 'Shirts', 'Outerwear', 'Hats', 'Bags', 'Golf Bags', 'Accessories'],
    stat: '90+ SKUs',
    image: '/stores/nutanix-hero.jpg',
  },
  {
    id: 'eastwood',
    name: 'Eastwood Co. Supply',
    type: 'Creator',
    tagline: 'Western streetwear with attitude',
    description: 'Full apparel line for content creator @eastwood0100 — hoodies, crop tees, crewnecks, and matching sets with AI-generated lifestyle photography.',
    url: 'https://eastwood-store.vercel.app',
    color: '#8B6914',
    products: ['Eastwood Gang Hoodie — $72', 'Cowboy Pillows Crop Tee — $38', 'Somebody\'s Problem Crewneck — $64', 'Eastwood Sweats — $58'],
    categories: ['Hoodies', 'Tops & Tanks', 'Crewnecks', 'Bottoms', 'Sets'],
    stat: '12 Products',
    image: '/stores/eastwood-hero.jpg',
  },
  {
    id: 'clublumen',
    name: 'Club Lumen',
    type: 'Event',
    tagline: 'Dance Before Noon',
    description: 'Desert-disco morning rave merch — hoodies, crop tees, tumblers, and tote bags for the Phoenix, AZ party scene. Full dropshipping fulfillment.',
    url: 'https://clublumen-store.vercel.app',
    color: '#F27A3E',
    products: ['Good Energy Club Hoodie — $78', 'Move Your Body Tee — $46', 'Morning Rave Tumbler — $36', 'DJ Party Vibes Tote — $34'],
    categories: ['Tees', 'Crops & Tanks', 'Hoodies', 'Accessories'],
    stat: '9 Products',
    image: '/stores/clublumen-hero.jpg',
  },
  {
    id: 'shift',
    name: 'Shift',
    type: 'Brand',
    tagline: 'Your Mindset. Your Focus. Your Perspective.',
    description: 'Streetwear brand with heavyweight blanks, bold graphics, and full matching sets. Racing tees, city lifestyle, and colorway drops.',
    url: 'https://shift-store.vercel.app',
    color: '#0A0A0A',
    products: ['Shift Logo Crewneck — $68', 'Shift Logo Hoodie — $78', 'Racing Vintage Tee — $52', 'Shift Pink Collection — $78'],
    categories: ['Tees', 'Hoodies', 'Crewnecks', 'Bottoms', 'Headwear', 'Sets'],
    stat: '10 Products',
    image: '/stores/shift-hero.jpg',
  },
]

const services = [
  {
    title: 'Product Design',
    description: 'AI-powered mockups and design concepts for apparel, accessories, and hard goods. We create entire product lines from a single brand brief.',
  },
  {
    title: 'Sourcing & Production',
    description: 'We source from domestic suppliers, overseas manufacturers, and print-on-demand networks. Bulk pricing, quality samples, fast turnarounds.',
  },
  {
    title: 'Store Build',
    description: 'Custom-built branded storefronts — not cookie-cutter templates. Every store is designed to match your brand and convert buyers.',
  },
  {
    title: 'Warehousing & Fulfillment',
    description: 'We buy in bulk, store at our warehouse, and ship throughout the year. No minimum orders for your customers. We handle it all.',
  },
  {
    title: 'Dropshipping',
    description: 'For brands that don\'t want to hold inventory — orders ship directly from our production partners to your customer\'s door.',
  },
  {
    title: 'Corporate Programs',
    description: 'Employee stores with credit systems, new hire kits, event merch, and ongoing replenishment. Built for companies that take culture seriously.',
  },
]

const stats = [
  { number: '4', label: 'Live Stores' },
  { number: '120+', label: 'Products Created' },
  { number: '7', label: 'Supplier Networks' },
  { number: '∞', label: 'Custom Possibilities' },
]

/* ═══════════════════════════════════════════════════════════
   FEATURED PRODUCTS — Real items from the stores
   ═══════════════════════════════════════════════════════════ */
const featuredProducts = [
  {
    name: 'Eastwood Gang Hoodie',
    price: '$72',
    store: 'Eastwood Co.',
    image: 'https://eastwood-store.vercel.app/lifestyle/gang-hoodie-miami-night.png',
  },
  {
    name: 'Good Energy Club Hoodie',
    price: '$78',
    store: 'Club Lumen',
    image: 'https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png',
  },
  {
    name: 'Shift Logo Crewneck',
    price: '$68',
    store: 'Shift',
    image: 'https://shift-store.vercel.app/lifestyle/pizza-shop.png',
  },
  {
    name: 'Cowboy Pillows Crop Tee',
    price: '$38',
    store: 'Eastwood Co.',
    image: 'https://eastwood-store.vercel.app/lifestyle/cowboy-pillows-camp1.png',
  },
  {
    name: 'Morning Rave Hoodie',
    price: '$72',
    store: 'Club Lumen',
    image: 'https://clublumen-store.vercel.app/products/morning-rave-hoodie-lifestyle.png',
  },
  {
    name: 'Shift Racing Vintage Tee',
    price: '$52',
    store: 'Shift',
    image: 'https://shift-store.vercel.app/lifestyle/car-meet.png',
  },
  {
    name: 'Move Your Body Tee',
    price: '$46',
    store: 'Club Lumen',
    image: 'https://clublumen-store.vercel.app/products/move-body-tee-lifestyle.png',
  },
  {
    name: 'Somebody\'s Problem Crewneck',
    price: '$64',
    store: 'Eastwood Co.',
    image: 'https://eastwood-store.vercel.app/lifestyle/somebodys-problem-bar.jpeg',
  },
]

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStore, setActiveStore] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', details: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="app">

      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <div className="announcement-bar">
        <p>Now accepting new clients for Q3 2026 — <a href="#contact" onClick={() => setMenuOpen(false)}>Book your spot</a></p>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="header">
        <div className="header-inner">
          <a href="#" className="logo">
            <span className="logo-create">Create</span>
            <span className="logo-amp">&</span>
            <span className="logo-source">Source</span>
          </a>

          <nav className="nav-desktop">
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact" className="nav-cta">Start a Project</a>
          </nav>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
              <span /><span /><span />
            </div>
          </button>
        </div>
      </header>

      {/* ═══ MOBILE NAV ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
            <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mobile-cta">Start a Project</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-bg" style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="hero-gradient" />
        </motion.div>
        <div className="hero-content">
          <motion.p
            className="hero-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Custom Merch, Sourced & Shipped
          </motion.p>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We build <em>branded stores</em> and ship the product{' '}
            <span className="hero-italic">so you don't have to.</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            From product design to warehouse fulfillment — we handle the entire merch operation for creators, companies, and brands.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="#contact" className="btn-primary">Start Your Store</a>
            <a href="#portfolio" className="btn-secondary">See Our Work</a>
          </motion.div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(3)].map((_, r) =>
            ['Product Design', 'AI Mockups', 'Sourcing', 'Store Build', 'Warehousing', 'Fulfillment', 'Dropshipping', 'Corporate Programs'].map((t, i) => (
              <span key={`${r}-${i}`} className="ticker-item">
                {t}<span className="ticker-dot" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ═══ INTRO STATEMENT ═══ */}
      <section className="intro">
        <motion.div
          className="intro-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="intro-label">The full-service merch partner</p>
          <h2 className="intro-headline">
            We don't just design merch — we <em>source it, stock it, and ship it.</em> Your brand, our operation. From concept to doorstep.
          </h2>
        </motion.div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="services-section">
        <div className="section-header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            End-to-end merch operations
          </motion.h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ EDITORIAL BREAK — BIG QUOTE ═══ */}
      <section className="editorial-quote">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <blockquote className="big-quote">
            "We create entire product lines from a single brand brief — design, source, warehouse, and ship. Our clients never touch a box."
          </blockquote>
          <p className="quote-attr">— Tovah Marx, Founder</p>
        </motion.div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" className="portfolio-section">
        <div className="section-header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Stores we've built
          </motion.h2>
          <motion.p
            className="section-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Every store is custom-designed, fully stocked, and ready to sell.
          </motion.p>
        </div>

        {/* Store selector tabs */}
        <div className="store-tabs">
          {stores.map((store, i) => (
            <button
              key={store.id}
              className={`store-tab ${activeStore === i ? 'active' : ''}`}
              onClick={() => setActiveStore(i)}
            >
              <span className="tab-type">{store.type}</span>
              <span className="tab-name">{store.name}</span>
            </button>
          ))}
        </div>

        {/* Active store showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stores[activeStore].id}
            className="store-showcase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="showcase-content">
              <span className="showcase-type">{stores[activeStore].type} Store</span>
              <h3 className="showcase-name">{stores[activeStore].name}</h3>
              <p className="showcase-tagline">{stores[activeStore].tagline}</p>
              <p className="showcase-desc">{stores[activeStore].description}</p>

              <div className="showcase-categories">
                {stores[activeStore].categories.map((cat, i) => (
                  <span key={i} className="category-tag">{cat}</span>
                ))}
              </div>

              <div className="showcase-products">
                <p className="showcase-products-title">Featured Products</p>
                {stores[activeStore].products.map((p, i) => (
                  <p key={i} className="showcase-product-item">{p}</p>
                ))}
              </div>

              <div className="showcase-footer">
                <span className="showcase-stat">{stores[activeStore].stat}</span>
                <a
                  href={stores[activeStore].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-link"
                >
                  Visit Store &rarr;
                </a>
              </div>
            </div>

            <div className="showcase-visual">
              <div className="browser-frame">
                <div className="browser-dots">
                  <span /><span /><span />
                </div>
                <div className="browser-url">{stores[activeStore].url.replace('https://', '')}</div>
              </div>
              <div className="browser-content">
                <iframe
                  src={stores[activeStore].url}
                  title={stores[activeStore].name}
                  className="store-iframe"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ═══ PRODUCTS WE'VE CREATED ═══ */}
      <section id="products" className="products-section">
        <div className="section-header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Products We've Created
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Real products, real stores
          </motion.h2>
        </div>

        <div className="products-grid">
          {featuredProducts.map((p, i) => (
            <motion.div
              key={i}
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
            >
              <div className="product-img-wrap">
                <img src={p.image} alt={p.name} className="product-img" loading="lazy" />
              </div>
              <div className="product-info">
                <p className="product-store">{p.store}</p>
                <p className="product-name">{p.name}</p>
                <p className="product-price">{p.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="process-section">
        <div className="section-header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            From idea to <em>shipped</em>
          </motion.h2>
        </div>

        <div className="process-steps">
          {[
            { step: '01', title: 'Tell us about your brand', desc: 'Share your vision, logo, audience, and vibe. We handle the rest.' },
            { step: '02', title: 'We design your products', desc: 'AI-powered mockups and curated product selections tailored to your brand.' },
            { step: '03', title: 'We build your store', desc: 'A custom branded storefront — designed, built, and deployed for you.' },
            { step: '04', title: 'We source & stock', desc: 'Bulk orders from our supplier network. Inventory stored at our warehouse.' },
            { step: '05', title: 'Orders ship automatically', desc: 'Customers order, we ship. Dropshipping or warehouse fulfillment — your choice.' },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="process-step"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="step-number">{s.step}</span>
              <div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">About Us</p>
            <h2 className="about-headline">
              Built by a merch operator, <em>not a tech company.</em>
            </h2>
            <p className="about-body">
              Create & Source started because we were tired of seeing brands struggle with merch. The design process takes forever, minimums are too high, fulfillment is a nightmare, and most "merch companies" just slap a logo on a template.
            </p>
            <p className="about-body">
              We do it differently. We source from 7+ supplier networks, create AI-powered product mockups, build custom storefronts, and warehouse your inventory. When your customer orders, we ship it from our facility.
            </p>
            <p className="about-body">
              We've built stores for tech companies, content creators, event brands, and streetwear labels. Every one is custom. Every product is curated. And you never have to touch a single box.
            </p>
            <div className="about-values">
              <span>Real Products</span>
              <span>Real Stores</span>
              <span>Real Fulfillment</span>
            </div>
          </motion.div>
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-collage">
              <div className="collage-item collage-1">
                <img src="https://eastwood-store.vercel.app/lifestyle/gang-hoodie.png" alt="Eastwood hoodie" loading="lazy" />
              </div>
              <div className="collage-item collage-2">
                <img src="https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png" alt="Club Lumen hoodie" loading="lazy" />
              </div>
              <div className="collage-item collage-3">
                <img src="https://shift-store.vercel.app/lifestyle/nyc-crosswalk.png" alt="Shift hoodie" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT / CTA ═══ */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <motion.div
            className="contact-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Start a Project</p>
            <h2 className="contact-headline">
              Let's build something <em>worth wearing.</em>
            </h2>
            <p className="contact-desc">
              Tell us about your brand and we'll put together a custom merch plan — product recommendations, pricing, and a timeline. No commitment, no minimums to start.
            </p>
            <div className="contact-details">
              <p>Scottsdale, Arizona</p>
              <p>hello@createandsource.com</p>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-check">&#10003;</div>
                <h3>We got it.</h3>
                <p>We'll be in touch within 24 hours with a custom plan for your brand.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@brand.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Brand / Company</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Your brand name"
                  />
                </div>
                <div className="form-group">
                  <label>Tell us about your project</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.details}
                    onChange={e => setFormData({ ...formData, details: e.target.value })}
                    placeholder="What kind of merch are you looking for? Who is it for? Any specific products in mind?"
                  />
                </div>
                <button type="submit" className="btn-primary btn-full">Send It &rarr;</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <span className="logo-create">Create</span>
              <span className="logo-amp">&</span>
              <span className="logo-source">Source</span>
            </div>
            <p className="footer-desc">Custom merch, sourced & shipped. From product design to warehouse fulfillment.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-title">Navigate</p>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#products">Products</a>
              <a href="#about">About</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Connect</p>
              <a href="#contact">Start a Project</a>
              <a href="mailto:hello@createandsource.com">Email Us</a>
              <p className="footer-location">Scottsdale, AZ</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Create & Source. All rights reserved.</p>
          <p>A Brands By Status company.</p>
        </div>
      </footer>
    </div>
  )
}
