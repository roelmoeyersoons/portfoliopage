/**
 * Cross-section navigation for the single-page (main) app.
 *
 * The page is a scroll flow (hero → experience → projects → skills …) with
 * no shared parent state for deep links, so click-through between sections
 * goes through window events + element anchors:
 *
 *   - Experience/Project cards declare ids: `exp-<id>` / `proj-<id>`.
 *   - Skill sections declare ids: `skill-<id>`.
 *   - gotoSkill(id) both scrolls to #skills and tells SkillsSection which
 *     skill to highlight, via a CustomEvent.
 */
export const GOTO_SKILL_EVENT = 'portfolio:goto-skill';

export function gotoSkill(skillId: string): void {
  window.dispatchEvent(new CustomEvent<string>(GOTO_SKILL_EVENT, { detail: skillId }));
  requestAnimationFrame(() => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  });
}

export function gotoAnchor(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
