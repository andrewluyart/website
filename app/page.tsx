"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import siteData from "../content/site.json";

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function Lines({ text }: { text: string }) {
  return <>{text.split("\n").map((line, index) => <Fragment key={`${line}-${index}`}>{index > 0 && <br />}{line}</Fragment>)}</>;
}

export default function Home() {
  const { settings, hero, statement, projects, gallery, process, film, about, press, contact } = siteData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const featuredProject = projects.find((project) => project.featured) || projects[0];
  const secondaryProjects = projects.filter((project) => project !== featuredProject).slice(0, 2);
  const featuredPress = press.find((article) => article.featured) || press[0];
  const pressList = press.filter((article) => article !== featuredPress);

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
  }, [gallery.length, lightbox]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={`${settings.name} home`}><span>{settings.name}</span><small>{settings.tagline}</small></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span /><b className="sr-only">Toggle navigation</b>
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#process" onClick={closeMenu}>Process</a><a href="#film" onClick={closeMenu}>Film</a><a href="#about" onClick={closeMenu}>About</a><a href="#news" onClick={closeMenu}>News</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p><h1><Lines text={hero.title} /></h1><p className="hero-intro">{hero.intro}</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">View selected work <ArrowIcon /></a><a className="text-link" href={`mailto:${settings.email}`}>Discuss a commission</a></div>
          <div className="hero-facts" aria-label="Practice highlights">{hero.facts.map((fact) => <div key={`${fact.value}-${fact.label}`}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div>
        </div>
        <figure className="hero-image"><Image src={hero.image} alt={hero.imageAlt} fill unoptimized priority sizes="(max-width: 900px) 100vw, 48vw" /><figcaption><span>{hero.captionTitle}</span><span>{hero.captionMeta}</span></figcaption></figure>
      </section>

      <section className="statement-band" aria-label="Artist statement"><p>{statement}</p></section>

      <section className="section projects" id="work">
        <div className="section-heading"><p className="eyebrow">Selected public work</p><h2>Built for place.<br />Made to last.</h2></div>
        <article className="feature-project">
          <div className="project-image landscape"><Image src={featuredProject.image} alt={featuredProject.imageAlt} fill unoptimized sizes="(max-width: 900px) 100vw, 62vw" /></div>
          <div className="project-copy"><p className="project-number">{featuredProject.number}</p><h3>{featuredProject.title}</h3><p className="project-meta">{featuredProject.meta}</p><p>{featuredProject.description}</p>
            {featuredProject.specs.length > 0 && <ul className="project-specs">{featuredProject.specs.map((spec) => <li key={`${spec.label}-${spec.value}`}><span>{spec.label}</span>{spec.value}</li>)}</ul>}
          </div>
        </article>
        <div className="project-grid">{secondaryProjects.map((project, index) => <article className={index === 1 ? "project-card offset-card" : "project-card"} key={project.title}>
          <div className="project-image portrait"><Image src={project.image} alt={project.imageAlt} fill unoptimized sizes="(max-width: 700px) 100vw, 45vw" /></div><p className="project-number">{project.number}</p><h3>{project.title}</h3><p className="project-meta">{project.meta}</p><p>{project.description}</p>
        </article>)}</div>
      </section>

      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-header"><div><p className="eyebrow">Selected work</p><h2 id="gallery-title">A closer look</h2></div><p>Tap any image to view it full screen.</p></div>
        <div className="gallery-grid">{gallery.map((image, index) => <button className={`gallery-item gallery-item-${index + 1}`} key={`${image.src}-${index}`} type="button" onClick={() => setLightbox(index)} aria-label={`Open ${image.label}`}><Image src={image.src} alt={image.alt} fill unoptimized sizes="(max-width: 700px) 100vw, 33vw" /><span>{image.label}</span></button>)}</div>
      </section>

      <section className="process section" id="process">
        <div className="process-copy"><p className="eyebrow">Process</p><h2><Lines text={process.title} /></h2><p className="process-lead">{process.lead}</p><ol className="process-list">{process.steps.map((step) => <li key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></li>)}</ol></div>
        <div className="process-images"><div className="process-image process-image-main"><Image src={process.mainImage} alt={process.mainImageAlt} fill unoptimized sizes="(max-width: 900px) 100vw, 42vw" /></div><div className="process-image process-image-small"><Image src={process.secondaryImage} alt={process.secondaryImageAlt} fill unoptimized sizes="(max-width: 900px) 55vw, 24vw" /></div></div>
      </section>

      <section className="film section" id="film">
        <div className="film-heading"><div><p className="eyebrow">Featured film</p><h2><Lines text={film.title} /></h2></div><p>{film.description}</p></div>
        <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?rel=0`} title={`Video featuring ${settings.name}'s sculpture and public art`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      </section>

      <section className="about section" id="about">
        <div className="about-image"><Image src={about.image} alt={about.imageAlt} fill unoptimized sizes="(max-width: 900px) 100vw, 45vw" /></div>
        <div className="about-copy"><p className="eyebrow">About Andrew</p><h2>{about.title}</h2><p className="about-lead">{about.lead}</p>{about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="recognition">{about.recognition.map((item) => <div key={item.name}><strong>{item.name}</strong><span>{item.detail}</span></div>)}</div></div>
      </section>

      <section className="news section" id="news">
        <div className="news-heading"><div><p className="eyebrow">News + Press</p><h2>Stories behind<br />the work.</h2></div><p>Selected interviews, profiles, and coverage spanning public art, process, and figurative sculpture.</p></div>
        <a className="featured-article" href={featuredPress.url} target="_blank" rel="noreferrer"><div className="featured-publication">{featuredPress.publication}</div><div className="featured-copy"><p className="article-meta">Featured press · {featuredPress.date}</p><h3>{featuredPress.title}</h3><p>{featuredPress.description}</p><span className="article-link">Read article <ArrowIcon /></span></div></a>
        <div className="article-list">{pressList.map((article) => <a className="article-row" href={article.url} target="_blank" rel="noreferrer" key={`${article.publication}-${article.title}`}><p className="article-meta">{article.publication} · {article.date}</p><h3>{article.title}</h3><p>{article.description}</p><span aria-hidden="true">↗</span></a>)}</div>
      </section>

      <section className="contact" id="contact"><p className="eyebrow">{contact.eyebrow}</p><h2><Lines text={contact.title} /></h2><div className="contact-row"><a className="button button-light" href={`mailto:${settings.email}`}>{contact.buttonLabel} <ArrowIcon /></a><div className="contact-details"><a href={`mailto:${settings.email}`}>{settings.email}</a><a href={settings.instagramUrl} target="_blank" rel="noreferrer">{settings.instagramLabel}</a><span>{settings.location}</span></div></div></section>

      <footer><span>© {new Date().getFullYear()} {settings.name}</span><span>Sculpture · Public Art · Installation</span><a href="#top">Back to top ↑</a></footer>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[lightbox].label}><button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close image">×</button><button className="lightbox-nav previous" type="button" onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} aria-label="Previous image">‹</button><div className="lightbox-image"><Image src={gallery[lightbox].src} alt={gallery[lightbox].alt} fill unoptimized sizes="95vw" /></div><p>{gallery[lightbox].label}</p><button className="lightbox-nav next" type="button" onClick={() => setLightbox((lightbox + 1) % gallery.length)} aria-label="Next image">›</button></div>}
    </main>
  );
}
