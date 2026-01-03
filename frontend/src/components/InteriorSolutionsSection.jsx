// frontend/src/components/InteriorSolutionsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * InteriorSolutionsSection
 * - Matches your site's look by reusing your existing global utility classes:
 *   .section, .container, .section-header, .section-title, .btn
 * - Only adds minimal scoped CSS (injected) for this grid + icons.
 * - CTA navigates to /estimator (no route changes).
 */

export default function InteriorSolutionsSection() {
  const navigate = useNavigate();

  const SOLUTIONS = [
    { label: "Modular Kitchen", Icon: IconModularKitchen },
    { label: "Storage and Wardrobe", Icon: IconStorageWardrobe },
    { label: "Crockery Units", Icon: IconCrockeryUnits },
    { label: "Space Saving Furniture", Icon: IconSpaceSavingFurniture },
    { label: "TV Units", Icon: IconTvUnits },
    { label: "Study Tables", Icon: IconStudyTables },
    { label: "False Ceiling", Icon: IconFalseCeiling },
    { label: "Lights", Icon: IconLights },
    { label: "Wallpaper", Icon: IconWallpaper },
    { label: "Wall Paint", Icon: IconWallPaint },
    { label: "Bathroom", Icon: IconBathroom },
    { label: "Pooja Unit", Icon: IconPoojaUnit },
    { label: "Foyer Designs", Icon: IconFoyerDesigns },
    { label: "Movable Furniture", Icon: IconMovableFurniture },
    { label: "Kids Bedroom", Icon: IconKidsBedroom },
  ];

  // Subtle fade+slide + stagger
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section className="section issSection" aria-label="Interior solutions">
      <style>{css}</style>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="section-title">End-to-end interior solutions</h2>
        </motion.div>

        <motion.div
          className="issGrid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {SOLUTIONS.map(({ label, Icon }) => (
            <motion.div key={label} className="issItem" variants={itemVariants}>
              <div className="issIconWrap" aria-hidden="true">
                <Icon label={label} />
              </div>
              <div className="issLabel">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="issCtaWrap">
          {/* Uses your existing .btn base style; we only override color to red for this CTA */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/estimator")}
          >
            Get Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Styles --------------------------------- */
/**
 * Only section-specific styling here.
 * Everything else inherits from your global theme (fonts, base colors, container spacing, button base).
 */
const css = `
  /* Optional: keep section background aligned with your theme (inherits if already set by parent). */
  .issSection{
    background: var(--color-ivory, #fafaf8);
  }

  /* Grid: desktop 5, tablet 3, mobile 2 */
  .issGrid{
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 44px 22px; /* premium vertical spacing */
    align-items: start;
    justify-items: center;
  }

  @media (min-width: 768px){
    .issGrid{
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 48px 28px;
    }
  }

  @media (min-width: 1024px){
    .issGrid{
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 52px 30px;
    }
  }

  .issItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .issIconWrap{
    width: 72px;
    height: 72px;
    display: grid;
    place-items: center;
  }

  .issIcon{
    width: 56px;
    height: 56px;
    fill: none;
    stroke: var(--color-charcoal, #2c2c2c);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .issIcon .issAccent{
    stroke: var(--color-error, #f44336); /* subtle red highlight */
  }

  .issLabel{
    font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
    font-size: 0.9rem;
    line-height: 1.2;
    font-weight: 500;
    color: var(--color-text-primary, #2c2c2c);
    letter-spacing: 0.02em;
    text-align: center;
    max-width: 160px;
  }

  .issCtaWrap{
    margin-top: var(--space-2xl, 4rem);
    display: flex;
    justify-content: center;
  }

  /* Keep your .btn look/feel; only override to red for this CTA */
  .issBtnRed{
    background-color: var(--color-error, #f44336);
    border-color: var(--color-error, #f44336);
    color: var(--color-white, #ffffff);
  }

  .issBtnRed:hover{
    background-color: #e53935;
    border-color: #e53935;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(244, 67, 54, 0.28);
    color: var(--color-white, #ffffff);
  }

  .issBtnRed:focus-visible{
    outline: 2px solid rgba(244, 67, 54, 0.35);
    outline-offset: 3px;
  }
`;

/* ----------------------------- Icon primitives ----------------------------- */
function IconBase({ children, label }) {
  return (
    <svg
      className="issIcon"
      viewBox="0 0 48 48"
      role="img"
      aria-label={label}
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ------------------------------- Inline icons ------------------------------ */
/* Thin outline + subtle red highlights (issAccent). No external images. */

function IconModularKitchen({ label }) {
  return (
    <IconBase label={label}>
      <path d="M8 18h32M10 18v20h28V18" />
      <path d="M16 26h8M16 32h8" />
      <rect x="28" y="24" width="10" height="10" rx="1.8" />
      <path className="issAccent" d="M32 24v10" />
      <path d="M20 38v2M28 38v2" />
    </IconBase>
  );
}

function IconStorageWardrobe({ label }) {
  return (
    <IconBase label={label}>
      <rect x="10" y="12" width="28" height="26" rx="2" />
      <path d="M24 12v26" />
      <path className="issAccent" d="M21 24h0.01M27 24h0.01" />
      <path d="M14 38v2M34 38v2" />
    </IconBase>
  );
}

function IconCrockeryUnits({ label }) {
  return (
    <IconBase label={label}>
      <rect x="10" y="14" width="28" height="24" rx="2" />
      <path d="M10 22h28M10 30h28" />
      <path d="M16 22v16M32 22v16" />
      <path
        className="issAccent"
        d="M24 26c2.2 0 4-1.2 4-2.6S26.2 21 24 21s-4 1.2-4 2.4S21.8 26 24 26Z"
      />
    </IconBase>
  );
}

function IconSpaceSavingFurniture({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 34V20h12v14" />
      <path d="M26 24h10v10H26" />
      <path d="M14 20h12" />
      <path className="issAccent" d="M30 28h2" />
      <path d="M16 34v4M24 34v4M28 34v4M36 34v4" />
    </IconBase>
  );
}

function IconTvUnits({ label }) {
  return (
    <IconBase label={label}>
      <rect x="10" y="14" width="28" height="16" rx="2" />
      <path d="M18 34h12" />
      <path d="M12 34h24" />
      <path className="issAccent" d="M28 22h6" />
      <path d="M16 34v4M32 34v4" />
    </IconBase>
  );
}

function IconStudyTables({ label }) {
  return (
    <IconBase label={label}>
      <path d="M12 20h24" />
      <path d="M14 20v18M34 20v18" />
      <path d="M18 26h12" />
      <path className="issAccent" d="M30 26v6" />
      <path d="M12 38h24" />
    </IconBase>
  );
}

function IconFalseCeiling({ label }) {
  return (
    <IconBase label={label}>
      <path d="M10 18h28" />
      <path d="M14 18v10c0 4 4 8 10 8s10-4 10-8V18" />
      <path className="issAccent" d="M24 26v6" />
    </IconBase>
  );
}

function IconLights({ label }) {
  return (
    <IconBase label={label}>
      <path d="M24 12v6" />
      <path d="M16 18h16" />
      <path d="M18 18l6 10 6-10" />
      <path d="M20 34h8" />
      <path className="issAccent" d="M22 30h4" />
      <path d="M24 28v6" />
    </IconBase>
  );
}

function IconWallpaper({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 12h20v24H14z" />
      <path d="M18 12v24M30 12v24" />
      <path className="issAccent" d="M22 20h4M22 28h4" />
    </IconBase>
  );
}

function IconWallPaint({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 12h20v14H14z" />
      <path d="M18 26v12h12V26" />
      <path className="issAccent" d="M32 28c0 3-2 6-6 6" />
    </IconBase>
  );
}

function IconBathroom({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 22h20v8c0 4-4 8-10 8s-10-4-10-8v-8Z" />
      <path d="M18 22v-4c0-2 1.6-4 4-4h8" />
      <path className="issAccent" d="M30 14v4" />
    </IconBase>
  );
}

function IconPoojaUnit({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 18h20v20H14z" />
      <path d="M18 18v-4h12v4" />
      <path d="M18 24h12" />
      <path className="issAccent" d="M24 28l2 4h-4l2-4Z" />
    </IconBase>
  );
}

function IconFoyerDesigns({ label }) {
  return (
    <IconBase label={label}>
      <path d="M16 38V22c0-6 4-10 8-10s8 4 8 10v16" />
      <path d="M16 28h16" />
      <path className="issAccent" d="M24 28v10" />
    </IconBase>
  );
}

function IconMovableFurniture({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 18h20v10H14z" />
      <path d="M16 28v8M32 28v8" />
      <path d="M14 36h20" />
      <path
        className="issAccent"
        d="M18 36c0 1.7-1.3 3-3 3M30 36c0 1.7 1.3 3 3 3"
      />
    </IconBase>
  );
}

function IconKidsBedroom({ label }) {
  return (
    <IconBase label={label}>
      <path d="M14 22h20v10H14z" />
      <path d="M16 22v-4h8v4" />
      <path d="M14 32v6M34 32v6" />
      <path className="issAccent" d="M28 18h4" />
    </IconBase>
  );
}
