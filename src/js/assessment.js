/**
 * Agilis CP — Business Transformation Readiness Assessment
 * Interactive quiz engine with scoring, radar visualization, and lead capture
 */

(function() {
  'use strict';

  const DIMENSIONS = [
    { id: 'strategy', name: 'Strategic Alignment', color: '#2563EB' },
    { id: 'process', name: 'Process Maturity', color: '#0D9488' },
    { id: 'technology', name: 'Technology Readiness', color: '#7C3AED' },
    { id: 'change', name: 'Change Capacity', color: '#D97706' },
    { id: 'governance', name: 'Project Governance', color: '#059669' }
  ];

  const QUESTIONS = [
    {
      dimension: 'strategy',
      question: 'How well-aligned is your leadership team on the goals and priorities of your transformation initiative?',
      options: [
        { text: 'Leadership has not yet discussed transformation priorities', score: 1 },
        { text: 'There is general awareness but no formal alignment', score: 2 },
        { text: 'Key leaders are aligned but some gaps remain', score: 3 },
        { text: 'Full executive alignment with documented shared vision', score: 4 }
      ]
    },
    {
      dimension: 'strategy',
      question: 'Does your organization have a clear business case with measurable outcomes for this initiative?',
      options: [
        { text: 'No formal business case exists', score: 1 },
        { text: 'A high-level rationale exists but lacks specific metrics', score: 2 },
        { text: 'A business case exists with some measurable outcomes', score: 3 },
        { text: 'A comprehensive business case with ROI projections and KPIs', score: 4 }
      ]
    },
    {
      dimension: 'process',
      question: 'How would you describe your current business processes?',
      options: [
        { text: 'Largely informal, undocumented, and person-dependent', score: 1 },
        { text: 'Some documentation exists but processes vary by team', score: 2 },
        { text: 'Most processes are documented and reasonably standardized', score: 3 },
        { text: 'Processes are documented, standardized, and continuously improved', score: 4 }
      ]
    },
    {
      dimension: 'process',
      question: 'How does your organization measure operational performance?',
      options: [
        { text: 'We don\'t have formal performance metrics', score: 1 },
        { text: 'We track basic metrics but lack consistent reporting', score: 2 },
        { text: 'We have a defined set of KPIs reviewed regularly', score: 3 },
        { text: 'Comprehensive dashboards with real-time data driving decisions', score: 4 }
      ]
    },
    {
      dimension: 'technology',
      question: 'How would you rate your current technology stack\'s ability to support transformation?',
      options: [
        { text: 'Aging systems with significant technical debt', score: 1 },
        { text: 'Functional but limited — requires workarounds', score: 2 },
        { text: 'Solid foundation with some modernization needed', score: 3 },
        { text: 'Modern, integrated, cloud-ready, and scalable', score: 4 }
      ]
    },
    {
      dimension: 'technology',
      question: 'How effective is your organization at evaluating and selecting new technology solutions?',
      options: [
        { text: 'Decisions are often ad-hoc or vendor-driven', score: 1 },
        { text: 'We have a basic process but it\'s not consistently followed', score: 2 },
        { text: 'We follow a structured RFP process for major decisions', score: 3 },
        { text: 'Rigorous vendor-neutral evaluation with TCO analysis and scoring', score: 4 }
      ]
    },
    {
      dimension: 'change',
      question: 'How does your organization typically respond to major changes?',
      options: [
        { text: 'Significant resistance — changes are often derailed', score: 1 },
        { text: 'Mixed response — some adoption, some resistance', score: 2 },
        { text: 'Generally positive with pockets of resistance', score: 3 },
        { text: 'Strong change culture — people embrace and champion change', score: 4 }
      ]
    },
    {
      dimension: 'change',
      question: 'Does your organization have dedicated change management capabilities?',
      options: [
        { text: 'No formal change management function or approach', score: 1 },
        { text: 'Change management is handled informally by project teams', score: 2 },
        { text: 'We have change management resources for major projects', score: 3 },
        { text: 'Embedded OCM function with proven methodology and trained staff', score: 4 }
      ]
    },
    {
      dimension: 'governance',
      question: 'How mature is your project/program governance framework?',
      options: [
        { text: 'No formal project governance — projects are managed ad-hoc', score: 1 },
        { text: 'Basic governance for some projects but inconsistent', score: 2 },
        { text: 'Established PMO with standard methodology for major projects', score: 3 },
        { text: 'Enterprise PMO with portfolio management and gated reviews', score: 4 }
      ]
    },
    {
      dimension: 'governance',
      question: 'How does your organization handle risk management for strategic initiatives?',
      options: [
        { text: 'Risks are dealt with as they arise — no proactive management', score: 1 },
        { text: 'Some risks are identified upfront but tracking is inconsistent', score: 2 },
        { text: 'Formal risk registers maintained with regular reviews', score: 3 },
        { text: 'Comprehensive risk framework with mitigation plans and escalation paths', score: 4 }
      ]
    }
  ];

  const RECOMMENDATIONS = {
    strategy: {
      low: 'Your organization needs foundational strategic alignment work. Consider executive workshops to build a shared transformation vision and develop a formal business case with measurable outcomes.',
      mid: 'You have a solid strategic foundation but could benefit from sharpening your business case and ensuring all key stakeholders are fully bought in.',
      high: 'Strong strategic alignment. Focus on maintaining this as the initiative progresses and ensuring the vision cascades throughout the organization.'
    },
    process: {
      low: 'Process maturity is a significant opportunity area. Invest in documenting current processes and establishing baseline metrics before launching transformation efforts.',
      mid: 'Your processes provide a workable foundation. Consider a Lean Six Sigma assessment to identify high-impact improvement opportunities and close standardization gaps.',
      high: 'Excellent process maturity. Your organization is well-positioned to leverage this discipline in transformation — ensure new processes maintain the same rigor.'
    },
    technology: {
      low: 'Your technology landscape needs significant attention. A vendor-neutral technology assessment would help identify the right modernization path and investment priorities.',
      mid: 'Your tech stack is functional but has room for improvement. Focus on a structured evaluation process for new solutions and addressing integration gaps.',
      high: 'Strong technology foundation. Ensure your selection and governance processes keep pace with innovation and organizational growth.'
    },
    change: {
      low: 'Change management is your highest-risk area. Building organizational change capability should be a priority — even before launching major initiatives.',
      mid: 'Your organization has emerging change capability. Formalizing your change management approach and building internal champions will accelerate adoption.',
      high: 'Your change culture is a competitive advantage. Continue investing in this capacity and consider it a core component of every initiative.'
    },
    governance: {
      low: 'Project governance gaps pose the greatest risk to your transformation success. Establishing a formal PMO or engagement model should be an immediate priority.',
      mid: 'You have governance foundations in place. Strengthening risk management, gate reviews, and portfolio-level oversight will improve delivery confidence.',
      high: 'Mature governance framework in place. Keep refining your approach with lessons learned and ensure governance scales with initiative complexity.'
    }
  };

  let currentQuestion = 0;
  let answers = [];
  const app = document.getElementById('assessment-app');

  function init() {
    renderStart();
  }

  function renderStart() {
    app.innerHTML = `
      <div class="assessment__question-card" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 1.5rem;">📊</div>
        <h2 style="margin-bottom: 0.5rem;">Business Transformation Readiness Assessment</h2>
        <p style="color: var(--color-text-secondary); font-size: 1.05rem; max-width: 500px; margin: 0 auto 1.5rem;">
          Answer 10 questions across 5 critical dimensions to discover your organization's transformation readiness score.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-bottom: 2rem;">
          ${DIMENSIONS.map(d => `
            <span style="display:inline-flex;align-items:center;gap:6px;padding:0.4rem 0.9rem;background:${d.color}15;border:1px solid ${d.color}30;border-radius:999px;font-size:0.82rem;font-weight:500;color:${d.color};">
              <span style="width:8px;height:8px;border-radius:50%;background:${d.color};"></span>
              ${d.name}
            </span>
          `).join('')}
        </div>
        <p style="font-size: 0.88rem; color: var(--color-text-light); margin-bottom: 2rem;">⏱ Takes approximately 3 minutes</p>
        <button class="btn btn--primary btn--lg" id="start-assessment-btn" onclick="window.__assessment.start()">
          Start Assessment <span class="arrow">→</span>
        </button>
      </div>
    `;
  }

  function start() {
    currentQuestion = 0;
    answers = [];
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUESTIONS[currentQuestion];
    const dim = DIMENSIONS.find(d => d.id === q.dimension);
    const selected = answers[currentQuestion];

    app.innerHTML = `
      <div class="assessment__progress">
        ${QUESTIONS.map((_, i) => `
          <div class="assessment__progress-step ${i < currentQuestion ? 'completed' : ''} ${i === currentQuestion ? 'active' : ''}"></div>
        `).join('')}
      </div>
      <div class="assessment__question-card">
        <div class="assessment__dimension" style="color: ${dim.color};">${dim.name}</div>
        <div class="assessment__question">${q.question}</div>
        <div class="assessment__options">
          ${q.options.map((opt, i) => `
            <button class="assessment__option ${selected === i ? 'selected' : ''}" onclick="window.__assessment.select(${i})">
              <span class="assessment__option-marker"></span>
              ${opt.text}
            </button>
          `).join('')}
        </div>
        <div class="assessment__nav">
          ${currentQuestion > 0
            ? `<button class="btn btn--outline btn--sm" onclick="window.__assessment.prev()">← Back</button>`
            : '<div></div>'}
          <button class="btn btn--primary btn--sm" id="next-btn" onclick="window.__assessment.next()" ${selected === undefined ? 'disabled style="opacity:0.5;pointer-events:none;"' : ''}>
            ${currentQuestion === QUESTIONS.length - 1 ? 'See Results' : 'Next'} <span class="arrow">→</span>
          </button>
        </div>
      </div>
      <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: var(--color-text-light);">
        Question ${currentQuestion + 1} of ${QUESTIONS.length}
      </p>
    `;
  }

  function select(optionIndex) {
    answers[currentQuestion] = optionIndex;
    renderQuestion();
  }

  function next() {
    if (answers[currentQuestion] === undefined) return;
    if (currentQuestion < QUESTIONS.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      renderResults();
    }
  }

  function prev() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  }

  function calculateScores() {
    const dimScores = {};
    DIMENSIONS.forEach(d => { dimScores[d.id] = { total: 0, count: 0 }; });
    QUESTIONS.forEach((q, i) => {
      if (answers[i] !== undefined) {
        dimScores[q.dimension].total += q.options[answers[i]].score;
        dimScores[q.dimension].count++;
      }
    });
    const results = {};
    let overall = 0;
    let maxPossible = 0;
    DIMENSIONS.forEach(d => {
      const avg = dimScores[d.id].count > 0 ? dimScores[d.id].total / dimScores[d.id].count : 0;
      results[d.id] = Math.round(avg * 25); // 0-100 scale
      overall += dimScores[d.id].total;
      maxPossible += dimScores[d.id].count * 4;
    });
    results.overall = maxPossible > 0 ? Math.round((overall / maxPossible) * 100) : 0;
    return results;
  }

  function getLevel(score) {
    if (score < 40) return 'low';
    if (score < 70) return 'mid';
    return 'high';
  }

  function getOverallLabel(score) {
    if (score < 30) return 'Early Stage';
    if (score < 50) return 'Emerging';
    if (score < 70) return 'Developing';
    if (score < 85) return 'Established';
    return 'Optimized';
  }

  function renderResults() {
    const scores = calculateScores();
    const label = getOverallLabel(scores.overall);

    app.innerHTML = `
      <div class="results">
        <h2 style="margin-bottom: 0.5rem;">Your Readiness Score</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">Here's how your organization scored across the 5 transformation dimensions.</p>
        
        <div class="results__score-circle" style="--score-percent: ${scores.overall};">
          <div class="results__score-inner">
            <div class="results__score-value">${scores.overall}</div>
            <div class="results__score-label">${label}</div>
          </div>
        </div>
        
        <!-- Radar Chart SVG -->
        <div class="results__radar">
          ${renderRadarChart(scores)}
        </div>
        
        <div class="results__dimensions">
          ${DIMENSIONS.map(d => {
            const score = scores[d.id];
            const level = getLevel(score);
            const rec = RECOMMENDATIONS[d.id][level];
            return `
              <div class="results__dim">
                <div class="results__dim-header">
                  <span class="results__dim-name">${d.name}</span>
                  <span class="results__dim-score">${score}/100</span>
                </div>
                <div class="results__dim-bar">
                  <div class="results__dim-fill" style="width: ${score}%; background: linear-gradient(90deg, ${d.color}, ${d.color}CC);"></div>
                </div>
                <p class="results__dim-text">${rec}</p>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="results__cta">
          <h3>Discuss Your Results with Steve</h3>
          <p>Get a deeper analysis of your readiness score and a tailored roadmap for your transformation journey.</p>
          <a href="/contact/?score=${scores.overall}" class="btn btn--primary btn--lg" id="results-contact-btn">
            Schedule a Consultation <span class="arrow">→</span>
          </a>
        </div>

        <div style="margin-top: 1.5rem;">
          <button class="btn btn--outline" onclick="window.__assessment.restart()" id="retake-btn">Retake Assessment</button>
        </div>
      </div>
    `;

    // Animate bars after render
    setTimeout(() => {
      document.querySelectorAll('.results__dim-fill').forEach(bar => {
        bar.style.width = bar.style.width; // trigger reflow
      });
    }, 100);
  }

  function renderRadarChart(scores) {
    const size = 300;
    const center = size / 2;
    const radius = 120;
    const levels = 4;
    const dims = DIMENSIONS;
    const angleStep = (Math.PI * 2) / dims.length;
    const startAngle = -Math.PI / 2;

    // Grid lines
    let gridLines = '';
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (radius / levels) * lvl;
      let points = '';
      for (let i = 0; i < dims.length; i++) {
        const angle = startAngle + i * angleStep;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        points += `${x},${y} `;
      }
      gridLines += `<polygon points="${points}" fill="none" stroke="#E2E8F0" stroke-width="1"/>`;
    }

    // Axis lines
    let axisLines = '';
    for (let i = 0; i < dims.length; i++) {
      const angle = startAngle + i * angleStep;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      axisLines += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#E2E8F0" stroke-width="1"/>`;
    }

    // Data polygon
    let dataPoints = '';
    let dotsSvg = '';
    for (let i = 0; i < dims.length; i++) {
      const score = scores[dims[i].id] / 100;
      const angle = startAngle + i * angleStep;
      const x = center + radius * score * Math.cos(angle);
      const y = center + radius * score * Math.sin(angle);
      dataPoints += `${x},${y} `;
      dotsSvg += `<circle cx="${x}" cy="${y}" r="5" fill="${dims[i].color}" stroke="#fff" stroke-width="2"/>`;
    }

    // Labels
    let labels = '';
    for (let i = 0; i < dims.length; i++) {
      const angle = startAngle + i * angleStep;
      const labelRadius = radius + 28;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
      labels += `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-size="11" font-family="Outfit, sans-serif" font-weight="600" fill="#64748B">${dims[i].name.split(' ').map((w,j) => `<tspan x="${x}" dy="${j === 0 ? 0 : 14}">${w}</tspan>`).join('')}</text>`;
    }

    return `
      <svg viewBox="0 0 ${size} ${size}" width="100%" style="max-width: 340px; margin: 0 auto; display: block;">
        ${gridLines}
        ${axisLines}
        <polygon points="${dataPoints}" fill="rgba(37, 99, 235, 0.15)" stroke="#2563EB" stroke-width="2"/>
        ${dotsSvg}
        ${labels}
      </svg>
    `;
  }

  function restart() {
    currentQuestion = 0;
    answers = [];
    renderStart();
    window.scrollTo({ top: document.getElementById('assessment-section').offsetTop - 100, behavior: 'smooth' });
  }

  // Public API
  window.__assessment = { start, select, next, prev, restart };

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
