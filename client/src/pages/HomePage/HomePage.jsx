import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Leaf, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const categories = [
  {
    name: 'Something fresh',
    note: 'Bright, crisp & feel-good',
    image: 'photo-1512621776951-a57141f2eefd',
    tone: 'mint',
  },
  {
    name: 'Big lunch energy',
    note: 'The proper midday refuel',
    image: 'photo-1565299624946-b28f40a0ae38',
    tone: 'peach',
  },
  {
    name: 'A little pick-me-up',
    note: 'Coffee, treats & in-betweens',
    image: 'photo-1509042239860-f550ce710b93',
    tone: 'yellow',
  },
]

const benefits = [
  { icon: Clock3, title: 'Made for your timetable', text: 'Order between classes and pick up when it suits you.' },
  { icon: Leaf, title: 'Fresh from your canteen', text: 'Campus favourites, made nearby by the people who know them.' },
  { icon: MapPin, title: 'Right where you are', text: 'Good food is closer than you think. No detours required.' },
]

const steps = [
  { number: '01', title: 'Find your thing', text: 'Browse the good stuff from your campus canteen.' },
  { number: '02', title: 'Order ahead', text: 'Choose what you fancy and when you want to collect.' },
  { number: '03', title: 'Skip the queue', text: 'Swing by, pick it up, get on with your day.' },
]

function HomePage() {
  return (
    <>
      <section className="hero-section page-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAMPUS, SERVED</div>
          <h1>Your campus food,<br />on <span className="headline-highlight">your time.</span></h1>
          <p className="hero-description">The good stuff from your campus canteen, ready when you are. Find your next favourite and make lunch the easy part of your day.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/menu">Explore the menu <ArrowRight size={18} /></Link>
            <a className="text-link" href="#how-it-works">See how it works <ArrowDown size={15} /></a>
          </div>
          <div className="hero-note"><span className="avatar-stack"><span>J</span><span>A</span><span>M</span></span><span>Made for the campus crowd</span></div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1300&q=85"
            alt="A colourful, freshly made bowl topped with vegetables"
          />
          <div className="image-caption"><span className="caption-sparkle"><Sparkles size={16} /></span><span><strong>Fresh picks</strong><small>Happening right on campus</small></span></div>
          <div className="pickup-badge"><span className="pickup-icon"><Clock3 size={17} /></span><span><strong>Your break, better</strong><small>Pick up between classes</small></span></div>
          <span className="visual-sticker" aria-hidden="true">made<br />nearby</span>
        </div>
        <a className="scroll-cue" href="#categories"><span>GOOD THINGS BELOW</span><ArrowDown size={14} /></a>
      </section>

      <section className="category-section section-pad" id="categories">
        <div className="page-wrap">
          <div className="section-heading category-heading">
            <div><span className="eyebrow eyebrow-muted">A LITTLE BIT OF EVERYTHING</span><h2>What sounds good?</h2></div>
            <Link className="text-link category-link" to="/menu">Meet the menu <ArrowUpRight size={16} /></Link>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link className={`category-card category-${category.tone}`} to="/menu" key={category.name}>
                <span className="category-index">0{index + 1} / 03</span>
                <div className="category-image-wrap"><img src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=720&q=80`} alt="" loading="lazy" /></div>
                <div className="category-card-copy"><div><h3>{category.name}</h3><p>{category.note}</p></div><span className="round-arrow"><ArrowUpRight size={17} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section section-pad">
        <div className="page-wrap benefits-layout">
          <div className="benefits-intro"><span className="eyebrow eyebrow-light">THE CAMPUS BITE DIFFERENCE</span><h2>Good food.<br />No big <span>detour.</span></h2><p>Between lectures, deadlines and everything else, lunch should be the easy bit.</p><Link className="text-link text-link-light" to="/menu">Find your next bite <ArrowRight size={16} /></Link></div>
          <div className="benefits-list">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article className="benefit-row" key={title}><span className="benefit-number">0{index + 1}</span><span className="benefit-icon"><Icon size={21} strokeWidth={1.8} /></span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-section section-pad" id="how-it-works">
        <div className="page-wrap">
          <div className="section-heading steps-heading"><div><span className="eyebrow eyebrow-muted">THREE STEPS. ZERO HASSLE.</span><h2>Lunch, sorted.</h2></div><p>Your next good meal is closer than you think.</p></div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><span className="step-rule" aria-hidden="true" data-last={index === steps.length - 1} /><h3>{step.title}</h3><p>{step.text}</p></article>
            ))}
          </div>
          <div className="closing-cta"><div><span className="eyebrow">YOUR NEXT BREAK CALLED</span><h2>Make it a good one.</h2></div><Link className="button button-dark" to="/menu">Take a look around <ArrowUpRight size={17} /></Link></div>
        </div>
      </section>
    </>
  )
}

export default HomePage
