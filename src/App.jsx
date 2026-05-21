import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════
   STORE DATA — No prices, no URLs exposed
   ═══════════════════════════════════════════════════════════ */
const stores = [
  {
    id: 'nutanix',
    name: 'Nutanix',
    type: 'Corporate',
    tagline: 'Gear That Moves',
    description: 'Premium branded merchandise for a hybrid multicloud team — polos, outerwear, bags, and accessories fulfilled through their own private storefront with employee request system.',
    embed: 'https://nutanix-store.vercel.app',
    products: ['Embroidered Polos', 'Quarter-Zip Pullover', 'Team Backpack', 'Custom Hats', 'Golf Bags'],
    categories: ['Polos', 'Shirts', 'Outerwear', 'Hats', 'Bags', 'Golf Bags', 'Accessories'],
    stat: '90+ SKUs',
  },
  {
    id: 'eastwood',
    name: 'Eastwood Co. Supply',
    type: 'Creator',
    tagline: 'Michigan to Miami',
    description: 'Full apparel line for content creator @eastwood0100 — hoodies, crop tees, crewnecks, and matching sets. AI-generated lifestyle photography with a western streetwear aesthetic.',
    embed: 'https://eastwood-store.vercel.app',
    products: ['Eastwood Gang Hoodie', 'Cowboy Pillows Crop Tee', 'Somebody\'s Problem Crewneck', 'Eastwood Sweats'],
    categories: ['Hoodies', 'Tops & Tanks', 'Crewnecks', 'Bottoms', 'Sets'],
    stat: '12 Products',
  },
  {
    id: 'clublumen',
    name: 'Club Lumen',
    type: 'Event',
    tagline: 'Dance Before Noon',
    description: 'Desert-disco morning rave merch — hoodies, crop tees, tumblers, and tote bags for the Phoenix, AZ party scene. Full dropshipping fulfillment, zero inventory held.',
    embed: 'https://clublumen-store.vercel.app',
    products: ['Good Energy Club Hoodie', 'Move Your Body Tee', 'Morning Rave Tumbler', 'DJ Party Vibes Tote'],
    categories: ['Tees', 'Crops & Tanks', 'Hoodies', 'Accessories'],
    stat: '9 Products',
  },
  {
    id: 'shift',
    name: 'Shift',
    type: 'Brand',
    tagline: 'Life Keeps Moving',
    description: 'Streetwear brand with heavyweight blanks, bold graphics, and full matching sets. Racing tees, city lifestyle, colorway drops, and a trucker cap.',
    embed: 'https://shift-store.vercel.app',
    products: ['Shift Logo Crewneck', 'Shift Logo Hoodie', 'Racing Vintage Tee', 'Shift Pink Collection'],
    categories: ['Tees', 'Hoodies', 'Crewnecks', 'Bottoms', 'Headwear', 'Sets'],
    stat: '10 Products',
  },
  {
    id: 'stef',
    name: "Stef's Kitchen",
    type: 'Artist',
    tagline: 'Where The Hooks Get Cooked',
    description: 'Merch store and artist site for $tef the Chef — viral jingle creator from Jackson, MS. Tees, hoodies, and a varsity jacket. Integrated with Shopify for real checkout.',
    embed: 'https://stefs-kitchen.vercel.app/home',
    products: ['Too Blessed 2 Be Stressed Tee', 'Bad Breath Kickback Hoodie', 'Kitchen\'s Cookin\' Jacket', 'Smooth Ride Hoodie'],
    categories: ['Tees', 'Hoodies', 'Outerwear', 'Accessories'],
    stat: '14 Products',
  },
]

const stats = [
  { number: '5', label: 'Live Stores' },
  { number: '120+', label: 'Products Created' },
  { number: '7', label: 'Supplier Networks' },
  { number: '∞', label: 'Custom Possibilities' },
]

/* ═══════════════════════════════════════════════════════════
   PHOTO MOSAIC — Product images from all stores (no prices)
   ═══════════════════════════════════════════════════════════ */
