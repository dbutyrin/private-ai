import { BackgroundGrid } from './components/BackgroundGrid'
import { SectionNav } from './components/SectionNav'
import { SiteHeader } from './components/SiteHeader'
import { useSlideDeck } from './hooks/useSlideDeck'
import { Consequences } from './sections/Consequences'
import { Delivery } from './sections/Delivery'
import { Economics } from './sections/Economics'
import { Estimate } from './sections/Estimate'
import { Hero } from './sections/Hero'
import { Mechanism } from './sections/Mechanism'
import { Qualifier } from './sections/Qualifier'
import { ESTIMATE_INDEX, SECTION_LABELS } from './sections/sections'

export function App() {
  const { containerRef, registerSlide, active, goTo, goPrev, goNext } =
    useSlideDeck(SECTION_LABELS.length)

  return (
    <div>
      <BackgroundGrid />
      <SiteHeader />

      <SectionNav
        labels={SECTION_LABELS}
        active={active}
        onSelect={goTo}
        onPrev={goPrev}
        onNext={goNext}
      />

      <div className="slides" ref={containerRef}>
        <Hero
          ref={registerSlide(0)}
          onEstimateClick={() => goTo(ESTIMATE_INDEX)}
        />
        <Qualifier ref={registerSlide(1)} />
        <Consequences ref={registerSlide(2)} />
        <Mechanism ref={registerSlide(3)} />
        <Economics ref={registerSlide(4)} />
        <Delivery ref={registerSlide(5)} />
        <Estimate ref={registerSlide(6)} />
      </div>
    </div>
  )
}
