/* ═══════════════════════════════════════════════════════════════
   Product Relationships Prototype — Render Functions & Interactions
   All rendering, interaction handlers, and initialization logic.
   Expects global DEMO_DATA object (provided by demo-data.js).
   ═══════════════════════════════════════════════════════════════ */

// ─── State ───
let currentProduct = 'all';       // currently selected product filter
let expandedCard = null;          // id of currently expanded card (accordion)
let activeTab = 'summary';        // 'summary' or 'product-analysis'


/* ═══════════════════════════════════════════════════════════════
   1. RENDERING FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

/**
 * Renders an SVG health-score donut ring (32px).
 * Color: green (80+), yellow (60-79), orange (40-59), red (<40).
 */
function renderHealthRing(score) {
  let color;
  if (score >= 80) color = 'var(--st-positive)';
  else if (score >= 60) color = 'var(--st-neutral)';
  else if (score >= 40) color = 'var(--st-warning)';
  else color = 'var(--st-negative)';

  // SVG donut: circumference = 2 * PI * r (r=12) ≈ 75.4
  const circumference = 75.4;
  const filled = (score / 100) * circumference;
  const gap = circumference - filled;

  return `<svg class="health-ring" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="12" fill="none" stroke="var(--st-border)" stroke-width="3"/>
    <circle cx="16" cy="16" r="12" fill="none" stroke="${color}" stroke-width="3"
      stroke-dasharray="${filled} ${gap}" stroke-dashoffset="18.85" stroke-linecap="round"/>
    <text x="16" y="16" text-anchor="middle" dominant-baseline="central"
      font-size="9" font-weight="700" fill="var(--st-text)">${score}</text>
  </svg>`;
}

/**
 * Renders signal pills: expansion (green), risk (red), conversation count (ghost).
 */
function renderSignalPills(product) {
  let html = '<div class="signal-pills">';

  if (product.hasExpansion) {
    html += `<span class="signal-pill signal-pill-expansion">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
      ${product.expansionCount > 1 ? product.expansionCount + ' Expansion signals' : 'Expansion signal'}
    </span>`;
  }

  if (product.hasRisk) {
    html += `<span class="signal-pill signal-pill-risk">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      ${product.riskCount > 1 ? product.riskCount + ' Risk signals' : 'Risk signal'}
    </span>`;
  }

  html += `<span class="signal-pill signal-pill-ghost">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    ${product.conversationCount} conversations
  </span>`;

  html += '</div>';
  return html;
}

/**
 * Renders a status tag with appropriate coloring.
 */
function renderStatusTag(status) {
  const map = {
    'active': { cls: 'tag-positive', label: 'Active' },
    'onboarding': { cls: 'tag-primary', label: 'Onboarding' },
    'at-risk': { cls: 'tag-negative', label: 'At Risk' },
    'monitor': { cls: 'tag-neutral', label: 'Monitor' }
  };
  const s = map[status] || map['active'];
  return `<span class="tag ${s.cls}">${s.label}</span>`;
}

/**
 * Renders a collapsed product card.
 * Header row: chevron + name + health ring + status + stakeholder count
 * Meta row: type + ARR + renewal
 * Pills row: expansion/risk/conversations
 * Summary: 2-line clamped narrative
 * Next action
 */
