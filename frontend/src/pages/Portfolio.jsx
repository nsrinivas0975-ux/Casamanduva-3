import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimatedSection from '../components/AnimatedSection';

const projects = [
  {
    id: 1,
    title: 'Modern Minimalist Villa',
    category: 'residential',
    location: 'Jubilee Hills',
    area: '4500 sq.ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=450&fit=crop',
  },
  {
    id: 2,
    title: 'Luxury 3BHK Apartment',
    category: 'residential',
    location: 'Gachibowli',
    area: '1800 sq.ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop',
  },
  {
    id: 3,
    title: 'Tech Startup Office',
    category: 'commercial',
    location: 'HITEC City',
    area: '5000 sq.ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop',
  },
  {
    id: 4,
    title: 'Boutique Hotel Lobby',
    category: 'hospitality',
    location: 'Banjara Hills',
    area: '3000 sq.ft',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=450&fit=crop',
  },
  {
    id: 5,
    title: 'Contemporary 2BHK',
    category: 'residential',
    location: 'Kondapur',
    area: '1200 sq.ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=450&fit=crop',
  },
  {
    id: 6,
    title: 'Corporate Headquarters',
    category: 'commercial',
    location: 'Financial District',
    area: '15000 sq.ft',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=450&fit=crop',
  },
  {
    id: 7,
    title: 'Scandinavian 1BHK',
    category: 'residential',
    location: 'Madhapur',
    area: '650 sq.ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=450&fit=crop',
  },
  {
    id: 8,
    title: 'Fine Dining Restaurant',
    category: 'hospitality',
    location: 'Jubilee Hills',
    area: '2500 sq.ft',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=450&fit=crop',
  },
  {
    id: 9,
    title: 'Premium Penthouse',
    category: 'residential',
    location: 'Film Nagar',
    area: '3500 sq.ft',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&h=450&fit=crop',
  },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CASAMANDUVA Portfolio',
    description: 'Featured interior design projects by CASAMANDUVA',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          description: `${p.category} project in ${p.location}`,
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="Interior Design Portfolio | Featured Projects"
        description="Explore CASAMANDUVA's portfolio of completed interior design projects. Residential, commercial, and hospitality projects in Hyderabad. View our 1BHK, 2BHK, 3BHK transformations."
        keywords="interior design portfolio, completed projects, home interior photos, office interior design, 1bhk interior design photos, 2bhk interior design photos"
        url="/portfolio"
        schema={portfolioSchema}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=800&fit=crop"
            alt="Our Portfolio"
            loading="eager"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <AnimatedSection animation="fadeUp">
            <span className="section-badge">Our Work</span>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h1>Featured <span className="text-gold">Projects</span></h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <p>Explore our collection of thoughtfully designed spaces</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter">
        <div className="container">
          <div className="filter-tabs">
            {['all', 'residential', 'commercial', 'hospitality'].map((filter) => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'All Projects' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                className="project-card"
                animation="fadeUp"
                delay={index * 0.1}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-overlay">
                    <span className="view-project">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p className="project-meta">
                    {project.location} <span className="divider">•</span> {project.area}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.1}>
              <span className="stat-number">500+</span>
              <span className="stat-label">Projects Completed</span>
            </AnimatedSection>
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.2}>
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </AnimatedSection>
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.3}>
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </AnimatedSection>
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.4}>
              <span className="stat-number">50+</span>
              <span className="stat-label">Design Awards</span>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              animation: 'fadeInUp 0.4s ease'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'white',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                fontSize: '1.5rem',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              aria-label="Close modal"
            >
              ×
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0'
              }}
            />

            <div style={{ padding: '2rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.35rem 0.85rem',
                background: 'rgba(201, 169, 110, 0.1)',
                color: 'var(--color-gold)',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1rem'
              }}>
                {selectedProject.category}
              </span>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                marginBottom: '1rem',
                color: 'var(--color-charcoal)'
              }}>
                {selectedProject.title}
              </h2>

              <div style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '1.5rem',
                color: 'var(--color-text-secondary)',
                fontSize: '0.95rem',
                flexWrap: 'wrap'
              }}>
                <div>
                  <strong style={{ color: 'var(--color-charcoal)' }}>Location:</strong> {selectedProject.location}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-charcoal)' }}>Area:</strong> {selectedProject.area}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-charcoal)' }}>Year:</strong> {selectedProject.year}
                </div>
              </div>

              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: 'var(--color-text-secondary)',
                marginBottom: '2rem'
              }}>
                This {selectedProject.category} project showcases our commitment to design excellence.
                Every detail was carefully crafted to create a space that perfectly balances aesthetics
                with functionality, reflecting the unique personality and lifestyle of our client.
              </p>

              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/estimator"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Get Similar Design
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline"
                  onClick={closeModal}
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;