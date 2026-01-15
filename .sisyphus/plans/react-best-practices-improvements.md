# React Best Practices Improvements Plan

## Context

### Original Request
Apply React best practices guidelines to improve the portfolio codebase, addressing 10 identified issues across bundle size, performance, and rendering optimizations.

### Interview Summary

**Key Decisions**:
- Fix ALL 10 identified issues
- Lazy load motion library with `next/dynamic`
- Fix panel barrel imports (Option A - fix imports, keep barrel file)
- Use React 19 `use()` hook for GitHub contributions streaming
- Stick to analysis scope (no ESLint/TypeScript expansion)

**Technology Stack**:
- Next.js 16 (App Router with RSC)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- `unstable_cache` for data fetching

### Metis Review (Gap Analysis)

**Confirmed Scope Boundaries**:
- ✅ Fix barrel imports in 5+ files
- ✅ Implement React 19 `use()` hook pattern
- ✅ Extract inline SVG to component
- ✅ Lazy load motion library
- ✅ Add React.memo to static components
- ✅ Use explicit conditional rendering
- ✅ Fix audio hook pattern
- ✅ Review panel children typing
- ✅ Add explicit null returns
- ✅ Image optimization (already optimal)

**Out of Scope**:
- ❌ ESLint warning fixes
- ❌ TypeScript strict mode issues
- ❌ Accessibility (a11y) improvements
- ❌ Barrel file refactoring (only fixing imports)

---

## Work Objectives

### Core Objective
Transform the portfolio codebase to comply with React best practices guidelines, improving bundle size, rendering performance, and async patterns while maintaining all existing functionality.

### Concrete Deliverables
- Fixed barrel imports in 6+ files
- React 19 `use()` pattern for GitHub contributions
- Extracted SVG component for Philippines flag
- Lazy-loaded motion components
- Memoized static components
- Explicit conditional rendering patterns
- Improved audio hook pattern
- Type-safe panel component

### Definition of Done
- [ ] `pnpm build` completes successfully with no errors
- [ ] All pages render correctly in browser
- [ ] GitHub contributions load via React 19 `use()` hook
- [ ] Motion animations still work where used
- [ ] No console errors or warnings
- [ ] Bundle size check shows improvement or maintained

### Must Have
- All 10 issues addressed with visible improvements
- React 19 patterns properly implemented
- No regression in functionality
- Build passes

