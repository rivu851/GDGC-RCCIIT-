# Team Section - Setup Guide

## ✨ What I Built

A modern, animated team section for GDGC RCCIIT with:
- **Floating background animations** with Google brand colors (Blue, Red, Yellow, Green)
- **Animated team member cards** that slide up on scroll
- **Hover effects** with social media links (LinkedIn, GitHub, Twitter)
- **Google-themed design** with gradient accents
- **Responsive grid layout** (1 col mobile → 4 cols desktop)
- **Smooth scroll animations** using Framer Motion

## 📁 Files Created/Modified

### 1. `src/lib/team.ts` - Team Data
```typescript
- TeamMember interface
- teamMembers array (8 sample members)
- googleColors object
```

### 2. `src/components/team/TeamCard.tsx` - Individual Card Component
```typescript
Features:
- Animated entry on scroll
- Hover lift effect
- Rotating gradient top border (Google colors)
- Social media icons that appear on hover
- Image with zoom effect
- Gradient text on hover
```

### 3. `src/components/team/Team_section.tsx` - Main Section
```typescript
Features:
- Floating blob shapes (Google colors) with infinite animations
- Grid pattern overlay
- Animated section header with gradient text
- Responsive team grid
- "Join Our Team" CTA at bottom
```

## 🎨 Design Elements

### Colors Used (Google Brand)
- **Blue**: #4285F4
- **Red**: #EA4335
- **Yellow**: #FBBC04
- **Green**: #34A853

### Animations
1. **Floating shapes** - Continuous up/down, scale, and horizontal movement
2. **Cards** - Staggered slide-up on scroll (0.1s delay between each)
3. **Card hover** - Lift up 8px, scale 1.02x
4. **Social icons** - Slide up and fade in on card hover
5. **Header** - Fade in with scale effect

## 🔧 How to Customize

### Add Real Team Members

Edit `src/lib/team.ts`:

```typescript
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Your Name",
    role: "Your Role",
    image: "/assets/team/your-photo.jpg",  // Add to public/assets/team/
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle", // Optional
  },
  // Add more members...
];
```

### Change Colors

In `Team_section.tsx`, update the FloatingShape colors:
```tsx
<FloatingShape color="#YOUR_COLOR" size={400} initialX="10%" initialY="10%" duration={8} />
```

### Adjust Animation Timing

In `TeamCard.tsx`:
```tsx
transition={{
  duration: 0.5,        // Speed of animation
  delay: index * 0.1,   // Delay between cards (0.1s increments)
  ease: [0.21, 0.47, 0.32, 0.98],  // Easing curve
}}
```

### Grid Layout

In `Team_section.tsx`, change grid columns:
```tsx
// Current: 1 → 2 → 3 → 4 columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"

// Example: Always 3 columns on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
```

## 📸 Adding Team Photos

1. Create folder: `public/assets/team/`
2. Add images: `member1.jpg`, `member2.jpg`, etc.
3. Update paths in `team.ts`:
   ```typescript
   image: "/assets/team/member1.jpg"
   ```

### Fallback
If no image is provided, the card shows the first letter of the name.

## 🚀 Next Steps

### Optional Enhancements

1. **Add filtering by role**
   ```tsx
   <button onClick={() => filterBy('Lead')}>Leads</button>
   ```

2. **Add search functionality**
   ```tsx
   const [search, setSearch] = useState('');
   const filtered = teamMembers.filter(m => 
     m.name.toLowerCase().includes(search.toLowerCase())
   );
   ```

3. **Add team statistics**
   ```tsx
   <div>
     <h3>50+</h3>
     <p>Active Members</p>
   </div>
   ```

4. **Modal with full profile**
   - Click card → Show detailed bio, projects, achievements

5. **Connect to CMS/API**
   - Replace static data with Sanity, Strapi, or your backend

## 🎯 Current Structure

```
/teams page
├── TeamsHero (sticky at top)
└── Team_section (scrolls over hero with z-index)
    ├── Floating shapes (animated backgrounds)
    ├── Section header (animated)
    ├── Team grid
    │   └── TeamCard (8 cards)
    │       ├── Image
    │       ├── Social links
    │       └── Name/Role
    └── Join CTA
```

## 🐛 Troubleshooting

### Cards not animating?
- Make sure you're scrolling - animations trigger on scroll into view
- Check browser console for errors

### Images not loading?
- Verify image paths in `team.ts`
- Check files exist in `public/assets/team/`
- Use forward slashes: `/assets/team/image.jpg`

### Gradient classes warnings?
- These are Tailwind v4 linting suggestions
- They won't break your code
- To fix: Replace `bg-gradient-to-r` with `bg-linear-to-r` etc.

## 📱 Responsive Breakpoints

- **Mobile (< 640px)**: 1 column
- **Tablet (640px+)**: 2 columns
- **Desktop (1024px+)**: 3 columns
- **Large (1280px+)**: 4 columns

## 🎨 Theme Consistency

The design uses Google's Material Design principles:
- Clean, modern cards
- Subtle shadows
- Smooth animations (300-500ms)
- Google brand colors
- Rounded corners (2xl = 16px)
- Proper spacing hierarchy

---

## 🚀 Run the Project

```bash
pnpm dev
# or
npm run dev
```

Visit: `http://localhost:3000/teams`

Enjoy your modern team section! 🎉
