import { useState } from "react";

const workouts = [
  {
    id: 1,
    title: "Entrenamiento de Fuerza Total",
    desc: "Rutina completa de cuerpo entero para desarrollar músculo y fuerza",
    level: "Intermedio",
    levelColor: "#F59E0B",
    time: "45 min",
    kcal: "350 kcal",
    exercises: "8 ejercicios",
    tags: [
      { label: "Mancuernas", color: "red" },
      { label: "Barra", color: "red" },
    ],
    bg: "#2c3e50",
    icon: "💪",
  },
  {
    id: 2,
    title: "HIIT Cardio Explosivo",
    desc: "Intervalos de alta intensidad para quemar grasa y mejorar resistencia",
    level: "Avanzado",
    levelColor: "#CC2929",
    time: "30 min",
    kcal: "420 kcal",
    exercises: "12 ejercicios",
    tags: [
      { label: "Sin equipo", color: "green" },
      { label: "Cardio", color: "blue" },
    ],
    bg: "#1a1a2e",
    icon: "🔥",
  },
  {
    id: 3,
    title: "Yoga para Principiantes",
    desc: "Sesión suave de yoga para ganar flexibilidad y reducir el estrés",
    level: "Principiante",
    levelColor: "#10B981",
    time: "40 min",
    kcal: "150 kcal",
    exercises: "15 ejercicios",
    tags: [
      { label: "Esterilla", color: "green" },
      { label: "Flexibilidad", color: "purple" },
    ],
    bg: "#0f4c75",
    icon: "🧘",
  },
  {
    id: 4,
    title: "Piernas y Glúteos Pro",
    desc: "Trabajo intenso de tren inferior con máquinas y peso libre",
    level: "Avanzado",
    levelColor: "#CC2929",
    time: "55 min",
    kcal: "480 kcal",
    exercises: "10 ejercicios",
    tags: [
      { label: "Máquinas", color: "blue" },
      { label: "Pesas", color: "red" },
    ],
    bg: "#2d1b69",
    icon: "🦵",
  },
  {
    id: 5,
    title: "Core y Abdomen",
    desc: "Fortalece tu zona media con ejercicios funcionales y de estabilidad",
    level: "Intermedio",
    levelColor: "#F59E0B",
    time: "25 min",
    kcal: "200 kcal",
    exercises: "9 ejercicios",
    tags: [
      { label: "Sin equipo", color: "green" },
      { label: "Banda elástica", color: "amber" },
    ],
    bg: "#1b4332",
    icon: "⚡",
  },
  {
    id: 6,
    title: "Cardio Suave Matutino",
    desc: "Rutina ligera para activar el cuerpo al despertar sin impacto",
    level: "Principiante",
    levelColor: "#10B981",
    time: "20 min",
    kcal: "120 kcal",
    exercises: "6 ejercicios",
    tags: [{ label: "Sin equipo", color: "green" }],
    bg: "#7c3aed",
    icon: "🌅",
  },
  {
    id: 7,
    title: "Espalda y Bíceps",
    desc: "Sesión focalizada en la musculatura posterior y brazos",
    level: "Intermedio",
    levelColor: "#F59E0B",
    time: "50 min",
    kcal: "310 kcal",
    exercises: "11 ejercicios",
    tags: [
      { label: "Mancuernas", color: "red" },
      { label: "Barra", color: "red" },
      { label: "Polea", color: "blue" },
    ],
    bg: "#134e4a",
    icon: "🏋️",
  },
];

const filters = [
  { label: "Todos", count: 24 },
  { label: "Principiante", count: 8 },
  { label: "Fuerza", count: 6 },
  { label: "Cardio", count: 5 },
  { label: "Avanzado", count: 4 },
];

const tagStyles = {
  red:    { background: "#FEE2E2", color: "#991B1B" },
  blue:   { background: "#DBEAFE", color: "#1E40AF" },
  green:  { background: "#D1FAE5", color: "#065F46" },
  purple: { background: "#EDE9FE", color: "#5B21B6" },
  amber:  { background: "#FEF3C7", color: "#92400E" },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconMic = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const IconFilter = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="1.5" fill="#fff" stroke="none" />
    <circle cx="4" cy="12" r="1.5" fill="#fff" stroke="none" />
    <circle cx="4" cy="18" r="1.5" fill="#fff" stroke="none" />
  </svg>
);

const IconHeart = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#CC2929" : "none"} stroke="#CC2929" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconFire = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const IconBolt = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

// ─── Nav Icons ────────────────────────────────────────────────────────────────

const NavDashboard = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#CC2929" : "#9CA3AF"} strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const NavWorkouts = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#CC2929" : "#9CA3AF"} strokeWidth="1.8">
    <path d="M6 4v16M18 4v16M6 8h12M6 16h12M4 6h4M16 6h4M4 18h4M16 18h4" />
  </svg>
);

const NavRecipes = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#CC2929" : "#9CA3AF"} strokeWidth="1.8">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);

const NavTrainer = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#CC2929" : "#9CA3AF"} strokeWidth="1.8">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const NavStore = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#CC2929" : "#9CA3AF"} strokeWidth="1.8">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

// ─── WorkoutCard ──────────────────────────────────────────────────────────────