const mosaicPhotos = [
  { src: 'https://eastwood-store.vercel.app/lifestyle/gang-hoodie-miami-night.png', store: 'Eastwood Co.', name: 'Eastwood Gang Hoodie' },
  { src: 'https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png', store: 'Club Lumen', name: 'Good Energy Club Hoodie' },
  { src: 'https://shift-store.vercel.app/lifestyle/pizza-shop.png', store: 'Shift', name: 'Shift Logo Crewneck' },
  { src: 'https://stefs-kitchen.vercel.app/images/too-blessed-tee-neon.png', store: "Stef's Kitchen", name: 'Too Blessed Tee' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/cowboy-pillows-camp1.png', store: 'Eastwood Co.', name: 'Cowboy Pillows Crop' },
  { src: 'https://clublumen-store.vercel.app/products/morning-rave-hoodie-lifestyle.png', store: 'Club Lumen', name: 'Morning Rave Hoodie' },
  { src: 'https://shift-store.vercel.app/lifestyle/nyc-crosswalk.png', store: 'Shift', name: 'Shift Logo Hoodie' },
  { src: 'https://stefs-kitchen.vercel.app/images/kitchens-cookin-jacket-nyc.png', store: "Stef's Kitchen", name: "Kitchen's Cookin' Jacket" },
  { src: 'https://eastwood-store.vercel.app/lifestyle/cowgirl-hoodie-back.png', store: 'Eastwood Co.', name: 'Cowgirl Fancy Hoodie' },
  { src: 'https://clublumen-store.vercel.app/products/move-body-tee-lifestyle.png', store: 'Club Lumen', name: 'Move Your Body Tee' },
  { src: 'https://shift-store.vercel.app/lifestyle/car-meet.png', store: 'Shift', name: 'Racing Vintage Tee' },
  { src: 'https://stefs-kitchen.vercel.app/images/bad-breath-hoodie-dock.png', store: "Stef's Kitchen", name: 'Bad Breath Hoodie' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/somebodys-problem-crew.png', store: 'Eastwood Co.', name: "Somebody's Problem Crew" },
  { src: 'https://clublumen-store.vercel.app/products/disco-crop-lifestyle.png', store: 'Club Lumen', name: 'Disco Ball Crop Tee' },
  { src: 'https://shift-store.vercel.app/lifestyle/convertible-pink-red.png', store: 'Shift', name: 'Pink Collection' },
  { src: 'https://stefs-kitchen.vercel.app/images/smooth-ride-hoodie-cars.png', store: "Stef's Kitchen", name: 'Smooth Ride Hoodie' },
]

const featuredProducts = [
  { name: 'Eastwood Gang Hoodie', store: 'Eastwood Co.', image: 'https://eastwood-store.vercel.app/lifestyle/gang-hoodie-miami-night.png' },
  { name: 'Good Energy Club Hoodie', store: 'Club Lumen', image: 'https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png' },
  { name: 'Shift Logo Crewneck', store: 'Shift', image: 'https://shift-store.vercel.app/lifestyle/pizza-shop.png' },
  { name: "Kitchen's Cookin' Jacket", store: "Stef's Kitchen", image: 'https://stefs-kitchen.vercel.app/images/kitchens-cookin-jacket-nyc.png' },
  { name: 'Cowboy Pillows Crop Tee', store: 'Eastwood Co.', image: 'https://eastwood-store.vercel.app/lifestyle/cowboy-pillows-camp1.png' },
  { name: 'Morning Rave Hoodie', store: 'Club Lumen', image: 'https://clublumen-store.vercel.app/products/morning-rave-hoodie-lifestyle.png' },
  { name: 'Shift Racing Vintage Tee', store: 'Shift', image: 'https://shift-store.vercel.app/lifestyle/car-meet.png' },
  { name: 'Too Blessed Tee', store: "Stef's Kitchen", image: 'https://stefs-kitchen.vercel.app/images/too-blessed-tee-neonbar.png' },
  { name: 'Move Your Body Tee', store: 'Club Lumen', image: 'https://clublumen-store.vercel.app/products/move-body-tee-lifestyle.png' },
  { name: "Somebody's Problem Crewneck", store: 'Eastwood Co.', image: 'https://eastwood-store.vercel.app/lifestyle/somebodys-problem-bar.jpeg' },
  { name: 'Smooth Ride Hoodie', store: "Stef's Kitchen", image: 'https://stefs-kitchen.vercel.app/images/smooth-ride-hoodie-frontback.png' },
  { name: 'Shift Pink Collection', store: 'Shift', image: 'https://shift-store.vercel.app/lifestyle/convertible-pink-red.png' },
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
    document.body.style.overflow = menuOpen ? 'hidden' : ''
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
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
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
          <motion.div className="mobile-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
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
          <motion.p className="hero-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            Custom Merch, Sourced & Shipped
          </motion.p>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            We build <em>branded stores</em> and ship the product{' '}
            <span className="hero-italic">so you don't have to.</span>
          </motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            From product design to warehouse fulfillment — we handle the entire merch operation for creators, companies, and brands.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
            <a href="#contact" className="btn-primary">Start Your Store</a>
            <a href="#portfolio" className="btn-secondary">See Our Work</a>
          </motion.div>
        </div>
      </section>

      {/* ═══ PHOTO MOSAIC — right after hero ═══ */}
      <section id="work" className="mosaic-section">
        <div className="mosaic-grid">
          {mosaicPhotos.map((photo, i) => (
            <motion.div
              key={i}
              className="mosaic-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}
            >
              <img src={photo.src} alt={photo.name} loading="lazy" />
              <div className="mosaic-overlay">
                <span className="mosaic-store">{photo.store}</span>
                <span className="mosaic-name">{photo.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(3)].map((_, r) =>
            ['Product Design', 'AI Mockups', 'Sourcing', 'Store Build', 'Warehousing', 'Fulfillment', 'Dropshipping', 'Corporate Programs'].map((t, i) => (
              <span key={`${r}-${i}`} className="ticker-item">{t}<span className="ticker-dot" /></span>
            ))
          )}
        </div>
      </div>

      {/* ═══ INTRO ═══ */}
      <section className="intro">
        <motion.div className="intro-inner" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
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
            <motion.div key={i} className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES — Editorial, not boring ═══ */}
      <section id="services" className="services-section">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>What We Do</motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Everything between <em>your idea</em> and their doorstep
          </motion.h2>
        </div>

        <div className="services-editorial">
          {[
            { keyword: 'Design', headline: 'We design entire product lines from a single brand brief.', body: 'AI-powered mockups. Curated product selections. Apparel, accessories, hard goods — whatever your brand needs, we create it.' },
            { keyword: 'Source', headline: 'We source from 7+ supplier networks worldwide.', body: 'Domestic, overseas, print-on-demand. We find the best price at the best quality and handle samples, production, and delivery.' },
            { keyword: 'Build', headline: 'We build custom storefronts that actually convert.', body: 'Not templates. Not Shopify themes. Fully custom, branded storefronts designed and built from scratch for your audience.' },
            { keyword: 'Store', headline: 'We warehouse your inventory and ship all year.', body: 'Buy in bulk at better prices. We store it at our facility and fulfill orders as they come in. Your customers get fast shipping, you get zero headaches.' },
            { keyword: 'Ship', headline: 'Orders go out automatically.', body: 'Dropshipping or warehouse fulfillment — customer orders, we ship. Tracking numbers, delivery confirmation, the whole thing. You never touch a box.' },
          ].map((s, i) => (
            <motion.div key={i} className="service-editorial-row" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
              <div className="service-keyword">{s.keyword}</div>
              <div className="service-text">
                <h3 className="service-headline">{s.headline}</h3>
                <p className="service-body">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ EDITORIAL QUOTE ═══ */}
      <section className="editorial-quote">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <blockquote className="big-quote">
            "We create entire product lines from a single brand brief — design, source, warehouse, and ship. Our clients never touch a box."
          </blockquote>
          <p className="quote-attr">— Tovah Marx, Founder</p>
        </motion.div>
      </section>

      {/* ═══ PORTFOLIO — Interactive embedded stores ═══ */}
      <section id="portfolio" className="portfolio-section">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our Work</motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>Stores we've built</motion.h2>
          <motion.p className="section-sub" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Every store is custom-designed, fully stocked, and ready to sell.
          </motion.p>
        </div>

        {/* Store selector */}
        <div className="store-selector">
          {stores.map((store, i) => (
            <button key={store.id} className={`store-pill ${activeStore === i ? 'active' : ''}`} onClick={() => setActiveStore(i)}>
              <span className="pill-name">{store.name}</span>
              <span className="pill-type">{store.type}</span>
            </button>
          ))}
        </div>

        {/* Active store */}
        <AnimatePresence mode="wait">
          <motion.div key={stores[activeStore].id} className="store-showcase" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            {/* Mobile store name overlay */}
            <div className="showcase-name-bar">
              <h3 className="showcase-name">{stores[activeStore].name}</h3>
              <span className="showcase-type-badge">{stores[activeStore].type}</span>
            </div>

            <div className="showcase-content">
              <span className="showcase-type">{stores[activeStore].type} Store</span>
              <h3 className="showcase-name-desktop">{stores[activeStore].name}</h3>
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

              <span className="showcase-stat">{stores[activeStore].stat}</span>
            </div>

            <div className="showcase-visual">
              <div className="browser-frame">
                <div className="browser-dots"><span /><span /><span /></div>
                <div className="browser-url-placeholder" />
              </div>
              <div className="browser-content">
                <iframe src={stores[activeStore].embed} title={stores[activeStore].name} className="store-iframe" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ═══ PRODUCTS WE'VE CREATED ═══ */}
      <section id="products" className="products-section">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Products We've Created</motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>Real products, real stores</motion.h2>
        </div>
        <div className="products-grid">
          {featuredProducts.map((p, i) => (
            <motion.div key={i} className="product-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}>
              <div className="product-img-wrap">
                <img src={p.image} alt={p.name} className="product-img" loading="lazy" />
              </div>
              <div className="product-info">
                <p className="product-store">{p.store}</p>
                <p className="product-name">{p.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="process-section">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>How It Works</motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>From idea to <em>shipped</em></motion.h2>
        </div>
        <div className="process-steps">
          {[
            { step: '01', title: 'Tell us about your brand', desc: 'Share your vision, logo, audience, and vibe. We handle the rest.' },
            { step: '02', title: 'We design your products', desc: 'AI-powered mockups and curated product selections tailored to your brand.' },
            { step: '03', title: 'We build your store', desc: 'A custom branded storefront — designed, built, and deployed for you.' },
            { step: '04', title: 'We source & stock', desc: 'Bulk orders from our supplier network. Inventory stored at our warehouse.' },
            { step: '05', title: 'Orders ship automatically', desc: 'Customers order, we ship. Dropshipping or warehouse fulfillment — your choice.' },
          ].map((s, i) => (
            <motion.div key={i} className="process-step" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
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
          <motion.div className="about-text" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="section-label">About Us</p>
            <h2 className="about-headline">Built by a merch operator, <em>not a tech company.</em></h2>
            <p className="about-body">Create & Source started because we were tired of seeing brands struggle with merch. The design process takes forever, minimums are too high, fulfillment is a nightmare, and most "merch companies" just slap a logo on a template.</p>
            <p className="about-body">We do it differently. We source from 7+ supplier networks, create AI-powered product mockups, build custom storefronts, and warehouse your inventory. When your customer orders, we ship it from our facility.</p>
            <p className="about-body">We've built stores for tech companies, content creators, event brands, artists, and streetwear labels. Every one is custom. Every product is curated. And you never have to touch a single box.</p>
            <div className="about-values">
              <span>Real Products</span>
              <span>Real Stores</span>
              <span>Real Fulfillment</span>
            </div>
          </motion.div>
          <motion.div className="about-visual" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="about-collage">
              <div className="collage-item collage-1">
                <img src="https://eastwood-store.vercel.app/lifestyle/gang-hoodie.png" alt="" loading="lazy" />
              </div>
              <div className="collage-item collage-2">
                <img src="https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png" alt="" loading="lazy" />
              </div>
              <div className="collage-item collage-3">
                <img src="https://stefs-kitchen.vercel.app/images/kitchens-cookin-jacket-street.png" alt="" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <motion.div className="contact-text" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="section-label">Start a Project</p>
            <h2 className="contact-headline">Let's build something <em>worth wearing.</em></h2>
            <p className="contact-desc">Tell us about your brand and we'll put together a custom merch plan — product recommendations, pricing, and a timeline. No commitment, no minimums to start.</p>
            <div className="contact-details">
              <p>Scottsdale, Arizona</p>
              <p>hello@createandsource.com</p>
            </div>
          </motion.div>
          <motion.div className="contact-form-wrap" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
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
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="you@brand.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Brand / Company</label>
                  <input type="text" required value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} placeholder="Your brand name" />
                </div>
                <div className="form-group">
                  <label>Tell us about your project</label>
                  <textarea rows={4} required value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} placeholder="What kind of merch are you looking for? Who is it for? Any specific products in mind?" />
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
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
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