function renderCollapsedCard(product) {
  return `
    <div class="product-card ${expandedCard === product.id ? 'expanded' : ''} ${currentProduct !== 'all' && currentProduct !== product.id ? 'dimmed' : ''}"
         id="card-${product.id}" data-product-id="${product.id}">

      <!-- HEADER (clickable) -->
      <div class="product-card-header" onclick="toggleCard('${product.id}')">
        <div class="header-left">
          <svg class="chevron ${expandedCard === product.id ? 'rotated' : ''}" width="16" height="16" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span class="product-name">${product.name}</span>
        </div>
        <div class="header-right">
          ${renderHealthRing(product.healthScore)}
          ${renderStatusTag(product.status)}
          <span class="stakeholder-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            ${product.stakeholderCount}
          </span>
        </div>
      </div>

      <!-- META ROW -->
      <div class="product-meta">
        <span>${product.type}</span>
        <span class="meta-dot"></span>
        <span>${product.arr} ARR</span>
        <span class="meta-dot"></span>
        <span>Renews ${product.renewalDate}</span>
      </div>

      <!-- SIGNAL PILLS -->
      ${renderSignalPills(product)}

      <!-- SUMMARY (2-line clamp) -->
      <p class="product-summary">${product.summary}</p>

      <!-- NEXT ACTION -->
      <div class="product-next-action">
        <span class="next-label">Next:</span> ${product.nextAction}
      </div>

      <!-- EXPANDED BODY (hidden by default, revealed on toggle) -->
      <div class="product-card-body" id="body-${product.id}">
        ${renderExpandedSections(product)}
      </div>
    </div>`;
}

/**
 * Renders the 5 expanded sections for a product card:
 * 1. Summary (white bg)
 * 2. Stakeholders (alt bg)
 * 3. Signals (white bg)
 * 4. Recent Engagements (alt bg)
 * 5. References (white bg)
 */
function renderExpandedSections(product) {
  return `
    <!-- Section 1: Summary -->
    <div class="card-section">
      <div class="card-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
        Summary
      </div>
      <p class="section-narrative">${product.fullNarrative}</p>
    </div>

    <!-- Section 2: Stakeholders (alt) -->
    <div class="card-section card-section-alt">
      <div class="card-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
        Key Stakeholders
      </div>
      ${renderStakeholders(product.stakeholders)}
    </div>

    <!-- Section 3: Signals -->
    <div class="card-section">
      <div class="card-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        Signals
      </div>
      ${renderSignalCards(product.signals)}
    </div>

    <!-- Section 4: Recent Engagements (alt) -->
    <div class="card-section card-section-alt">
      <div class="card-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Recent Engagements
      </div>
      ${renderEngagements(product.recentEngagements)}
    </div>

    <!-- Section 5: References -->
    <div class="card-section">
      <div class="card-section-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2l.01 20"/><path d="M10 2h8a2 2 0 012 2v4a2 2 0 01-2 2h-8"/>
          <path d="M10 12h6a2 2 0 012 2v4a2 2 0 01-2 2h-6"/>
        </svg>
        References
      </div>
      ${renderReferences(product.references)}
    </div>`;
}

/**
 * Renders all product cards into the #product-cards container.
 */
function renderProductCards(products) {
  const container = document.getElementById('product-cards');
  if (!container) return;
  container.innerHTML = products.map(p => renderCollapsedCard(p)).join('');
}

/**
 * Renders the AI summary tab content.
 * Shows: status pill, generated date, narrative, key bullets, conclusion.
 */
function renderSummary(summaryData) {
  if (!summaryData) return '<p class="text-secondary">No summary available.</p>';

  const statusMap = {
    'Heating': 'tag-positive',
    'Stable': 'tag-primary',
    'Cooling': 'tag-neutral',
    'At Risk': 'tag-negative'
  };
  const statusCls = statusMap[summaryData.status] || 'tag-ghost';

  let bulletsHtml = '';
  if (summaryData.bullets && summaryData.bullets.length > 0) {
    bulletsHtml = `
      <div class="summary-bullets">
        <div class="summary-bullets-title">Key Areas</div>
        <ul>
          ${summaryData.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>`;
  }

  return `
    <div class="summary-card">
      <div class="summary-header">
        <div class="summary-header-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--st-primary)" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          <span class="summary-ai-label">AI Summary</span>
          <span class="tag ${statusCls}">${summaryData.status}</span>
        </div>
        <span class="summary-date">Generated ${summaryData.generatedAt}</span>
      </div>
      <p class="summary-narrative">${summaryData.narrative}</p>
      ${bulletsHtml}
      ${summaryData.conclusion ? `<p class="summary-conclusion">${summaryData.conclusion}</p>` : ''}
    </div>`;
}

/**
 * Renders reference cards with colored left borders.
 * Green = email, Blue = meeting, Amber = ticket.
 */