function WorkoutCard({ workout, isFav, onToggleFav }) {
  return (
    <div style={styles.card}>
      {/* Image area */}
      <div style={{ ...styles.imgBox, background: workout.bg }}>
        <span style={{ fontSize: 52 }}>{workout.icon}</span>
        <div style={{ ...styles.badge, background: workout.levelColor }}>
          {workout.level}
        </div>
        <button style={styles.favBtn} onClick={() => onToggleFav(workout.id)}>
          <IconHeart filled={isFav} />
        </button>
      </div>

      {/* Body */}
      <div style={styles.cardBody}>
        <p style={styles.cardTitle}>{workout.title}</p>
        <p style={styles.cardDesc}>{workout.desc}</p>

        <div style={styles.meta}>
          <span style={styles.metaItem}><IconClock /> {workout.time}</span>
          <span style={styles.metaItem}><IconFire /> {workout.kcal}</span>
          <span style={styles.metaItem}><IconBolt /> {workout.exercises}</span>
        </div>

        <div style={styles.tags}>
          {workout.tags.map((tag, i) => (
            <span key={i} style={{ ...styles.tag, ...tagStyles[tag.color] }}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FilterPill ───────────────────────────────────────────────────────────────

function FilterPill({ filter, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.pill,
        background: active ? "#CC2929" : "#F3F4F6",
        color: active ? "#fff" : "#6B7280",
        border: active ? "none" : "0.5px solid #E5E7EB",
      }}
    >
      {filter.label}
      <span
        style={{
          ...styles.pillCount,
          background: active ? "rgba(255,255,255,0.25)" : "#E5E7EB",
          color: active ? "#fff" : "#9CA3AF",
        }}
      >
        {filter.count}
      </span>
    </button>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", Icon: NavDashboard },
  { label: "Workouts",  Icon: NavWorkouts  },
  { label: "Recipes",   Icon: NavRecipes   },
  { label: "Trainer",   Icon: NavTrainer   },
  { label: "Store",     Icon: NavStore     },
];

function BottomNav({ active, onChange }) {
  return (
    <div style={styles.bottomNav}>
      {navItems.map((item, i) => {
        const isActive = active === i;
        return (
          <div key={i} style={styles.navItem} onClick={() => onChange(i)}>
            <item.Icon active={isActive} />
            <span style={{ ...styles.navLabel, color: isActive ? "#CC2929" : "#9CA3AF" }}>
              {item.label}
            </span>
            {isActive && <div style={styles.navDot} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function WorkoutsScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [favs, setFavs] = useState(new Set([2, 5]));
  const [activeNav, setActiveNav] = useState(1);
  const [search, setSearch] = useState("");

  const toggleFav = (id) => {
    setFavs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredWorkouts = workouts.filter((w) =>
    w.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.phone}>
      <div style={styles.statusBar}>
        <span style={styles.statusTime}>9:41</span>
        <div style={styles.statusIcons}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
            <path d="M1.5 8.5C5.5 4.5 18.5 4.5 22.5 8.5" />
            <path d="M5 12c2.5-2.5 12-2.5 14 0" />
            <path d="M8.5 15.5c1.5-1.5 6.5-1.5 7 0" />
            <circle cx="12" cy="19" r="1" fill="#6B7280" />
          </svg>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="#6B7280" />
            <rect x="2" y="2" width="13" height="8" rx="1" fill="#6B7280" />
            <path d="M20 4v4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div style={styles.header}>
        <div style={styles.searchBar}>
          <IconSearch />
          <input
            style={styles.searchInput}
            placeholder="Buscar entrenamientos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button style={styles.iconBtn}><IconMic /></button>
        <button style={styles.iconBtn}><IconFilter /></button>
      </div>

      {/* Filters */}
      <div style={styles.filtersRow}>
        {filters.map((f, i) => (
          <FilterPill
            key={i}
            filter={f}
            active={activeFilter === i}
            onClick={() => setActiveFilter(i)}
          />
        ))}
      </div>

      {/* Workout List */}
      <div style={styles.list}>
        {filteredWorkouts.map((w) => (
          <WorkoutCard
            key={w.id}
            workout={w}
            isFav={favs.has(w.id)}
            onToggleFav={toggleFav}
          />
        ))}
      </div>

      {/* Bottom Nav */}
      <BottomNav active={activeNav} onChange={setActiveNav} />
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  phone: {
    background: "#ffffff",
    maxWidth: 390,
    margin: "0 auto",
    borderRadius: 36,
    border: "0.5px solid #E5E7EB",
    overflow: "hidden",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    minHeight: 850,
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px 6px",
  },
  statusTime: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
  },
  statusIcons: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  header: {
    display: "flex",
    gap: 8,
    padding: "6px 14px 10px",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#F9FAFB",
    borderRadius: 12,
    padding: "9px 12px",
    border: "0.5px solid #E5E7EB",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    fontSize: 14,
    color: "#111827",
    outline: "none",
    flex: 1,
    minWidth: 0,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: "#CC2929",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "none",
    cursor: "pointer",
  },
  filtersRow: {
    display: "flex",
    gap: 8,
    padding: "0 14px 12px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  pill: {
    padding: "7px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: "nowrap",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  pillCount: {
    borderRadius: 10,
    padding: "1px 6px",
    fontSize: 11,
  },
  list: {
    flex: 1,
    padding: "0 14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    background: "#ffffff",
    border: "0.5px solid #E5E7EB",
  },
  imgBox: {
    position: "relative",
    height: 178,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    color: "#fff",
  },
  favBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    background: "rgba(255,255,255,0.88)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
  },
  cardBody: {
    padding: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  },
  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 10,
    lineHeight: 1.4,
  },
  meta: {
    display: "flex",
    gap: 12,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    padding: "4px 10px",
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 500,
  },
  bottomNav: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 10px 16px",
    borderTop: "0.5px solid #E5E7EB",
    background: "#ffffff",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    cursor: "pointer",
    minWidth: 48,
  },
  navLabel: {
    fontSize: 10,
  },
  navDot: {
    width: 4,
    height: 4,
    background: "#CC2929",
    borderRadius: "50%",
  },
};