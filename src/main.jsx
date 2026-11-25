import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { categories } from './catalog.js'
import './styles.css'

const paths = {
  bag: 'M5 7h14l1.5 13h-17L5 7Zm4 2V6a3 3 0 0 1 6 0v3',
  headphones: 'M4 14v-2a8 8 0 0 1 16 0v2M4 13h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-5Zm16 0h-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2v-5Z',
  shoes: 'M3 15v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-2a2 2 0 0 0-1.5-1.9L15 14l-4-7-3 2v4l-3-1a2 2 0 0 0-2 2v1Zm0 2h18m-7-5-2 1m4 1-2 1',
  cookware: 'M3 10h14v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-3Zm14 1 5-3M4 7h12',
  star: 'm12 3 2.6 5.4 5.9.9-4.2 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.2-4.2 5.9-.9L12 3Z',
  check: 'm5 12 4 4L19 6',
  minus: 'M5 12h14',
  plus: 'M5 12h14m-7-7v14',
  down: 'M12 4v15m-5-5 5 5 5-5',
  up: 'M12 20V5m-5 5 5-5 5 5',
  bookmark: 'M6 4h12v16l-6-4-6 4V4Z',
}

function Icon({ name, size = 18 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>
}

const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
})

const cardDetails = {
  cheaper: { label: 'Cheaper option', icon: 'down', featureIcons: ['check', 'minus'] },
  selection: { label: 'Your selection', icon: 'bookmark', featureIcons: ['check', 'check'] },
  upgrade: { label: 'Upgrade option', icon: 'up', featureIcons: ['check', 'plus'] },
}

const images = import.meta.glob('./assets/*.webp', { eager: true, query: '?url', import: 'default' })

function ProductCard({ option, product, selectedPrice, recommended }) {
  const details = cardDetails[option]
  const difference = product.price - selectedPrice
  const priceNote = difference < 0
    ? `Save ${money.format(-difference)}`
    : difference > 0 ? `Pay ${money.format(difference)} more` : 'Price reference'

  return (
    <article className={`product ${option} ${recommended ? 'recommended' : ''}`} aria-labelledby={`product-${option}`}>
      <div className="card-top">
        <span className="role"><Icon name={details.icon} size={15} />{details.label}</span>
        {recommended && <span className="best"><Icon name="star" size={14} /> Best value for this use</span>}
      </div>
      <img className="photo" src={images[`./assets/${product.image}.webp`]} alt={product.name} width="640" height="400" />
      <div className="card-copy">
        <h2 id={`product-${option}`}>{product.name}</h2>
        <p className="price">{money.format(product.price)}</p>
        <p className="price-note">{priceNote}</p>
        <ul className="features">
          {product.features.map((feature, index) => {
            const icon = feature.startsWith('No ') ? 'minus' : details.featureIcons[index]
            return <li key={feature}><span className={`feature-icon ${icon}`}><Icon name={icon} size={14} /></span>{feature}</li>
          })}
        </ul>
      </div>
    </article>
  )
}

function App() {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [useIndex, setUseIndex] = useState(1)
  const category = categories[categoryIndex]
  const useCase = category.uses[useIndex]

  function selectCategory(index) {
    if (index === categoryIndex) return
    setCategoryIndex(index)
    setUseIndex(1)
  }

  function handleCategoryKey(event) {
    const last = categories.length - 1
    const next = {
      ArrowLeft: categoryIndex === 0 ? last : categoryIndex - 1,
      ArrowRight: categoryIndex === last ? 0 : categoryIndex + 1,
      Home: 0,
      End: last,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    selectCategory(next)
    event.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
  }

  return (
    <>
      <header className="header">
        <div className="shell header-inner">
          <div className="brand"><span className="brand-mark"><Icon name="bag" size={21} /></span>ShopSphere<span className="brand-period">.</span></div>
          <span className="header-feature">Is the Upgrade Worth It?</span>
          <span className="demo-label">Demo prices and products</span>
        </div>
      </header>
      <main className="shell">
        <div className="intro">
          <h1>Is the Upgrade <em>Worth It?</em></h1>
          <p>See what you save, give up, or gain before you choose.</p>
        </div>
        <div role="tablist" aria-label="Product category" className="tabs" onKeyDown={handleCategoryKey}>
          {categories.map((item, index) => (
            <button type="button" key={item.id} role="tab" id={`tab-${item.id}`} aria-selected={categoryIndex === index} aria-controls="comparison-panel" tabIndex={categoryIndex === index ? 0 : -1} onClick={() => selectCategory(index)}>
              <Icon name={item.id} />{item.label}
            </button>
          ))}
        </div>
        <section id="comparison-panel" role="tabpanel" aria-labelledby={`tab-${category.id}`}>
          <div className="use-row">
            <fieldset className="use-selector">
              <legend>How will you use it?</legend>
              <div className="use-options">
                {category.uses.map((item, index) => (
                  <label className="use-option" key={item.label}>
                    <input type="radio" name="use-case" checked={useIndex === index} onChange={() => setUseIndex(index)} />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="recommendation" role="status" aria-atomic="true">
            <span className="recommendation-icon"><Icon name="star" size={21} /></span>
            <div>
              <p className="recommendation-label">Best value for this use</p>
              <p className="recommendation-copy"><strong>{category.products[useCase.option].name}</strong><span className="reason-divider" aria-hidden="true"></span>{' '}{useCase.reason}</p>
            </div>
          </div>
          <div className="comparison" aria-label="Product comparison">
            {Object.entries(category.products).map(([option, product]) => (
              <ProductCard key={option} option={option} product={product} selectedPrice={category.products.selection.price} recommended={option === useCase.option} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