### Must NOT Have (Guardrails)
- NO changes to USER data or content files
- NO changes to lib/data/* files
- NO changes to existing public API contracts
- NO new dependencies (only use existing packages)
- NO breaking changes to component props
- NO changes to design or visual appearance
- NO deletion of any component files (only refactor/move)

---

## Verification Strategy (MANDATORY)

### Test Decision
- **Infrastructure exists**: NO (no test framework in project)
- **User wants tests**: NO (manual verification only)
- **Framework**: None (manual QA)

### Manual Verification Approach

All tasks include detailed manual verification procedures:

| Deliverable Type | Verification Tool | Procedure |
|-----------------|-------------------|-----------|
| **Build** | pnpm build | `pnpm build` → Success with no errors |
| **Component** | Browser DevTools | Navigate to page → Inspect element → Verify component exists |
| **Import changes** | Source code | Read file → Verify imports changed |
| **Motion lazy load** | Network tab | DevTools → Network → Reload → Verify motion chunks loaded on demand |
| **React 19 use()** | React DevTools | Components tab → See Suspense fallback then data |

**Evidence Required**:
- Build command output showing success
- Screenshot of browser with all sections visible
- Console showing no errors
- Network tab showing lazy-loaded chunks (for motion)

---

## Task Flow

```
Task 1 (Setup) → Task 2 (Imports) → Task 3 (GitHub use()) → Task 4 (SVG)
                ↘ Task 5 (Motion)
                
 ↗Task 6 (Memo) → Task 7 (Conditional) → Task 8 (Audio) → Task 9 (Panel Types)
                                                  ↘ Task 10 (Null returns)
                                                  
Task 11 (Build & Verify) → Task 12 (Final QA)
```

## Parallelization

| Group | Tasks | Reason |
|-------|-------|--------|
| A | 2a, 2b, 2c, 2d, 2e | Independent import fixes across different files |
| B | 6a, 6b, 6c | React.memo on different components |

| Task | Depends On | Reason |
|------|------------|--------|
| 3 | 2a-2e | GitHub fix uses proper import pattern |
| 4 | 2a-2e | SVG component uses proper imports |
| 5 | 2a-2e | Motion lazy load uses proper dynamic import |
| 6 | 2a-2e | Components already have fixed imports |
| 7 | 2a-2e | Conditional fixes are in components with fixed imports |
| 8 | 2a-2e | Audio hook uses proper React patterns |
| 9 | 2a-2e | Panel type review after import cleanup |
| 10 | 2a-2e | Null return fixes in components with fixed imports |
| 11 | 3-10 | Build requires all changes complete |
| 12 | 11 | Final QA after build success |

---

## TODOs

> Implementation + Verification = ONE Task. Never separate.
> Parallelizable indicated for each task.

- [ ] 1. Setup verification baseline

  **What to do**:
  - Run `pnpm build` and capture output
  - Screenshot browser showing all sections
  - Note any console warnings
  - Document current bundle size perception

  **Must NOT do**:
  - Make any code changes yet
  - Modify any files

  **Parallelizable**: NO (foundation task)

  **References**:
  - `package.json:1-54` - Current build scripts and dependencies
  - `app/page.tsx:1-81` - Main page structure to verify after changes
  - `app/layout.tsx:1-48` - Root layout for context

  **Acceptance Criteria**:
  - [ ] Command: `pnpm build` → Output captured (success or errors noted)
  - [ ] Screenshot: Browser load `.sisyphus/evidence/01-baseline-before.png` (all sections visible)
  - [ ] Console: No errors captured `.sisyphus/evidence/01-console-before.png`

  **Evidence Required**:
  - [ ] Build output saved to `.sisyphus/evidence/01-build-before.txt`
  - [ ] Browser screenshot saved to `.sisyphus/evidence/01-baseline-before.png`
  - [ ] Console screenshot saved to `.sisyphus/evidence/01-console-before.png`

  **Commit**: NO (baseline task)

- [ ] 2a. Fix barrel imports in components/portfolio/about.tsx

  **What to do**:
  - Change import from barrel to direct:
    ```tsx
    // FROM:
    import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/layout/panel";
    
    // TO (direct imports):
    import { Panel } from "@/components/layout/panel/panel";
    import { PanelContent, PanelHeader, PanelTitle } from "@/components/layout/panel/panel-header";
    ```
  - Note: May need to create separate files for PanelContent, PanelHeader, PanelTitle if they don't exist as separate files

  **Must NOT do**:
  - Change any component logic or props
  - Change any visual appearance
  - Modify data imports

  **Parallelizable**: YES (with 2b, 2c, 2d, 2e)

  **References**:
  - `components/portfolio/about.tsx:1-27` - Current imports to fix
  - `components/layout/panel.tsx:1-50` - Panel component source (verify structure)
  - React best practices: "Avoid barrel file imports (import directly from source)"

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/about.tsx` edited
  - [ ] Import: Changed from `@/components/layout/panel` to direct imports
  - [ ] Build: `pnpm build` → No import errors
  - [ ] Browser: Screenshot shows About section still renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success (0 errors, 0 warnings about imports)
  - [ ] Screenshot: `.sisyphus/evidence/02a-about.png` (About section visible)

  **Commit**: YES
  - Message: `refactor(portfolio): fix barrel imports in about.tsx`
  - Files: `components/portfolio/about.tsx`

- [ ] 2b. Fix barrel imports in components/portfolio/projects/index.tsx

  **What to do**:
  - Change import from barrel to direct:
    ```tsx
    // FROM:
    import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "@/components/layout/panel";
    
    // TO (direct imports):
    import { Panel } from "@/components/layout/panel/panel";
    import { PanelHeader, PanelTitle, PanelTitleSup } from "@/components/layout/panel/panel-header";
    ```

  **Must NOT do**:
  - Change any component logic or props
  - Change any visual appearance
  - Modify PROJECTS data import

  **Parallelizable**: YES (with 2a, 2c, 2d, 2e)

  **References**:
  - `components/portfolio/projects/index.tsx:1-24` - Current imports to fix
  - `components/layout/panel.tsx:1-50` - Panel component source
  - `components/portfolio/projects/project-item.tsx:1-50` - Project item component (may need fixing too)

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/projects/index.tsx` edited
  - [ ] Import: Changed from barrel to direct
  - [ ] Check: `components/portfolio/projects/project-item.tsx` for barrel imports
  - [ ] Build: `pnpm build` → No import errors
  - [ ] Browser: Screenshot shows Projects section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/02b-projects.png` (Projects section visible)

  **Commit**: YES
  - Message: `refactor(portfolio): fix barrel imports in projects/index.tsx`
  - Files: `components/portfolio/projects/index.tsx`

- [ ] 2c. Fix barrel imports in components/portfolio/overview/index.tsx

  **What to do**:
  - Change import from barrel to direct:
    ```tsx
    // FROM:
    import { Panel, PanelContent } from "@/components/layout/panel";
    
    // TO (direct imports):
    import { Panel } from "@/components/layout/panel/panel";
    import { PanelContent } from "@/components/layout/panel/panel-header";
    ```

  **Must NOT do**:
  - Change any component logic or props
  - Change any visual appearance

  **Parallelizable**: YES (with 2a, 2b, 2d, 2e)

  **References**:
  - `components/portfolio/overview/index.tsx:1-98` - Current imports to fix
  - `components/layout/panel.tsx:1-50` - Panel component source

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/overview/index.tsx` edited
  - [ ] Import: Changed from barrel to direct
  - [ ] Build: `pnpm build` → No import errors
  - [ ] Browser: Screenshot shows Overview section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/02c-overview.png` (Overview section visible)

  **Commit**: YES
  - Message: `refactor(portfolio): fix barrel imports in overview/index.tsx`
  - Files: `components/portfolio/overview/index.tsx`

- [ ] 2d. Fix barrel imports in components/portfolio/social-links/index.tsx

  **What to do**:
  - Change import from barrel to direct:
    ```tsx
    // FROM:
    import { Panel } from "@/components/layout/panel";
    
    // TO (direct imports):
    import { Panel } from "@/components/layout/panel/panel";
    ```

  **Must NOT do**:
  - Change any component logic or props
  - Change any visual appearance

  **Parallelizable**: YES (with 2a, 2b, 2c, 2e)

  **References**:
  - `components/portfolio/social-links/index.tsx:1-27` - Current imports to fix
  - `components/layout/panel.tsx:1-50` - Panel component source

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/social-links/index.tsx` edited
  - [ ] Import: Changed from barrel to direct
  - [ ] Build: `pnpm build` → No import errors
  - [ ] Browser: Screenshot shows Social Links section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/02d-social-links.png` (Social Links section visible)

  **Commit**: YES
  - Message: `refactor(portfolio): fix barrel imports in social-links/index.tsx`
  - Files: `components/portfolio/social-links/index.tsx`

- [ ] 2e. Fix barrel imports in components/portfolio/github-contributions/index.tsx

  **What to do**:
  - Change import from barrel to direct:
    ```tsx
    // FROM:
    import { Panel } from "@/components/layout/panel";
    
    // TO (direct imports):
    import { Panel } from "@/components/layout/panel/panel";
    ```

  **Must NOT do**:
  - Change any component logic or props
  - Change any visual appearance

  **Parallelizable**: YES (with 2a, 2b, 2c, 2d)

  **References**:
  - `components/portfolio/github-contributions/index.tsx:1-19` - Current imports to fix
  - `components/layout/panel.tsx:1-50` - Panel component source

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/github-contributions/index.tsx` edited
  - [ ] Import: Changed from barrel to direct
  - [ ] Build: `pnpm build` → No import errors
  - [ ] Browser: Screenshot shows GitHub Contributions section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/02e-github-contributions.png` (GitHub section visible)

  **Commit**: YES
  - Message: `refactor(portfolio): fix barrel imports in github-contributions/index.tsx`
  - Files: `components/portfolio/github-contributions/index.tsx`

- [ ] 3. Implement React 19 use() hook for GitHub contributions

  **What to do**:
  - Modify `components/portfolio/github-contributions/index.tsx` to use React 19 `use()` hook:
    ```tsx
    "use client";
    
    import { use } from "react";
    import { getGitHubContributions } from "@/lib/data/github-contributions";
    import { Panel } from "@/components/layout/panel/panel";
    import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";
    
    export function GitHubContributions() {
      const contributions = use(getGitHubContributions());
    
      return (
        <Panel>
          <h2 className="sr-only">GitHub Contributions</h2>
          <GitHubContributionGraph contributions={contributions} />
        </Panel>
      );
    }
    ```
  - Note: Remove Suspense wrapper since `use()` handles streaming automatically

  **Must NOT do**:
  - Change graph component props interface
  - Change visual appearance of graph
  - Modify GitHub API function

  **Parallelizable**: NO (depends on Task 2e)

  **References**:
  - `components/portfolio/github-contributions/index.tsx:1-19` - Current implementation
  - `lib/data/github-contributions.ts:1-20` - Cached data function (keep as-is)
  - React 19 docs: "use() hook for async data streaming"
  - `components/portfolio/github-contributions/graph.tsx:1-50` - Graph component

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/github-contributions/index.tsx` edited with "use client"
  - [ ] Hook: `use(getGitHubContributions())` replaces direct call + Suspense
  - [ ] Build: `pnpm build` → No errors
  - [ ] Browser: GitHub contributions load via React 19 use() pattern
  - [ ] Network: Verify API call happens and data streams in

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/03-github-use-hook.png` (GitHub graph visible)
  - [ ] Network: `.sisyphus/evidence/03-network-github.png` (API call visible)

  **Commit**: YES
  - Message: `feat(github): implement React 19 use() hook for async streaming`
  - Files: `components/portfolio/github-contributions/index.tsx`

- [ ] 4. Extract inline SVG to separate component

  **What to do**:
  - Create new file `components/ui/philippines-flag-icon.tsx`:
    ```tsx
    import { cn } from "@/lib/utils";
    
    export function PhilippinesFlagIcon({ className }: { className?: string }) {
      return (
        <svg
          className={cn("h-8 sm:h-9", className)}
          viewBox="0 0 640 480"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Flag of Philippines"
        >
          <title>Flag of Philippines</title>
          <path fill="#0038a8" d="M0 0h640v240H0z" />
          <path fill="#ce1126" d="M0 240h640v240H0z" />
          <path fill="#fff" d="M415.7 240 0 480V0" />
          <path fill="#fcd116" d="M26.7 42.4 41 55l16.6-9.2-7.4 17.5 14 13-19-1.6-8.1 17.2-4.3-18.5L14 71l16.3-10zm323.8 172.3.4 19 18 6.3-18 6.2-.4 19-11.5-15.1-18.2 5.5 10.8-15.6-10.8-15.6 18.2 5.5zM37.2 388.1l8 17.2 19-1.6-13.9 13 7.4 17.5-16.6-9.1-14.4 12.4 3.6-18.7L14 409l18.9-2.4zm114.2-249-6.2 6.2 3.1 47-3 .3-5.7-42.9-5.1 5 7.6 38.4a48 48 0 0 0-17.2 7.1l-21.7-32.4H96l26.4 34.3-2.4 2-31.1-35.5h-8.8v8.8l35.4 31-2 2.5-34.3-26.3v7.1l32.5 21.7q-5.2 7.8-7.1 17.2L66.3 223l-5.1 5 42.9 5.7q-.3 1.6-.3 3.1l-47-3-6.2 6.2 6.2 6.2 47-3.1.3 3.1-42.9 5.7 5 5 38.4-7.6a48 48 0 0 0 7.1 17.2l-32.5 21.7v7.2l34.3-26.3 2 2.4-35.4 31v8.8H89l31-35.4 2.5-2L96 312.2h7.2l21.7-32.5q7.8 5.2 17.2 7.1l-7.6 38.4 5 5 5.7-42.9q1.5.3 3.1.3l-3 47 6.1 6.2 6.3-6.2-3.1-47 3-.3 5.7 43 5.1-5.1-7.6-38.4a48 48 0 0 0 17.2-7.1l21.7 32.5h7.2l-26.4-34.3 2.4-2 31.1 35.4h8.8v-8.8l-35.4-31 2-2.4 34.3 26.3v-7.2l-32.5-21.7q5.2-7.8 7.1-17.2l38.3 7.6 5.1-5-42.9-5.7q.3-1.5.3-3.1l47 3 6.2-6.1-6.2-6.2-47 3-.3-3 42.9-5.7-5-5-38.4 7.5a48 48 0 0 0-7.1-17.2l32.5-21.7v-7.1l-34.3 26.3-2-2.4 35.4-31v-8.9H214l-31 35.5-2.5-2 26.4-34.3h-7.2L178 200.2q-7.8-5.2-17.2-7.1l7.6-38.3-5-5-5.7 42.8-3.1-.3 3-47z" />
        </svg>
      );
    }
    ```
  - Update `components/ui/profile-header.tsx` to use new component

  **Must NOT do**:
  - Change SVG paths or colors
  - Change dimensions or positioning
  - Change any visual appearance

  **Parallelizable**: NO (depends on Task 2a-2e)

  **References**:
  - `components/ui/profile-header.tsx:30-43` - Inline SVG to extract
  - `lib/utils.ts:1-8` - cn utility for className merging
  - React best practices: "Extract inline SVG to component"

  **Acceptance Criteria**:
  - [ ] File: `components/ui/philippines-flag-icon.tsx` created
  - [ ] File: `components/ui/profile-header.tsx` updated to use new component
  - [ ] Build: `pnpm build` → No errors
  - [ ] Browser: Flag renders identically to before
  - [ ] DOM: Verify SVG is now a component, not inline in HTML

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/04-profile-header.png` (Flag visible)
  - [ ] DOM inspect: Show component tag instead of inline SVG

  **Commit**: YES
  - Message: `refactor(ui): extract inline SVG to PhilippinesFlagIcon component`
  - Files: `components/ui/philippines-flag-icon.tsx`, `components/ui/profile-header.tsx`

- [ ] 5. Lazy load motion library with next/dynamic

  **What to do**:
  - Find all files that import `motion` from `motion` package
  - Create dynamic imports using `next/dynamic`:
    ```tsx
    import dynamic from "next/dynamic";
    
    const AnimatedComponent = dynamic(() => import("motion").then(mod => mod.Motion), {
      ssr: false,
      loading: () => <div>Loading animation...</div>
    });
    ```
  - Apply to components using motion animations

  **Must NOT do**:
  - Break any animations
  - Change animation behavior
  - Add new animation dependencies

  **Parallelizable**: NO (depends on Task 2a-2e)

  **References**:
  - `package.json:23` - "motion": "^12.26.2"
  - Search for: `grep_app_searchGitHub({query: "from \"motion\"", path: "C:\\Users\\bryan\\Desktop\\portfolio"})`
  - `components/animated-icons/*.tsx` - Likely uses motion
  - Next.js docs: "next/dynamic for lazy loading"

  **Acceptance Criteria**:
  - [ ] Files: All motion imports identified
  - [ ] Files: Dynamic imports created with `next/dynamic`
  - [ ] Build: `pnpm build` → No errors
  - [ ] Network: Motion library loads on-demand (not initial bundle)
  - [ ] Animations: All motion animations still work

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/05-network-motion.png` (motion chunks lazy loaded)
  - [ ] Screenshot: `.sisyphus/evidence/05-animations.png` (animations working)

  **Commit**: YES
  - Message: `perf: lazy load motion library with next/dynamic`
  - Files: All files using motion

- [ ] 6a. Add React.memo to components/portfolio/about.tsx

  **What to do**:
  - Wrap About component in React.memo:
    ```tsx
    import { memo } from "react";
    
    const About = memo(function About() {
      // ... existing component code
    });
    ```

  **Must NOT do**:
  - Add unnecessary re-renders
  - Change component props or behavior

  **Parallelizable**: YES (with 6b, 6c)

  **References**:
  - `components/portfolio/about.tsx:1-27` - Component to memoize
  - React docs: "React.memo for preventing unnecessary re-renders"

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/about.tsx` uses React.memo
  - [ ] Build: `pnpm build` → No errors
  - [ ] Browser: About section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/06a-about-memo.png` (About visible)

  **Commit**: YES
  - Message: `perf(portfolio): add React.memo to About component`
  - Files: `components/portfolio/about.tsx`

- [ ] 6b. Add React.memo to components/portfolio/projects/index.tsx

  **What to do**:
  - Wrap Projects component in React.memo

  **Must NOT do**:
  - Change any logic or props

  **Parallelizable**: YES (with 6a, 6c)

  **References**:
  - `components/portfolio/projects/index.tsx:1-24` - Component to memoize

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/projects/index.tsx` uses React.memo
  - [ ] Build: `pnpm build` → No errors
  - [ ] Browser: Projects section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/06b-projects-memo.png` (Projects visible)

  **Commit**: YES
  - Message: `perf(portfolio): add React.memo to Projects component`
  - Files: `components/portfolio/projects/index.tsx`

- [ ] 6c. Add React.memo to components/portfolio/social-links/index.tsx

  **What to do**:
  - Wrap SocialLinks component in React.memo

  **Must NOT do**:
  - Change any logic or props

  **Parallelizable**: YES (with 6a, 6b)

  **References**:
  - `components/portfolio/social-links/index.tsx:1-27` - Component to memoize

  **Acceptance Criteria**:
  - [ ] File: `components/portfolio/social-links/index.tsx` uses React.memo
  - [ ] Build: `pnpm build` → No errors
  - [ ] Browser: Social Links section renders correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/06c-social-memo.png` (Social Links visible)

  **Commit**: YES
  - Message: `perf(portfolio): add React.memo to SocialLinks component`
  - Files: `components/portfolio/social-links/index.tsx`

- [ ] 7. Fix conditional rendering patterns (&& to ternary)

  **What to do**:
  - Find all uses of `condition && <Component />` pattern
  - Convert to explicit ternary: `condition ? <Component /> : null`
  - Check for hydration mismatch issues

  **Must NOT do**:
  - Change component behavior
  - Add unnecessary null fallbacks

  **Parallelizable**: NO (depends on Task 2a-2e)

  **References**:
  - Search for: `grep_app_searchGitHub({path: "C:\\Users\\bryan\\Desktop\\portfolio", query: " && <"})`
  - `components/portfolio/github-contributions/index.tsx` - May have conditional
  - React best practices: "Explicit conditional rendering (? : not &&)"

  **Acceptance Criteria**:
  - [ ] Files: All `&&` conditionals found and fixed
  - [ ] Build: `pnpm build` → No errors
  - [ ] Browser: No hydration mismatches in console

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Console: `.sisyphus/evidence/07-console.png` (no hydration warnings)

  **Commit**: YES
  - Message: `refactor: replace && conditional with explicit ternary`
  - Files: All files with conditional fixes

- [ ] 8. Improve useSound hook pattern

  **What to do**:
  - Improve `hooks/use-sound.ts` to avoid client-side fetch waterfall:
    ```tsx
    // Consider preloading or better error handling
    // Add error boundary support
    // Consider using useTransition for loading state
    ```

  **Must NOT do**:
  - Change the hook's public API
  - Break existing sound functionality

  **Parallelizable**: NO (depends on Task 2a-2e)

  **References**:
  - `hooks/use-sound.ts:1-68` - Current implementation
  - React best practices: "Avoid client-side fetch waterfalls"

  **Acceptance Criteria**:
  - [ ] File: `hooks/use-sound.ts` improved with better patterns
  - [ ] Build: `pnpm build` → No errors
  - [ ] Sound: Audio still plays correctly when used

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success
  - [ ] Screenshot: `.sisyphus/evidence/08-sound-hook.png` (sound functionality works)

  **Commit**: YES
  - Message: `perf(hooks): improve useSound hook pattern`
  - Files: `hooks/use-sound.ts`

- [ ] 9. Review and improve Panel component children typing

  **What to do**:
  - Review `components/layout/panel.tsx` for proper children prop typing
  - Ensure type-safe component composition
  - Consider using proper React.FC or explicit props

  **Must NOT do**:
  - Change component API
  - Break existing usage

  **Parallelizable**: NO (depends on Task 2a-2e)

  **References**:
  - `components/layout/panel.tsx:1-50` - Panel component source
  - TypeScript best practices: "Proper children typing"

  **Acceptance Criteria**:
  - [ ] File: `components/layout/panel.tsx` has improved typing
  - [ ] Build: `pnpm build` → No type errors
  - [ ] All panel usages still work correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success (0 type errors)

  **Commit**: YES
  - Message: `types(layout): improve Panel component children typing`
  - Files: `components/layout/panel.tsx`

- [ ] 10. Add explicit null returns where needed

  **What to do**:
  - Find components that may return nothing implicitly
  - Add explicit `return null` where appropriate
  - Ensure proper TypeScript return types

  **Must NOT do**:
  - Change component logic
  - Add unnecessary null returns

  **Parallelizable**: NO (depends on Task 2a-2e)

  **References**:
  - Search for: `grep_app_searchGitHub({path: "C:\\Users\\bryan\\Desktop\\portfolio", query: "return;"})`
  - TypeScript best practices: "Explicit return types"

  **Acceptance Criteria**:
  - [ ] Files: All implicit returns reviewed
  - [ ] Build: `pnpm build` → No type errors
  - [ ] Components: All function correctly

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Success

  **Commit**: YES
  - Message: `types: add explicit null returns where needed`
  - Files: All files with null return fixes

- [ ] 11. Build verification after all changes

  **What to do**:
  - Run `pnpm build` to verify all changes
  - Capture build output
  - Compare with baseline from Task 1

  **Must NOT do**:
  - Make any more changes (this is verification only)

  **Parallelizable**: NO (depends on Task 3-10)

  **References**:
  - Task 1: Baseline build output

  **Acceptance Criteria**:
  - [ ] Build: `pnpm build` → Success
  - [ ] Output: Compare with baseline (improvement or maintained)

  **Evidence Required**:
  - [ ] Command: `pnpm build` → Output saved to `.sisyphus/evidence/11-build-after.txt`

  **Commit**: NO (verification task)

- [ ] 12. Final QA and evidence compilation

  **What to do**:
  - Browser verification of all sections
  - Console error check
  - Network performance check (motion lazy loading)
  - Compile all evidence screenshots

  **Must NOT do**:
  - Make any code changes

  **Parallelizable**: NO (depends on Task 11)

  **Acceptance Criteria**:
  - [ ] All 12 sections render correctly in browser
  - [ ] No console errors or warnings
  - [ ] Motion chunks lazy loaded (verified in Network tab)
  - [ ] GitHub contributions load via use() hook

  **Evidence Required**:
  - [ ] Screenshot: `.sisyphus/evidence/12-final-page.png` (full page)
  - [ ] Console: `.sisyphus/evidence/12-final-console.png` (no errors)
  - [ ] Network: `.sisyphus/evidence/12-final-network.png` (lazy loading verified)
  - [ ] Summary: `.sisyphus/evidence/SUMMARY.md` (all evidence linked)

  **Commit**: NO (QA task)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | (baseline - no commit) | - | Build output captured |
| 2a | `refactor(portfolio): fix barrel imports in about.tsx` | about.tsx | Build passes |
| 2b | `refactor(portfolio): fix barrel imports in projects/index.tsx` | projects/index.tsx | Build passes |
| 2c | `refactor(portfolio): fix barrel imports in overview/index.tsx` | overview/index.tsx | Build passes |
| 2d | `refactor(portfolio): fix barrel imports in social-links/index.tsx` | social-links/index.tsx | Build passes |
| 2e | `refactor(portfolio): fix barrel imports in github-contributions/index.tsx` | github-contributions/index.tsx | Build passes |
| 3 | `feat(github): implement React 19 use() hook` | github-contributions/index.tsx | Streaming works |
| 4 | `refactor(ui): extract inline SVG to component` | philippines-flag-icon.tsx, profile-header.tsx | SVG renders |
| 5 | `perf: lazy load motion library` | Files using motion | Lazy loading works |
| 6a | `perf(portfolio): add React.memo to About` | about.tsx | Build passes |
| 6b | `perf(portfolio): add React.memo to Projects` | projects/index.tsx | Build passes |
| 6c | `perf(portfolio): add React.memo to SocialLinks` | social-links/index.tsx | Build passes |
| 7 | `refactor: replace && conditional with ternary` | All files fixed | No hydration issues |
| 8 | `perf(hooks): improve useSound hook` | use-sound.ts | Audio works |
| 9 | `types(layout): improve Panel typing` | panel.tsx | No type errors |
| 10 | `types: add explicit null returns` | All files fixed | Build passes |
| 11 | (verification - no commit) | - | Build success |
| 12 | (QA - no commit) | - | All working |

---

## Success Criteria

### Verification Commands
```bash
# 1. Baseline
pnpm build > .sisyphus/evidence/01-build-before.txt 2>&1

# 2. After changes
pnpm build > .sisyphus/evidence/11-build-after.txt 2>&1

# 3. Final verification
pnpm build && echo "Build successful - all changes complete"
```

### Final Checklist
- [ ] All "Must Have" present (10 issues addressed)
- [ ] All "Must NOT Have" absent (no breaking changes)
- [ ] `pnpm build` succeeds
- [ ] All pages render correctly in browser
- [ ] No console errors or warnings
- [ ] GitHub contributions load via React 19 use() hook
- [ ] Motion library lazy loaded (verified in Network tab)
- [ ] Bundle size improved or maintained
- [ ] All evidence screenshots captured
- [ ] Summary document created

---

## Evidence Location

All evidence saved to `.sisyphus/evidence/`:
- `01-build-before.txt` - Initial build output
- `01-baseline-before.png` - Browser screenshot before changes
- `01-console-before.png` - Console before changes
- `02a-about.png` - About section after import fix
- `02b-projects.png` - Projects section after import fix
- `02c-overview.png` - Overview section after import fix
- `02d-social-links.png` - Social Links after import fix
- `02e-github-contributions.png` - GitHub section after import fix
- `03-github-use-hook.png` - GitHub with use() hook
- `03-network-github.png` - Network tab for GitHub API
- `04-profile-header.png` - Profile header with extracted SVG
- `05-network-motion.png` - Motion lazy loading
- `05-animations.png` - Animations working
- `06a-about-memo.png` - About with React.memo
- `06b-projects-memo.png` - Projects with React.memo
- `06c-social-memo.png` - Social Links with React.memo
- `07-console.png` - No hydration warnings
- `08-sound-hook.png` - Sound functionality
- `11-build-after.txt` - Final build output
- `12-final-page.png` - Full page screenshot
- `12-final-console.png` - Final console (no errors)
- `12-final-network.png` - Final network (lazy loading)
- `SUMMARY.md` - Summary of all evidence