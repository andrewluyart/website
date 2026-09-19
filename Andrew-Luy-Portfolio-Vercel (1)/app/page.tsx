"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const gallery = [
  { src: "/images/ripple-aerial.webp", alt: "Aerial view of The Ripple memorial and its concentric granite walls", label: "The Ripple · Site view" },
  { src: "/images/robyn-hood.webp", alt: "Robyn Hood bronze sculpture drawing a bow", label: "Robyn Hood · Bronze" },
  { src: "/images/figurative-athlete.webp", alt: "Expressive figurative sculpture study of an athlete in motion", label: "Figurative study" },
  { src: "/images/ripple-landscape.webp", alt: "The Ripple memorial beside the lake in Winter Park", label: "The Ripple · Unity Corner" },
  { src: "/images/figurative-portrait.webp", alt: "Sculpted portrait bust with expressive planes", label: "Portrait study" },
  { src: "/images/process-josh.webp", alt: "Andrew Luy working on a painted relief portrait", label: "Studio process" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightbox((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    document.body.classList.add("no-scroll");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Andrew Luy home">
          <span>Andrew Luy</span>
          <small>Sculptor + Public Artist</small>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span /><b className="sr-only">Toggle navigation</b>
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#process" onClick={closeMenu}>Process</a>
          <a href="#film" onClick={closeMenu}>Film</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#news" onClick={closeMenu}>News</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Huntsville, Alabama · Working nationally</p>
          <h1>Stories made<br />monumental.</h1>
          <p className="hero-intro">I create figurative sculpture and civic landmarks shaped by the people, histories, and places they are built to serve.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">View selected work <ArrowIcon /></a>
            <a className="text-link" href="mailto:andrewluyart@gmail.com">Discuss a commission</a>
          </div>
          <div className="hero-facts" aria-label="Practice highlights">
            <div><strong>37 ft</strong><span>largest installation footprint</span></div>
            <div><strong>1,000+</strong><span>applicants for The Ripple</span></div>
            <div><strong>Bronze</strong><span>stone, metal + mixed media</span></div>
          </div>
        </div>
        <figure className="hero-image">
          <Image src="/images/ripple-portrait.webp" alt="Andrew Luy at The Ripple memorial with the bronze Dr. Martin Luther King Jr. figure" fill unoptimized priority sizes="(max-width: 900px) 100vw, 48vw" />
          <figcaption><span>The Ripple</span><span>Winter Park, Florida · 2025</span></figcaption>
        </figure>
      </section>

      <section className="statement-band" aria-label="Artist statement">
        <p>Public art should do more than occupy space. It should help people recognize themselves, one another, and the story of where they live.</p>
      </section>

      <section className="section projects" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected public work</p>
          <h2>Built for place.<br />Made to last.</h2>
        </div>

        <article className="feature-project">
          <div className="project-image landscape">
            <Image src="/images/ripple-aerial.webp" alt="Aerial view of The Ripple memorial" fill unoptimized sizes="(max-width: 900px) 100vw, 62vw" />
          </div>
          <div className="project-copy">
            <p className="project-number">01 / Featured commission</p>
            <h3>The Ripple</h3>
            <p className="project-meta">Winter Park, Florida · Bronze, granite, landscape</p>
            <p>A civic memorial centered on a nine-foot bronze figure of Dr. Martin Luther King Jr. Concentric seating and engraved granite walls carry his words outward while honoring Black families displaced from the site by eminent domain.</p>
            <ul className="project-specs">
              <li><span>Scale</span>37-foot site · 11-foot overall height</li>
              <li><span>Process</span>Community-led, iterative design</li>
              <li><span>Role</span>Artist, designer + project lead</li>
            </ul>
          </div>
        </article>

        <div className="project-grid">
          <article className="project-card">
            <div className="project-image portrait"><Image src="/images/robyn-hood.webp" alt="Robyn Hood bronze sculpture" fill unoptimized sizes="(max-width: 700px) 100vw, 45vw" /></div>
            <p className="project-number">02 / Public sculpture</p>
            <h3>Robyn Hood</h3>
            <p className="project-meta">Sherwood Park · Huntsville, Alabama</p>
            <p>A contemporary young hero who reframes the familiar legend around courage, equality, and neighbors helping neighbors.</p>
          </article>
          <article className="project-card offset-card">
            <div className="project-image portrait"><Image src="/images/figurative-athlete.webp" alt="Dynamic figurative sculpture study" fill unoptimized sizes="(max-width: 700px) 100vw, 45vw" /></div>
            <p className="project-number">03 / Figurative practice</p>
            <h3>Movement + Character</h3>
            <p className="project-meta">Clay, bronze + mixed media</p>
            <p>Anatomical knowledge is the starting point, not the finish line. Gesture, energy, and emotional clarity give each figure its life.</p>
          </article>
        </div>
      </section>

      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-header">
          <div><p className="eyebrow">Selected work</p><h2 id="gallery-title">A closer look</h2></div>
          <p>Tap any image to view it full screen.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <button className={`gallery-item gallery-item-${index + 1}`} key={image.src} type="button" onClick={() => setLightbox(index)} aria-label={`Open ${image.label}`}>
              <Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 700px) 100vw, 33vw" /><span>{image.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="process section" id="process">
        <div className="process-copy">
          <p className="eyebrow">Process</p>
          <h2>Listen first.<br />Then make.</h2>
          <p className="process-lead">The strongest public art grows from real exchange. I begin with the community and the site, then carry that shared direction through concept, engineering, fabrication, and installation.</p>
          <ol className="process-list">
            <li><span>01</span><div><strong>Listen + learn</strong><p>Stakeholder conversations, history, site conditions, and the stories that might otherwise go unseen.</p></div></li>
            <li><span>02</span><div><strong>Shape the idea</strong><p>Sketches, maquettes, material studies, and clear checkpoints that make collaboration tangible.</p></div></li>
            <li><span>03</span><div><strong>Build responsibly</strong><p>Engineering, accessibility, fabrication, municipal review, and long-term performance are part of the artwork.</p></div></li>
          </ol>
        </div>
        <div className="process-images">
          <div className="process-image process-image-main"><Image src="/images/andrew-mlk-process.webp" alt="Andrew Luy beside the full-scale clay figure for The Ripple" fill unoptimized sizes="(max-width: 900px) 100vw, 42vw" /></div>
          <div className="process-image process-image-small"><Image src="/images/ripple-close.webp" alt="Close view of The Ripple and its granite seating" fill unoptimized sizes="(max-width: 900px) 55vw, 24vw" /></div>
        </div>
      </section>

      <section className="film section" id="film">
        <div className="film-heading">
          <div>
            <p className="eyebrow">Featured film</p>
            <h2>See the work<br />in motion.</h2>
          </div>
          <p>A closer look at the sculpture, process, and places that shape Andrew&apos;s public work.</p>
        </div>
        <div className="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/VEKpofJUASM?rel=0"
            title="Video featuring Andrew Luy's sculpture and public art"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-image"><Image src="/images/andrew-studio.webp" alt="Andrew Luy seated in his Lowe Mill studio among sculptures" fill unoptimized sizes="(max-width: 900px) 100vw, 45vw" /></div>
        <div className="about-copy">
          <p className="eyebrow">About Andrew</p>
          <h2>A figurative sculptor with a civic point of view.</h2>
          <p className="about-lead">Andrew Luy is a Huntsville-based sculptor and installation artist whose work turns shared histories into durable, human-centered public places.</p>
          <p>After a career on Wall Street, Andrew committed fully to sculpture, studying with Rhoda Sherbell at The Art Students League of New York. He later taught and assisted figurative sculpture at the League and the National Academy of Design. His practice spans bronze, metal, stone, concrete, and mixed media.</p>
          <p>Today, from his studio at Lowe Mill Arts & Entertainment, he works with residents, civic leaders, engineers, fabricators, architects, and contractors to deliver ambitious public artwork from first conversation through final installation.</p>
          <div className="recognition">
            <div><strong>Art Students League of New York</strong><span>Assistant sculpture instructor · 2012–2021</span></div>
            <div><strong>National Academy of Design</strong><span>Figurative sculpture monitor · 2013–2017</span></div>
            <div><strong>Lowe Mill Arts & Entertainment</strong><span>Studio 1019 · Huntsville, Alabama</span></div>
          </div>
        </div>
      </section>

      <section className="news section" id="news">
        <div className="news-heading">
          <div>
            <p className="eyebrow">News + Press</p>
            <h2>Stories behind<br />the work.</h2>
          </div>
          <p>Selected interviews, profiles, and coverage spanning public art, process, and figurative sculpture.</p>
        </div>

        <a className="featured-article" href="https://www.forbes.com/sites/davidseideman/2014/04/01/the-300-man-mariano-riveras-fans-line-up-for-his-autograph-and-smile/" target="_blank" rel="noreferrer">
          <div className="featured-publication">Forbes</div>
          <div className="featured-copy">
            <p className="article-meta">Featured press · April 1, 2014</p>
            <h3>The $300 Man: Mariano Rivera&apos;s Fans Line Up For His Autograph And Smile</h3>
            <p>Forbes singled out Andrew&apos;s hand-sculpted Mariano Rivera statue as the top artwork at the Yankees legend&apos;s autograph appearance.</p>
            <span className="article-link">Read on Forbes <ArrowIcon /></span>
          </div>
        </a>

        <div className="article-list">
          <a className="article-row" href="https://hvilleblast.com/from-lowe-mill-to-winter-park-fl-huntsville-artists-mlk-memorial-just-unveiled/" target="_blank" rel="noreferrer">
            <p className="article-meta">Hville Blast · July 22, 2025</p>
            <h3>From Lowe Mill to Winter Park: Huntsville artist&apos;s MLK memorial unveiled</h3>
            <p>The completion of The Ripple, its community collaboration, and Andrew&apos;s reflections after the dedication.</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="article-row" href="https://www.rocketcitynow.com/article/news/local/statue-rooted-in-huntsville-now-on-display-at-florida-park/525-edb216e4-4da8-41b3-bd6b-4b7f1811e295" target="_blank" rel="noreferrer">
            <p className="article-meta">Rocket City Now · July 17, 2025</p>
            <h3>Statue rooted in Huntsville now on display at Florida park</h3>
            <p>Local coverage follows The Ripple from its creation at Lowe Mill to its permanent installation in Winter Park.</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="article-row" href="https://www.waff.com/2025/02/20/huntsville-artists-join-48-now-share-their-journey-building-mlk-jr-monument/" target="_blank" rel="noreferrer">
            <p className="article-meta">WAFF 48 · February 20, 2025</p>
            <h3>Huntsville artists share their journey building an MLK Jr. monument</h3>
            <p>A studio interview about scale, symbolism, stakeholder input, and the making of the nine-foot bronze figure.</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="article-row" href="https://hvilleblast.com/how-lowe-mill-artist-andrew-luy-is-honoring-martin-luther-king-jr/" target="_blank" rel="noreferrer">
            <p className="article-meta">Hville Blast · January 20, 2025</p>
            <h3>How Lowe Mill artist Andrew Luy is honoring Martin Luther King Jr.</h3>
            <p>A profile tracing Andrew&apos;s move from Wall Street to sculpture and his community-centered creative process.</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="article-row" href="https://nationalsculpture.org/news-events/luy-mlk/" target="_blank" rel="noreferrer">
            <p className="article-meta">National Sculpture Society · 2025</p>
            <h3>Andrew Luy and The Ripple</h3>
            <p>The National Sculpture Society highlights the Winter Park commission and its memorial to displaced families.</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="article-row" href="https://www.artshuntsville.org/artist-initiated-nea/" target="_blank" rel="noreferrer">
            <p className="article-meta">Arts Huntsville · November 16, 2023</p>
            <h3>Artist-initiated public art reflects Huntsville&apos;s unique spirit</h3>
            <p>Coverage of Robyn Hood and the neighborhood collaboration that brought the sculpture to Sherwood Park.</p>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="article-row" href="https://newburghrestoration.com/blog/2017/03/07/home-renovation-adventures-36-dubois-a-land-bank-property/" target="_blank" rel="noreferrer">
            <p className="article-meta">Newburgh Restoration · March 7, 2017</p>
            <h3>Home Renovation Adventures: 36 Dubois, a Land Bank Property</h3>
            <p>A visit to Andrew&apos;s circa-1855 Newburgh home, documenting its restoration, his sculpture practice, and his hopes for the neighborhood.</p>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">Commissions + collaborations</p>
        <h2>Let&apos;s make a place<br />people remember.</h2>
        <div className="contact-row">
          <a className="button button-light" href="mailto:andrewluyart@gmail.com">Start a conversation <ArrowIcon /></a>
          <div className="contact-details">
            <a href="mailto:andrewluyart@gmail.com">andrewluyart@gmail.com</a>
            <a href="https://www.instagram.com/andrew_luy/" target="_blank" rel="noreferrer">Instagram @andrew_luy</a>
            <span>Huntsville, Alabama · Available nationally</span>
          </div>
        </div>
      </section>

      <footer><span>© {new Date().getFullYear()} Andrew Luy</span><span>Sculpture · Public Art · Installation</span><a href="#top">Back to top ↑</a></footer>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[lightbox].label}>
          <button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close image">×</button>
          <button className="lightbox-nav previous" type="button" onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} aria-label="Previous image">‹</button>
          <div className="lightbox-image"><Image src={gallery[lightbox].src} alt={gallery[lightbox].alt} fill unoptimized sizes="95vw" /></div>
          <p>{gallery[lightbox].label}</p>
          <button className="lightbox-nav next" type="button" onClick={() => setLightbox((lightbox + 1) % gallery.length)} aria-label="Next image">›</button>
        </div>
      )}
    </main>
  );
}