function renderReferences(references) {
  if (!references || references.length === 0) {
    return '<p class="text-secondary text-sm">No references available.</p>';
  }

  const borderColors = {
    'email': 'var(--st-positive)',
    'meeting': 'var(--st-primary)',
    'ticket': 'var(--st-warning)'
  };

  const typeIcons = {
    'email': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/></svg>`,
    'meeting': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    'ticket': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/></svg>`
  };

  return references.map(ref => {
    const borderColor = borderColors[ref.type] || 'var(--st-border)';
    const icon = typeIcons[ref.type] || '';
    const typeLabel = ref.type.charAt(0).toUpperCase() + ref.type.slice(1);

    return `
      <div class="reference-card" style="border-left-color: ${borderColor};">
        <div class="reference-context">
          ${icon}
          <span class="reference-type">${typeLabel}</span>
          <span class="reference-context-text">${ref.context}</span>
        </div>
        <blockquote class="reference-quote">"${ref.quote}"</blockquote>
        <div class="reference-attribution">
          <span class="reference-author">${ref.attribution}</span>
          <span class="reference-date">${ref.date}</span>
        </div>
      </div>`;
  }).join('');
}

/**
 * Renders stakeholder rows with persona tags and engagement/sentiment indicators.
 */
function renderStakeholders(stakeholders) {
  if (!stakeholders || stakeholders.length === 0) {
    return '<p class="text-secondary text-sm">No stakeholders identified.</p>';
  }

  const personaColors = {
    'Executive Sponsor': 'tag-scope',
    'Champion': 'tag-positive',
    'Power User': 'tag-primary',
    'Decision Maker': 'tag-neutral',
    'Influencer': 'tag-ghost'
  };

  const engagementIcons = {
    'high': `<span class="engagement-indicator engagement-high" title="High engagement">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--st-positive)" stroke="none">
        <circle cx="12" cy="12" r="6"/></svg></span>`,
    'medium': `<span class="engagement-indicator engagement-medium" title="Medium engagement">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--st-neutral)" stroke="none">
        <circle cx="12" cy="12" r="6"/></svg></span>`,
    'low': `<span class="engagement-indicator engagement-low" title="Low engagement">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--st-negative)" stroke="none">
        <circle cx="12" cy="12" r="6"/></svg></span>`
  };

  const sentimentLabels = {
    'positive': { icon: '+', cls: 'sentiment-positive' },
    'neutral': { icon: '~', cls: 'sentiment-neutral' },
    'negative': { icon: '-', cls: 'sentiment-negative' }
  };

  return `<div class="stakeholder-list">
    ${stakeholders.map(s => {
      const personaCls = personaColors[s.persona] || 'tag-ghost';
      const engIcon = engagementIcons[s.engagement] || '';
      const sent = sentimentLabels[s.sentiment] || sentimentLabels['neutral'];

      return `
        <div class="stakeholder-row">
          <div class="stakeholder-info">
            <span class="stakeholder-name">${s.name}</span>
            <span class="stakeholder-role">${s.role}</span>
          </div>
          <div class="stakeholder-tags">
            <span class="tag ${personaCls}">${s.persona}</span>
            ${engIcon}
            <span class="sentiment ${sent.cls}" title="${s.sentiment} sentiment">${sent.icon}</span>
          </div>
        </div>`;
    }).join('')}
  </div>`;
}

/**
 * Renders signal mini-cards with colored left borders.
 * Green border = expansion, Red border = risk.
 */
