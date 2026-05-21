import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
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
  { number: '4', label: 'Live Stores' },
  { number: '120+', label: 'Products Created' },
  { number: '7', label: 'Supplier Networks' },
  { number: '∞', label: 'Custom Possibilities' },
]

/* ═══════════════════════════════════════════════════════════
   LOOKBOOK — All merch mockups organized by store
   ═══════════════════════════════════════════════════════════ */
const lookbookItems = [
  // Eastwood Co.
  { src: 'https://eastwood-store.vercel.app/lifestyle/gang-hoodie-miami-night.png', name: 'Eastwood Gang Hoodie', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/cowboy-pillows-camp1.png', name: 'Cowboy Pillows Crop', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/cowboy-pillows-camp2.png', name: 'Cowboy Pillows Camp', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/cowgirl-hoodie-back.png', name: 'Cowgirl Fancy Hoodie', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/somebodys-problem-crew.png', name: "Somebody's Problem Crew", store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/somebodys-problem-bar.jpeg', name: "Somebody's Problem", store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/eastwood-sweats-convertible.png', name: 'Eastwood Sweats', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/eastwood-sweats-cream.png', name: 'Eastwood Cream Sweats', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/hold-my-revolver-range.png', name: 'Hold My Revolver Tee', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/howdy-partner-miami.png', name: 'Howdy Partner Tee', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/wild-women-barn.png', name: 'Wild Women Crop', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/wild-women-horses.png', name: 'Wild Women Crop', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/cowboy-tank-rodeo1.png', name: 'Cowboy Tank', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/pool-caps.png', name: 'Eastwood Caps', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/tractor-tee.png', name: 'Tractor Tee', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/miami-walk.png', name: 'Eastwood Miami', store: 'Eastwood Co.' },
  { src: 'https://eastwood-store.vercel.app/lifestyle/eastwood-crest-ocean-dr.jpeg', name: 'Eastwood Crest', store: 'Eastwood Co.' },
  // Club Lumen
  { src: 'https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png', name: 'Good Energy Club Hoodie', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/good-energy-club.png', name: 'Good Energy Club', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/morning-rave-hoodie-lifestyle.png', name: 'Morning Rave Hoodie', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/move-body-tee-lifestyle.png', name: 'Move Your Body Tee', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/disco-crop-lifestyle.png', name: 'Disco Ball Crop', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/disco-ball-crop.png', name: 'Disco Ball Crop', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/cherry-lips-tank-lifestyle.png', name: 'Cherry Lips Tank', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/dance-before-noon.png', name: 'Dance Before Noon', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/dj-party-vibes.png', name: 'DJ Party Vibes Tote', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/tote-bag-lifestyle.png', name: 'Club Lumen Tote', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/tumbler-lifestyle.png', name: 'Morning Rave Tumbler', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/i-love-raves.png', name: 'I Love Raves', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/retro-girl-graphic.png', name: 'Retro Graphic', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/pool-party-group.png', name: 'Pool Party', store: 'Club Lumen' },
  { src: 'https://clublumen-store.vercel.app/products/coffee-shop-group.png', name: 'Coffee Shop', store: 'Club Lumen' },
  // Stef's Kitchen
  { src: 'https://stefs-kitchen.vercel.app/images/kitchens-cookin-jacket-nyc.png', name: "Kitchen's Cookin' Jacket", store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/kitchens-cookin-jacket-street.png', name: "Kitchen's Cookin' Jacket", store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/too-blessed-tee-neon.png', name: 'Too Blessed Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/too-blessed-tee-club.png', name: 'Too Blessed Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/too-blessed-tee-mixing.png', name: 'Too Blessed Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/bad-breath-hoodie-dock.png', name: 'Bad Breath Hoodie', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/bad-breath-hoodie-studio.png', name: 'Bad Breath Hoodie', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/smooth-ride-hoodie-cars.png', name: 'Smooth Ride Hoodie', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/smooth-ride-hoodie-frontback.png', name: 'Smooth Ride Hoodie', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/chef-stef-tee-bridge.png', name: 'Chef Stef Portrait Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/chef-stef-tee-city.png', name: 'Chef Stef Still Cookin', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/eughhh-speaker-tee-studio.png', name: 'EUGHHH Speaker Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/eughhh-neon-tee-club.png', name: 'EUGHHH Neon Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/kitchen-is-open-tee-night.png', name: 'Kitchen Is Open Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/my-crocs-tee-bar.png', name: 'My Crocs Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/sip-community-tee-cafe.png', name: 'Sip On Community Tee', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/put-that-sofa-tee-studio.png', name: 'Put That On The Sofa', store: "Stef's Kitchen" },
  { src: 'https://stefs-kitchen.vercel.app/images/still-cookin-hoodie-studio.png', name: 'Still Cookin Hoodie', store: "Stef's Kitchen" },
  // STATUS (C&S brand mockups in TV frames)
  { src: '/images/tv-rack.png', name: 'The Collection', store: 'Create & Source' },
  { src: '/images/tv-bags.png', name: 'Travel Essentials', store: 'Create & Source' },
  { src: '/images/tv-folded.png', name: 'Stacked', store: 'Create & Source' },
  { src: '/images/tv-hats.png', name: 'Caps & Accessories', store: 'Create & Source' },
]

const lookbookStoreFilters = ['All', 'Create & Source', 'Eastwood Co.', 'Club Lumen', "Stef's Kitchen"]

/* ═══════════════════════════════════════════════════════════
   SCROLL TO TOP ON ROUTE CHANGE
   ═══════════════════════════════════════════════════════════ */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ═══════════════════════════════════════════════════════════
   SHARED LAYOUT — Header + Footer
   ═══════════════════════════════════════════════════════════ */
function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <div className="app">
      <div className="announcement-bar">
        <p>Now accepting new clients for Q3 2026 — <Link to="/contact">Book your spot</Link></p>
      </div>

      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-create">Create</span>
            <span className="logo-amp">&</span>
            <span className="logo-source">Source</span>
          </Link>
          <nav className="nav-desktop">
            <NavLink to="/portfolio">Portfolio</NavLink>
            <NavLink to="/lookbook">Lookbook</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/contact" className="nav-cta">Start a Project</NavLink>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
              <span /><span /><span />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
            <Link to="/lookbook" onClick={() => setMenuOpen(false)}>Lookbook</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="mobile-cta">Start a Project</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="logo footer-logo">
              <span className="logo-create">Create</span>
              <span className="logo-amp">&</span>
              <span className="logo-source">Source</span>
            </Link>
            <p className="footer-desc">Custom merch, sourced & shipped. From product design to warehouse fulfillment.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-title">Navigate</p>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/lookbook">Lookbook</Link>
              <Link to="/services">Services</Link>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Connect</p>
              <Link to="/contact">Start a Project</Link>
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

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════ */
function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const mosaicPhotos = [
    { src: 'https://eastwood-store.vercel.app/lifestyle/gang-hoodie-miami-night.png', store: 'Eastwood Co.', name: 'Eastwood Gang Hoodie' },
    { src: 'https://clublumen-store.vercel.app/products/good-energy-hoodie-lifestyle.png', store: 'Club Lumen', name: 'Good Energy Club Hoodie' },
    { src: 'https://stefs-kitchen.vercel.app/images/too-blessed-tee-neon.png', store: "Stef's Kitchen", name: 'Too Blessed Tee' },
    { src: 'https://eastwood-store.vercel.app/lifestyle/cowboy-pillows-camp1.png', store: 'Eastwood Co.', name: 'Cowboy Pillows Crop' },
    { src: 'https://clublumen-store.vercel.app/products/morning-rave-hoodie-lifestyle.png', store: 'Club Lumen', name: 'Morning Rave Hoodie' },
    { src: 'https://stefs-kitchen.vercel.app/images/kitchens-cookin-jacket-nyc.png', store: "Stef's Kitchen", name: "Kitchen's Cookin' Jacket" },
    { src: 'https://eastwood-store.vercel.app/lifestyle/cowgirl-hoodie-back.png', store: 'Eastwood Co.', name: 'Cowgirl Fancy Hoodie' },
    { src: 'https://clublumen-store.vercel.app/products/move-body-tee-lifestyle.png', store: 'Club Lumen', name: 'Move Your Body Tee' },
    { src: 'https://stefs-kitchen.vercel.app/images/bad-breath-hoodie-dock.png', store: "Stef's Kitchen", name: 'Bad Breath Hoodie' },
    { src: 'https://eastwood-store.vercel.app/lifestyle/somebodys-problem-crew.png', store: 'Eastwood Co.', name: "Somebody's Problem Crew" },
    { src: 'https://clublumen-store.vercel.app/products/disco-crop-lifestyle.png', store: 'Club Lumen', name: 'Disco Ball Crop Tee' },
    { src: 'https://stefs-kitchen.vercel.app/images/smooth-ride-hoodie-cars.png', store: "Stef's Kitchen", name: 'Smooth Ride Hoodie' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-bg" style={{ opacity: heroOpacity, scale: heroScale }}>
          <img src="/images/mood-palms.jpg" alt="" className="hero-bg-img" />
          <div className="hero-gradient" />
        </motion.div>
        <div className="hero-content">
          <motion.div className="hero-tv-image" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            <img src="/images/header-tvs.png" alt="Create & Source merch collection" />
          </motion.div>
          <motion.p className="hero-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            Custom Merch, Sourced & Shipped
          </motion.p>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
            We build <em>branded stores</em> and ship the product{' '}
            <span className="hero-italic">so you don't have to.</span>
          </motion.h1>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <Link to="/contact" className="btn-primary">Start Your Store</Link>
            <Link to="/portfolio" className="btn-secondary">See Our Work</Link>
          </motion.div>
        </div>
      </section>

      {/* PHOTO MOSAIC */}
      <section className="mosaic-section">
        <div className="mosaic-grid">
          {mosaicPhotos.map((photo, i) => (
            <motion.div key={i} className="mosaic-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}>
              <img src={photo.src} alt={photo.name} loading="lazy" />
              <div className="mosaic-overlay">
                <span className="mosaic-store">{photo.store}</span>
                <span className="mosaic-name">{photo.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(3)].map((_, r) =>
            ['Product Design', 'AI Mockups', 'Sourcing', 'Store Build', 'Warehousing', 'Fulfillment', 'Dropshipping', 'Corporate Programs'].map((t, i) => (
              <span key={`${r}-${i}`} className="ticker-item">{t}<span className="ticker-dot" /></span>
            ))
          )}
        </div>
      </div>

      {/* INTRO + EDITORIAL IMAGE */}
      <section className="intro">
        <motion.div className="intro-inner" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <p className="intro-label">The full-service merch partner</p>
          <h2 className="intro-headline">
            We don't just design merch — we <em>source it, stock it, and ship it.</em> Your brand, our operation. From concept to doorstep.
          </h2>
        </motion.div>
      </section>

      {/* EDITORIAL SPLIT — mood image + text */}
      <section className="editorial-split">
        <motion.div className="editorial-split-img" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <img src="/images/mood-cactus.jpg" alt="" />
        </motion.div>
        <motion.div className="editorial-split-text" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
          <p className="section-label">Our Approach</p>
          <h2 className="split-headline">Built by a merch operator, <em>not a tech company.</em></h2>
          <p className="split-body">We source from 7+ supplier networks, create AI-powered product mockups, build custom storefronts, and warehouse your inventory. When your customer orders, we ship it from our facility.</p>
          <p className="split-body">We've built stores for tech companies, content creators, event brands, artists, and streetwear labels. Every one is custom. Every product is curated.</p>
          <Link to="/portfolio" className="btn-text">See our portfolio &rarr;</Link>
        </motion.div>
      </section>

      {/* STATS */}
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

      {/* TV MOCKUPS FEATURE */}
      <section className="tv-feature-section">
        <motion.div className="tv-feature-img" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <img src="/images/tv-collage.png" alt="Create & Source merch collection" />
        </motion.div>
      </section>

      {/* EDITORIAL QUOTE */}
      <section className="editorial-quote">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <blockquote className="big-quote">
            "We create entire product lines from a single brand brief — design, source, warehouse, and ship. Our clients never touch a box."
          </blockquote>
          <p className="quote-attr">— Tovah Marx, Founder</p>
        </motion.div>
      </section>

      {/* EDITORIAL PAIR — beach + rock mood images */}
      <section className="editorial-pair">
        <motion.div className="editorial-pair-left" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <img src="/images/mood-beach.jpg" alt="" />
        </motion.div>
        <motion.div className="editorial-pair-right" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
          <img src="/images/mood-rock.jpg" alt="" />
        </motion.div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="process-preview">
        <motion.div className="process-preview-inner" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="section-label">How It Works</p>
          <h2 className="process-preview-title">Tell us your brand. We handle <em>everything else.</em></h2>
          <div className="process-preview-steps">
            {['Brand Brief', 'Product Design', 'Store Build', 'Source & Stock', 'Ship'].map((step, i) => (
              <div key={i} className="preview-step">
                <span className="preview-step-num">0{i + 1}</span>
                <span className="preview-step-name">{step}</span>
              </div>
            ))}
          </div>
          <Link to="/services" className="btn-primary">See Our Services</Link>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <motion.div className="home-cta-inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="home-cta-title">Ready to build something <em>worth wearing?</em></h2>
          <p className="home-cta-sub">Tell us about your brand and we'll put together a custom merch plan.</p>
          <Link to="/contact" className="btn-primary">Start a Project</Link>
        </motion.div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO PAGE
   ═══════════════════════════════════════════════════════════ */
function PortfolioPage() {
  const [activeStore, setActiveStore] = useState(0)

  return (
    <>
      <section className="page-hero">
        <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Work</motion.p>
        <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Stores we've built</motion.h1>
        <motion.p className="page-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Every store is custom-designed, fully stocked, and ready to sell. No templates, no shortcuts.
        </motion.p>
      </section>

      <section className="portfolio-section">
        <AnimatePresence mode="wait">
          <motion.div key={stores[activeStore].id} className="store-showcase-wrap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="showcase-name-bar">
              <h3 className="showcase-name">{stores[activeStore].name}</h3>
              <span className="showcase-type-badge">{stores[activeStore].type}</span>
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

            <div className="store-selector">
              {stores.map((store, i) => (
                <button key={store.id} className={`store-pill ${activeStore === i ? 'active' : ''}`} onClick={() => setActiveStore(i)}>
                  <span className="pill-name">{store.name}</span>
                  <span className="pill-type">{store.type}</span>
                </button>
              ))}
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
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Want a store like these?</h2>
          <p>Tell us about your brand and we'll put together a custom plan.</p>
          <Link to="/contact" className="btn-primary">Start a Project</Link>
        </motion.div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   LOOKBOOK PAGE
   ═══════════════════════════════════════════════════════════ */
function LookbookPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? lookbookItems : lookbookItems.filter(item => item.store === filter)

  return (
    <>
      <section className="page-hero">
        <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Lookbook</motion.p>
        <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Products we've created</motion.h1>
        <motion.p className="page-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          AI-powered mockups. Real product photography. Every piece designed and sourced by us.
        </motion.p>
      </section>

      {/* MOOD STRIP */}
      <div className="lookbook-mood-strip">
        <img src="/images/tv-rack.png" alt="" />
        <img src="/images/mood-cactus.jpg" alt="" />
        <img src="/images/tv-bags.png" alt="" />
        <img src="/images/mood-beach.jpg" alt="" />
        <img src="/images/tv-folded.png" alt="" />
      </div>

      {/* FILTER */}
      <section className="lookbook-section">
        <div className="lookbook-filters">
          {lookbookStoreFilters.map(f => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {/* MASONRY GRID */}
        <div className="lookbook-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                className="lookbook-item"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.03 }}
              >
                <img src={item.src} alt={item.name} loading="lazy" />
                <div className="lookbook-overlay">
                  <span className="lookbook-item-store">{item.store}</span>
                  <span className="lookbook-item-name">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section className="page-cta">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Want products like these?</h2>
          <p>We design entire product lines from a single brand brief.</p>
          <Link to="/contact" className="btn-primary">Start a Project</Link>
        </motion.div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   SERVICES PAGE
   ═══════════════════════════════════════════════════════════ */
function ServicesPage() {
  const services = [
    { keyword: 'Design', headline: 'We design entire product lines from a single brand brief.', body: 'AI-powered mockups. Curated product selections. Apparel, accessories, hard goods — whatever your brand needs, we create it.' },
    { keyword: 'Source', headline: 'We source from 7+ supplier networks worldwide.', body: 'Domestic, overseas, print-on-demand. We find the best price at the best quality and handle samples, production, and delivery.' },
    { keyword: 'Build', headline: 'We build custom storefronts that actually convert.', body: 'Not templates. Not Shopify themes. Fully custom, branded storefronts designed and built from scratch for your audience.' },
    { keyword: 'Store', headline: 'We warehouse your inventory and ship all year.', body: 'Buy in bulk at better prices. We store it at our facility and fulfill orders as they come in. Your customers get fast shipping, you get zero headaches.' },
    { keyword: 'Ship', headline: 'Orders go out automatically.', body: 'Dropshipping or warehouse fulfillment — customer orders, we ship. Tracking numbers, delivery confirmation, the whole thing. You never touch a box.' },
  ]

  const steps = [
    { step: '01', title: 'Tell us about your brand', desc: 'Share your vision, logo, audience, and vibe. We handle the rest.' },
    { step: '02', title: 'We design your products', desc: 'AI-powered mockups and curated product selections tailored to your brand.' },
    { step: '03', title: 'We build your store', desc: 'A custom branded storefront — designed, built, and deployed for you.' },
    { step: '04', title: 'We source & stock', desc: 'Bulk orders from our supplier network. Inventory stored at our warehouse.' },
    { step: '05', title: 'Orders ship automatically', desc: 'Customers order, we ship. Dropshipping or warehouse fulfillment — your choice.' },
  ]

  return (
    <>
      <section className="page-hero">
        <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>What We Do</motion.p>
        <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Everything between <em>your idea</em> and their doorstep
        </motion.h1>
      </section>

      {/* EDITORIAL MOOD IMAGE */}
      <div className="services-mood">
        <img src="/images/mood-rock.jpg" alt="" />
      </div>

      {/* SERVICES EDITORIAL */}
      <section className="services-section">
        <div className="services-editorial">
          {services.map((s, i) => (
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

      {/* EDITORIAL SPLIT */}
      <section className="editorial-split reverse">
        <motion.div className="editorial-split-img" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <img src="/images/tv-folded.png" alt="" />
        </motion.div>
        <motion.div className="editorial-split-text" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
          <p className="section-label">The Warehouse</p>
          <h2 className="split-headline">We buy bulk. <em>You save money.</em></h2>
          <p className="split-body">Instead of buying 20 backpacks at a time, your order is 100. They ship to our warehouse. We store them and fulfill throughout the year. Better pricing, faster shipping, zero work on your end.</p>
        </motion.div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="section-header">
          <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>How It Works</motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>From idea to <em>shipped</em></motion.h2>
        </div>
        <div className="process-steps">
          {steps.map((s, i) => (
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

      <section className="page-cta">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Ready to get started?</h2>
          <p>No commitment, no minimums. Just tell us about your brand.</p>
          <Link to="/contact" className="btn-primary">Start a Project</Link>
        </motion.div>
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════ */
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', details: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <>
      <section className="page-hero">
        <motion.p className="section-label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Start a Project</motion.p>
        <motion.h1 className="page-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Let's build something <em>worth wearing.</em>
        </motion.h1>
        <motion.p className="page-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Tell us about your brand and we'll put together a custom merch plan — product recommendations, pricing, and a timeline.
        </motion.p>
      </section>

      <section className="contact-section">
        <div className="contact-inner">
          <motion.div className="contact-text" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="contact-mood-img">
              <img src="/images/mood-palms.jpg" alt="" />
            </div>
            <div className="contact-details">
              <p>Scottsdale, Arizona</p>
              <p>hello@createandsource.com</p>
            </div>
            <div className="contact-values">
              <span>No minimums</span>
              <span>No commitment to start</span>
              <span>24hr response</span>
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
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   APP — Router
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </>
  )
}
