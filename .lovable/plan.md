

## Plan: Add Shadows and Remove Dotted Borders

### Overview
Update the Experience and Education accordion items to have subtle shadows and remove the dotted divider lines between items.

---

### Changes

#### 1. Update `src/components/home/ExperienceItem.tsx`

**Add shadow to the card container:**
- Change the outer wrapper from a simple `div` to a styled card with:
  - Rounded corners (`rounded-xl`)
  - Border (`border border-border`)
  - Shadow (`shadow-sm`)
  - Background (`bg-card`)
  - Padding adjustment (`p-4` instead of `py-4`)
  - Margin bottom for spacing between items (`mb-4`)

**Remove the dotted divider:**
- Delete line 118: `<div className="divider-line" />`

**Updated structure:**
```tsx
<div
  className="animate-fade-in-up rounded-xl border border-border bg-card shadow-sm p-4 mb-4"
  style={{ animationDelay: `${index * 100}ms` }}
>
  {/* Header */}
  <div className="flex items-start justify-between gap-4">
    {/* ... existing content ... */}
  </div>

  {/* Collapsible Content */}
  {/* ... existing content ... */}
</div>
```

---

#### 2. Update `src/components/home/EducationItem.tsx`

**Add shadow to the card container:**
- Same styling as ExperienceItem:
  - Rounded corners (`rounded-xl`)
  - Border (`border border-border`)
  - Shadow (`shadow-sm`)
  - Background (`bg-card`)
  - Padding (`p-4`)
  - Margin bottom (`mb-4`)

**Remove the dotted divider:**
- Delete line 102: `<div className="divider-line" />`

**Updated structure:**
```tsx
<div
  className="animate-fade-in-up rounded-xl border border-border bg-card shadow-sm p-4 mb-4"
  style={{ animationDelay: `${index * 100}ms` }}
>
  {/* Header */}
  <div className="flex items-start justify-between gap-4">
    {/* ... existing content ... */}
  </div>

  {/* Collapsible Content */}
  {/* ... existing content ... */}
</div>
```

---

### Files Summary

| File | Action | Changes |
|------|--------|---------|
| `src/components/home/ExperienceItem.tsx` | Update | Add shadow + border styling, remove `divider-line` |
| `src/components/home/EducationItem.tsx` | Update | Add shadow + border styling, remove `divider-line` |

---

### Visual Result

**Before:**
```text
┌──────────────────────────────────────┐
│ Company Name              Jan 2024   │
│ Role Title                           │
└──────────────────────────────────────┘
- - - - - - - - - - - - - - - - - - - -  (dotted line)
┌──────────────────────────────────────┐
│ Company Name 2            Dec 2023   │
│ Role Title 2                         │
└──────────────────────────────────────┘
- - - - - - - - - - - - - - - - - - - -  (dotted line)
```

**After:**
```text
╔══════════════════════════════════════╗
║ Company Name              Jan 2024   ║  ░░ shadow
║ Role Title                           ║  ░░
╚══════════════════════════════════════╝

╔══════════════════════════════════════╗
║ Company Name 2            Dec 2023   ║  ░░ shadow
║ Role Title 2                         ║  ░░
╚══════════════════════════════════════╝
```

Each item becomes a standalone card with subtle shadow, separated by margin spacing instead of dotted lines.