function renderSignalCards(signals) {
  if (!signals || signals.length === 0) {
    return '<p class="text-secondary text-sm">No active signals.</p>';
  }

  const confidenceColors = {
    'high': 'tag-positive',
    'medium': 'tag-neutral',
    'low': 'tag-ghost'
  };

  return `<div class="signal-cards">
    ${signals.map(sig => {
      const borderColor = sig.type === 'expansion' ? 'var(--st-positive)' : 'var(--st-negative)';
      const typeIcon = sig.type === 'expansion'
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--st-positive)" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--st-negative)" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`;
      const confCls = confidenceColors[sig.confidence] || 'tag-ghost';

      return `
        <div class="signal-card" style="border-left-color: ${borderColor};">
          <div class="signal-card-header">
            ${typeIcon}
            <span class="signal-title">${sig.title}</span>
            <span class="tag ${confCls}">${sig.confidence.charAt(0).toUpperCase() + sig.confidence.slice(1)} confidence</span>
          </div>
          <p class="signal-description">${sig.description}</p>
          <div class="signal-source">Source: ${sig.source}</div>
        </div>`;
    }).join('')}
  </div>`;
}

/**
 * Renders compact engagement rows with type icons.
 */
function renderEngagements(engagements) {
  if (!engagements || engagements.length === 0) {
    return '<p class="text-secondary text-sm">No recent engagements.</p>';
  }

  const typeIcons = {
    'email': `<div class="engagement-type-icon" style="background: var(--st-positive-light); color: var(--st-positive);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/></svg></div>`,
    'meeting': `<div class="engagement-type-icon" style="background: var(--st-primary-light); color: var(--st-primary);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>`,
    'ticket': `<div class="engagement-type-icon" style="background: var(--st-warning-light); color: var(--st-warning);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/></svg></div>`,
    'chat': `<div class="engagement-type-icon" style="background: #F3E8FD; color: #7C3AED;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>`
  };

  return `<div class="engagement-list">
    ${engagements.map(eng => {
      const icon = typeIcons[eng.type] || typeIcons['email'];
      const participants = eng.participants && eng.participants.length > 0
        ? `<span class="engagement-participants">${eng.participants.join(', ')}</span>`
        : '';

      return `
        <div class="engagement-row">
          ${icon}
          <div class="engagement-info">
            <span class="engagement-title">${eng.title}</span>
            ${participants}
          </div>
          <span class="engagement-time">${eng.timeAgo}</span>
        </div>`;
    }).join('')}
  </div>`;
}


/* ═══════════════════════════════════════════════════════════════
   2. INTERACTION HANDLERS
   ═══════════════════════════════════════════════════════════════ */

/**
 * Accordion expand/collapse for product cards.
 * Only one card open at a time. Smooth max-height transition.
 * Chevron rotates on expand. Scrolls expanded card into view.
 */
