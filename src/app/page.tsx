"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Wallet,
  Users,
  LifeBuoy,
  BarChart3,
  BookOpen,
  FolderKanban,
  ArrowUpRight,
  LayoutGrid,
  Car,
  AlarmClock,
  Globe,
  Bus,
  Clock,
  ShoppingCart,
  FileText,
  Building2,
  Mail,
  Server,
  FilePlus,
  Box,
  ScanBarcode,
  type LucideIcon,
} from "lucide-react";
import systemsData from "@/data/systems.json";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  Wallet,
  Users,
  LifeBuoy,
  BarChart3,
  BookOpen,
  FolderKanban,
  Car,
  AlarmClock,
  Globe,
  Bus,
  Clock,
  ShoppingCart,
  FileText,
  Building2,
  Mail,
  Server,
  FilePlus,
  Box,
  ScanBarcode,
};

type System = {
  name: string;
  description: string;
  url: string;
  icon: string;
  category?: string;
  department?: string;
};

// Departamentos disponíveis
const DEPARTMENTS = [
  "Todos",
  "Administrativo",
  "Financeiro",
  "Recursos Humanos",
  "Comunicação",
  "TI"
];

// Cores por departamento
const departmentColors: Record<string, string> = {
  "Administrativo": "#2563eb",
  "Financeiro": "#16a34a",
  "Recursos Humanos": "#7c3aed",
  "Comunicação": "#f59e0b",
  "TI": "#dc2626",
};

// Emojis por departamento
const departmentEmojis: Record<string, string> = {
  "Administrativo": "📋",
  "Financeiro": "💰",
  "Recursos Humanos": "👥",
  "Comunicação": "📢",
  "TI": "💻",
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("Todos");
  const systems = systemsData as System[];

  const filtered = useMemo(() => {
    let result = systems;

    // Filtrar por departamento
    if (activeDepartment !== "Todos") {
      result = result.filter(
        (s) => s.department === activeDepartment
      );
    }

    // Filtrar por busca
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.category ?? "").toLowerCase().includes(q) ||
          (s.department ?? "").toLowerCase().includes(q)
      );
    }

    return result;
  }, [query, activeDepartment, systems]);

  // Contar sistemas por departamento
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    systems.forEach(s => {
      const dept = s.department || "Outros";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return counts;
  }, [systems]);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
        <header className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-50 h-50 mb-4">
            <Image
              src="/logo-cdc.png"
              alt="CDC"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-8 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: "var(--brand-orange)" }}
            />
            <p className="font-bold">Centro de Desenvolvimento e Cidadania</p>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Portal de Sistemas
          </h1>
          <p className="mt-3 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            Acesso rápido às plataformas e ferramentas da organização.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <label htmlFor="search" className="sr-only">
              Pesquisar sistemas
            </label>
            <div className="group relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-[var(--brand-red)]"
                aria-hidden
              />
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por sistema, categoria ou palavra-chave..."
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm text-foreground shadow-[var(--shadow-soft)] outline-none transition-all placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-[var(--brand-orange)]/40"
              />
            </div>
          </div>
        </header>

        {/* Abas de Departamentos */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDepartment === dept;
            const count = dept === "Todos" ? systems.length : (departmentCounts[dept] || 0);
            const emoji = dept === "Todos" ? "📌" : (departmentEmojis[dept] || "");

            return (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  flex items-center gap-1.5
                  ${isActive
                    ? 'text-white shadow-md scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                style={{
                  background: isActive
                    ? departmentColors[dept] || "var(--gradient-brand)"
                    : 'transparent',
                }}
              >
                <span>{emoji}</span>
                <span>{dept}</span>
                {count > 0 && (
                  <span className={`
                    ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <LayoutGrid className="h-4 w-4" />
              <span>
                {filtered.length}{" "}
                {filtered.length === 1 ? "sistema" : "sistemas"}
                {activeDepartment !== "Todos" && ` em ${activeDepartment}`}
              </span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
              <p className="font-display text-lg font-semibold text-foreground">
                Nenhum sistema encontrado
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente outro termo de busca ou departamento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((system, i) => (
                <SystemCard key={system.name} system={system} index={i} />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-20 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Centro de Desenvolvimento e Cidadania ·
          Portal interno
        </footer>
      </div>
    </div>
  );
}

function SystemCard({ system, index }: { system: System; index: number }) {
  const Icon = iconMap[system.icon] ?? LayoutGrid;

  // Cor do departamento para o ícone
  const getDepartmentColor = (department?: string) => {
    return departmentColors[department || ""] || "var(--gradient-brand)";
  };

  return (
    <a
      href={system.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${index * 60}ms` }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 [animation:fade-in_0.5s_ease-out_both] hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-card-hover)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="flex items-start justify-between">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:scale-105"
          style={{ background: getDepartmentColor(system.department) }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--brand-red)] group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h2 className="break-words font-display text-base font-bold tracking-tight text-foreground flex-1">
            {system.name}
          </h2>
          {system.department && (
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white whitespace-nowrap"
              style={{ background: getDepartmentColor(system.department) }}
            >
              {system.department}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {system.description}
        </p>
        {system.category && (
          <span className="mt-2 inline-block text-xs text-muted-foreground/70">
            {system.category}
          </span>
        )}
      </div>
    </a>
  );
}