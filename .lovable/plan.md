

## Plan: Simplify Project Filters and Restore Skills Section

### Overview
This plan addresses two changes:
1. Remove unnecessary sorting and filtering from the Projects page, keeping only Language filtering
2. Create a new Skills section component with Grid/List view toggle

---

### Part 1: Simplify Project Filters

#### 1.1 Update `src/components/projects/ProjectFilters.tsx`

**Remove:**
- Search input and related props (`searchQuery`, `onSearchChange`)
- Sort options section (Stars, Forks, Updated buttons)
- Topics filter section (`selectedTopic`, `onTopicChange`, `topics`)
- Related imports (`Search`, `ArrowUpDown`, `Star`, `GitFork`, `Clock`)

**Keep:**
- Language filter with colored dots
- Clear filters button (only for language)

**Simplified props interface:**
```typescript
interface ProjectFiltersProps {
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
  languages: string[];
}
```

#### 1.2 Update `src/pages/Projects.tsx`

**Remove:**
- `searchQuery` state and setter
- `selectedTopic` state and setter  
- `sortBy` state and setter
- `SortOption` import
- Search query filtering logic in `filteredRepos`
- Topic filtering logic in `filteredRepos`
- Sorting logic (switch statement with stars/forks/updated)
- `allTopics` useMemo hook
- Props passed to ProjectFilters: `searchQuery`, `onSearchChange`, `selectedTopic`, `onTopicChange`, `topics`, `sortBy`, `onSortChange`
- Reset effect dependency on `searchQuery`, `selectedTopic`, `sortBy`

**Keep:**
- `selectedLanguage` state
- `languages` useMemo
- Language filtering in `filteredRepos`
- Default sorting by stars (hardcoded, no toggle)

---

### Part 2: Create Skills Section with View Toggle

#### 2.1 Create `src/components/home/SkillsSection.tsx`

New component with:
- View mode toggle (Grid/List) using lucide icons (`LayoutGrid`, `List`)
- Grid view: Cards showing skill name, icon, and description in a responsive grid
- List view: Compact horizontal list with skill name and icon only
- Use existing `SkillIcon` component for rendering icons
- Fetch skills from `getSkills()` API
- Group skills by category (Core Technologies, Backend, Databases, etc.)
- Use animation classes for smooth transitions between views

**Structure:**
```typescript
const SkillsSection = () => {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Fetch skills on mount
  // Render toggle buttons
  // Render skills based on viewMode
}
```

**Grid View:**
- 2-3 column responsive grid
- Each card shows: icon, skill name, description
- Hover effects on cards
- Category headers above each group

**List View:**
- Horizontal flex-wrap layout
- Compact badges with icon + name only
- Category headers as sections

#### 2.2 Update `src/pages/Index.tsx`

**Add:**
- Import `SkillsSection` component
- Import `getSkills` from API (if not already)
- Add Skills section after Projects section with:
  - Divider before section
  - Section header with square bullet icon: "Skills"
  - SkillsSection component

#### 2.3 Update `src/api/index.ts`

**Ensure export:**
- `getSkills` function is exported (verify it's already there)

---

### Files Summary

| File | Action | Changes |
|------|--------|---------|
| `src/components/projects/ProjectFilters.tsx` | Update | Remove search, sort, topics; keep only language filter |
| `src/pages/Projects.tsx` | Update | Remove unused state and filtering logic |
| `src/components/home/SkillsSection.tsx` | Create | New skills section with grid/list toggle |
| `src/pages/Index.tsx` | Update | Add Skills section after Projects |
| `src/api/index.ts` | Update | Ensure getSkills is exported |

---

### Implementation Order

1. Update `src/components/projects/ProjectFilters.tsx` - simplify to language-only
2. Update `src/pages/Projects.tsx` - remove unused state and logic
3. Ensure `src/api/index.ts` exports `getSkills`
4. Create `src/components/home/SkillsSection.tsx` - new component with view toggle
5. Update `src/pages/Index.tsx` - add Skills section

---

### Visual Preview

**Projects Page After:**
- Only shows language filter buttons (TypeScript, JavaScript, etc.)
- No search bar, no sort options, no topic filters
- Projects still sorted by stars (default)

**Skills Section with Grid View:**
```text
■ Skills                    [Grid] [List]
─────────────────────────────────────────
Core Technologies
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ TS  TypeScript │ JS  JavaScript │ ⚛  React      │
│ Production backend... │ Full-stack dev... │ Data-driven UIs...│
└─────────────┘ └─────────────┘ └─────────────┘
```

**Skills Section with List View:**
```text
■ Skills                    [Grid] [List]
─────────────────────────────────────────
Core Technologies: [TS TypeScript] [JS JavaScript] [⚛ React] [NestJS]
Backend: [API Design] [Authentication] [Node.js]
```