function toggleCard(productId) {
  const wasExpanded = expandedCard === productId;

  // Collapse current expanded card (if any)
  if (expandedCard) {
    const prevCard = document.getElementById('card-' + expandedCard);
    const prevBody = document.getElementById('body-' + expandedCard);
    if (prevCard) prevCard.classList.remove('expanded');
    if (prevBody) prevBody.style.maxHeight = '0';
    const prevChevron = prevCard ? prevCard.querySelector('.chevron') : null;
    if (prevChevron) prevChevron.classList.remove('rotated');
  }

  // If clicking same card, just collapse (toggle off)
  if (wasExpanded) {
    expandedCard = null;
    return;
  }

  // Expand the clicked card
  expandedCard = productId;
  const card = document.getElementById('card-' + productId);
  const body = document.getElementById('body-' + productId);
  if (card) card.classList.add('expanded');
  if (body) body.style.maxHeight = body.scrollHeight + 'px';
  const chevron = card ? card.querySelector('.chevron') : null;
  if (chevron) chevron.classList.add('rotated');

  // Scroll into view after transition starts
  setTimeout(() => {
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/**
 * Filters content by product. Updates dropdown, dims non-selected cards,
 * auto-expands selected card, switches summary content.
 * "all" resets everything.
 */
function filterByProduct(productId) {
  currentProduct = productId;

  // Update dropdown display
  const dropdown = document.getElementById('product-filter');
  if (dropdown) dropdown.value = productId;

  // Update card styling
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const cardId = card.dataset.productId;
    if (productId === 'all') {
      card.classList.remove('dimmed');
    } else if (cardId === productId) {
      card.classList.remove('dimmed');
    } else {
      card.classList.add('dimmed');
    }
  });

  // Auto-expand selected product card (collapse others)
  if (productId !== 'all') {
    // Collapse current
    if (expandedCard && expandedCard !== productId) {
      const prevCard = document.getElementById('card-' + expandedCard);
      const prevBody = document.getElementById('body-' + expandedCard);
      if (prevCard) prevCard.classList.remove('expanded');
      if (prevBody) prevBody.style.maxHeight = '0';
      const prevChevron = prevCard ? prevCard.querySelector('.chevron') : null;
      if (prevChevron) prevChevron.classList.remove('rotated');
    }
    // Expand selected
    expandedCard = productId;
    const card = document.getElementById('card-' + productId);
    const body = document.getElementById('body-' + productId);
    if (card) card.classList.add('expanded');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
    const chevron = card ? card.querySelector('.chevron') : null;
    if (chevron) chevron.classList.add('rotated');

    setTimeout(() => {
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    // Collapse any expanded card on "all"
    if (expandedCard) {
      const prevCard = document.getElementById('card-' + expandedCard);
      const prevBody = document.getElementById('body-' + expandedCard);
      if (prevCard) prevCard.classList.remove('expanded');
      if (prevBody) prevBody.style.maxHeight = '0';
      const prevChevron = prevCard ? prevCard.querySelector('.chevron') : null;
      if (prevChevron) prevChevron.classList.remove('rotated');
      expandedCard = null;
    }
  }

  // Update summary content based on selection
  updateSummaryContent();
}

/**
 * Toggles between 'summary' and 'product-analysis' tabs.
 * Updates active tab styling and shows/hides content panels.
 */
function switchTab(tabId) {
  activeTab = tabId;

  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update content panels
  const summaryPanel = document.getElementById('tab-summary');
  const analysisPanel = document.getElementById('tab-product-analysis');

  if (summaryPanel) summaryPanel.style.display = tabId === 'summary' ? 'block' : 'none';
  if (analysisPanel) analysisPanel.style.display = tabId === 'product-analysis' ? 'block' : 'none';
}

/**
 * Updates the summary tab content based on current product filter.
 */
function updateSummaryContent() {
  const container = document.getElementById('summary-content');
  if (!container || !DEMO_DATA) return;

  const summaryKey = currentProduct === 'all' ? 'all' : currentProduct;
  const summaryData = DEMO_DATA.summaries[summaryKey];
  container.innerHTML = renderSummary(summaryData);
}

/**
 * Demo bar scenario handler.
 * 'default' — All products, summary tab
 * 'focus'   — Selects Gainsight CS, product analysis tab
 * 'risk'    — Selects Skilljar, product analysis tab
 */
function goScenario(scenarioId) {
  // Update demo bar buttons
  document.querySelectorAll('.demo-step').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scenario === scenarioId);
  });

  switch (scenarioId) {
    case 'default':
      switchTab('summary');
      filterByProduct('all');
      break;
    case 'focus':
      switchTab('product-analysis');
      filterByProduct('gainsight-cs');
      break;
    case 'risk':
      switchTab('product-analysis');
      filterByProduct('skilljar');
      break;
  }
}


/* ═══════════════════════════════════════════════════════════════
   3. INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */

/**
 * Initialize the application on DOMContentLoaded.
 * Renders initial state: all products visible, summary tab active.
 * Sets up event listeners for dropdown and tabs.
 */
function initApp() {
  if (typeof DEMO_DATA === 'undefined') {
    console.error('DEMO_DATA not found. Ensure demo-data.js is loaded before render-functions.js');
    return;
  }

  // Render product cards
  renderProductCards(DEMO_DATA.products);

  // Render initial summary (all products)
  updateSummaryContent();

  // Set up product filter dropdown listener
  const dropdown = document.getElementById('product-filter');
  if (dropdown) {
    dropdown.addEventListener('change', (e) => {
      filterByProduct(e.target.value);
    });
  }

  // Set up tab click listeners
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Set up demo bar scenario listeners
  document.querySelectorAll('.demo-step').forEach(btn => {
    btn.addEventListener('click', () => {
      goScenario(btn.dataset.scenario);
    });
  });

  // Default state: summary tab, all products
  switchTab('summary');
}

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
