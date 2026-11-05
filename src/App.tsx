/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Check,
  Copy,
  Image as ImageIcon,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Briefcase,
  Building2,
} from 'lucide-react';
import {
  CATEGORIES,
  CONTACT_LINKS,
  HERO_PORTRAIT_IMAGE,
  PROJECTS_DATA,
  EXPERIENCES_DATA,
  SERVICES_DATA,
  type ProjectCategory,
  type ProjectItem,
} from './data/portfolioConfig';

type ActivePage = 'home' | 'projects';

// Curva exponencial suave para animações de interface
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.04,
    },
  },
};

const fadeSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE_OUT_EXPO,
    },
  },
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory['id']>('Todos');
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Estados de substituição de imagem com validação, loading e feedback visual
  const [customImageInput, setCustomImageInput] = useState('');
  const [showImageReplacer, setShowImageReplacer] = useState(false);
  const [imageInputError, setImageInputError] = useState<string | null>(null);
  const [imageApplySuccess, setImageApplySuccess] = useState<string | null>(null);
  const [isApplyingImage, setIsApplyingImage] = useState(false);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Sincroniza hash de URL com a navegação
  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === '#/projetos') {
        setActivePage('projects');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  // Fecha modal com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setShowImageReplacer(false);
        setImageInputError(null);
        setImageApplySuccess(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Trava scroll do body quando modal está aberto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const navigateToProjectsPage = (category?: ProjectCategory['id']) => {
    if (category) {
      setActiveCategory(category);
    }
    setActivePage('projects');
    setMobileMenuOpen(false);
    window.history.pushState(null, '', '#/projetos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHomeSection = (sectionId?: string) => {
    setActivePage('home');
    setMobileMenuOpen(false);
    window.history.pushState(null, '', sectionId ? `#${sectionId}` : '#');
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const homeFeaturedProjects = projects.filter((p) => p.featuredOnHome !== false);
  const filteredHomeProjects =
    activeCategory === 'Todos'
      ? homeFeaturedProjects
      : homeFeaturedProjects.filter((project) => project.category === activeCategory);

  const filteredCatalogProjects =
    activeCategory === 'Todos'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const getCategoryCount = (catId: ProjectCategory['id'], list: ProjectItem[]) => {
    if (catId === 'Todos') return list.length;
    return list.filter((p) => p.category === catId).length;
  };

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setCustomImageInput('');
    setImageInputError(null);
    setImageApplySuccess(null);
    setShowImageReplacer(false);
  };

  const handleNavigateAdjacentProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[nextIndex]);
    setShowImageReplacer(false);
    setImageInputError(null);
    setImageApplySuccess(null);
    setCustomImageInput('');
  };

  const handleApplyCustomImage = (e: React.FormEvent) => {
    e.preventDefault();
    setImageInputError(null);
    setImageApplySuccess(null);

    if (!selectedProject) return;
    const trimmed = customImageInput.trim();

    if (!trimmed) {
      setImageInputError('Informe uma URL válida (iniciando com https:// ou caminho local /).');
      return;
    }

    const isValidUrlOrPath =
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('data:image/');

    if (!isValidUrlOrPath) {
      setImageInputError('Formato inválido. Use uma URL completa (https://...) ou caminho local (/...).');
      return;
    }

    setIsApplyingImage(true);
    setTimeout(() => {
      const updatedProjects = projects.map((proj) => {
        if (proj.id === selectedProject.id) {
          return {
            ...proj,
            coverImage: trimmed,
            galleryImages: [
              { url: trimmed, caption: `${proj.title} — Imagem personalizada` },
              ...proj.galleryImages.slice(1),
            ],
          };
        }
        return proj;
      });

      setProjects(updatedProjects);
      const updatedCurrent = updatedProjects.find((p) => p.id === selectedProject.id) || null;
      setSelectedProject(updatedCurrent);
      setFailedImages((prev) => ({ ...prev, [trimmed]: false }));
      setIsApplyingImage(false);
      setImageApplySuccess('Imagem atualizada com sucesso na pré-visualização.');
      setCustomImageInput('');
    }, 280);
  };

  const handleResetDemoProjects = () => {
    setProjects(PROJECTS_DATA);
    if (selectedProject) {
      const original = PROJECTS_DATA.find((p) => p.id === selectedProject.id) || null;
      setSelectedProject(original);
    }
    setFailedImages({});
    setImageInputError(null);
    setImageApplySuccess('Imagens demonstrativas originais restauradas.');
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_LINKS.email.value);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const markImageError = (url: string) => {
    setFailedImages((prev) => ({ ...prev, [url]: true }));
  };

  const markImageLoaded = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  const renderProjectCard = (project: ProjectItem, idx: number) => {
    const hasFailed = failedImages[project.coverImage];
    const isLoaded = loadedImages[project.coverImage] || project.coverImage.startsWith('data:image/');

    return (
      <motion.article
        key={project.id}
        layout
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.6,
          delay: (idx % 2) * 0.08,
          ease: EASE_OUT_EXPO,
        }}
        className="group cursor-pointer flex flex-col focus-within:outline-none"
        onClick={() => handleOpenProject(project)}
      >
        {/* Cover Image (proporção ampla estilo mydesux.framer.website) */}
        <div className="relative aspect-[3/2] w-full rounded-[1.35rem] overflow-hidden bg-[#F1F0EC] mb-4 border border-[#0F0F10]/[0.06] transition-all duration-300 group-hover:shadow-layered group-hover:-translate-y-1">
          {!isLoaded && !hasFailed && (
            <div className="absolute inset-0 bg-[#F1F0EC] animate-pulse flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-[#525257] animate-spin" />
            </div>
          )}

          {!hasFailed ? (
            <img
              src={project.coverImage}
              alt={`${project.title} — ${project.category}`}
              referrerPolicy="no-referrer"
              onLoad={() => markImageLoaded(project.coverImage)}
              onError={() => markImageError(project.coverImage)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-[#F1F0EC]">
              <ImageIcon className="w-8 h-8 text-[#5B3DF5] mb-3" />
              <span className="text-base font-bold text-[#0F0F10]">{project.title}</span>
              <span className="text-xs font-medium text-[#525257] mt-1">
                {project.category}
              </span>
            </div>
          )}

          {/* Indicador sutil de abertura no hover */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FAFAF8]/95 backdrop-blur-md text-[#0F0F10] border border-[#0F0F10]/[0.08] flex items-center justify-center opacity-100 sm:opacity-0 sm:translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-[#0F0F10] group-hover:text-white transition-all duration-200 shadow-xs">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Meta Row fiel a mydesux.framer.website: Título na esquerda + Ano na direita */}
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h3 className="text-lg sm:text-xl font-bold text-[#0F0F10] group-hover:text-[#5B3DF5] transition-colors duration-150 leading-snug">
            {project.title}
          </h3>
          <span className="text-sm font-normal text-[#71717A] tabular-nums shrink-0">
            {project.year}
          </span>
        </div>

        {/* Subtítulo de Categoria · Escopo (estilo "Aplicativo · Saúde Mental") */}
        <p className="text-sm font-normal text-[#71717A]">
          {project.category}
          {project.deliverables?.[0] ? ` · ${project.deliverables[0]}` : ''}
        </p>

        {activePage === 'projects' && (
          <p className="text-sm font-normal text-[#525257] line-clamp-2 leading-relaxed mt-2">
            {project.summary}
          </p>
        )}
      </motion.article>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F0F10] flex flex-col selection:bg-[#5B3DF5] selection:text-white overflow-x-hidden">
      {/* 1. CABEÇALHO — Minimalista fiel a mydesux.framer.website (Alex- na esquerda, 4 links na direita) */}
      <header className="sticky top-0 z-40 bg-[#FAFAF8]/85 backdrop-blur-md border-b border-[#0F0F10]/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark com hífen ("Alex-") igual à referência */}
          <button
            type="button"
            onClick={() => navigateToHomeSection()}
            className="min-h-[44px] inline-flex items-center text-lg sm:text-xl font-bold tracking-tight text-[#0F0F10] whitespace-nowrap shrink-0 text-left cursor-pointer rounded-xl px-2 -ml-2 hover:text-[#5B3DF5] active:scale-[0.98] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B3DF5]"
          >
            Alex-
          </button>

          {/* Zone 2: 4 Links enxutos ("Trabalhos", "Sobre", "Experiência", "Contato") */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0F0F10]/75"
          >
            <button
              type="button"
              onClick={() => navigateToHomeSection('trabalhos')}
              className={`min-h-[44px] px-1 inline-flex items-center transition-colors duration-150 whitespace-nowrap shrink-0 hover:text-[#0F0F10] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5] ${
                activePage === 'projects' ? 'text-[#0F0F10] font-bold' : ''
              }`}
            >
              Trabalhos
            </button>
            <button
              type="button"
              onClick={() => navigateToHomeSection('sobre')}
              className="min-h-[44px] px-1 inline-flex items-center hover:text-[#0F0F10] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
            >
              Sobre
            </button>
            <button
              type="button"
              onClick={() => navigateToHomeSection('experiencia')}
              className="min-h-[44px] px-1 inline-flex items-center hover:text-[#0F0F10] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
            >
              Experiência
            </button>
            <button
              type="button"
              onClick={() => navigateToHomeSection('contato')}
              className="min-h-[44px] px-1 inline-flex items-center hover:text-[#0F0F10] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
            >
              Contato
            </button>
          </nav>

          {/* Zone 3: Botão mobile / Link rápido para arquivo de projetos no desktop */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => navigateToProjectsPage('Todos')}
              className="hidden md:inline-flex min-h-[40px] items-center justify-center gap-2 px-1 text-sm font-semibold text-[#0F0F10] border-b border-transparent hover:border-[#5B3DF5] hover:text-[#5B3DF5] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B3DF5]"
            >
              <span>Projetos</span>
              <span className="font-mono text-xs text-[#71717A]">{String(projects.length).padStart(2, '0')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-[#0F0F10] hover:bg-[#F1F0EC] active:scale-[0.96] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Funcional */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              className="md:hidden border-b border-[#0F0F10]/[0.08] bg-[#FAFAF8]/95 backdrop-blur-md px-5 sm:px-6 py-6 shadow-layered"
            >
              <nav aria-label="Menu mobile" className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => navigateToHomeSection('trabalhos')}
                  className="min-h-[44px] text-left text-base font-bold text-[#0F0F10] py-2 border-b border-[#0F0F10]/[0.06]"
                >
                  Trabalhos
                </button>
                <button
                  type="button"
                  onClick={() => navigateToProjectsPage('Todos')}
                  className={`min-h-[44px] text-left text-base font-bold py-2 border-b border-[#0F0F10]/[0.06] ${
                    activePage === 'projects' ? 'text-[#5B3DF5]' : 'text-[#0F0F10]'
                  }`}
                >
                  Arquivo completo ({projects.length})
                </button>
                <button
                  type="button"
                  onClick={() => navigateToHomeSection('sobre')}
                  className="min-h-[44px] text-left text-base font-bold text-[#0F0F10] py-2 border-b border-[#0F0F10]/[0.06]"
                >
                  Sobre
                </button>
                <button
                  type="button"
                  onClick={() => navigateToHomeSection('experiencia')}
                  className="min-h-[44px] text-left text-base font-bold text-[#0F0F10] py-2 border-b border-[#0F0F10]/[0.06]"
                >
                  Experiência
                </button>
                <button
                  type="button"
                  onClick={() => navigateToHomeSection('contato')}
                  className="min-h-[44px] text-left text-base font-bold text-[#0F0F10] py-2"
                >
                  Contato
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      {activePage === 'projects' ? (
        <main className="flex-1">
          {/* CABEÇALHO EDITORIAL DA PÁGINA DE PROJETOS */}
          <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-20 md:pb-16 border-b border-[#0F0F10]/[0.08]">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              <button
                type="button"
                onClick={() => navigateToHomeSection()}
                className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#525257] hover:text-[#0F0F10] active:scale-[0.98] transition-all mb-6 cursor-pointer rounded-xl pr-3 focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para o início</span>
              </button>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
              >
                <div>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.035em] leading-none text-[#0F0F10]">
                    Todos os <span className="text-[#0F0F10]/25 font-normal">projetos</span>
                  </h1>
                </div>
                <p className="text-sm sm:text-base font-normal text-[#71717A] max-w-sm leading-relaxed">
                  Seleção completa de trabalhos em Identidade Visual, Campanhas, Redes Sociais e Web Design.
                </p>
              </motion.div>

              {/* Barra de filtro responsiva */}
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div
                  role="tablist"
                  aria-label="Filtrar arquivo de projetos por categoria"
                  className="flex items-center gap-1.5 p-1.5 bg-[#F1F0EC] rounded-2xl overflow-x-auto no-scrollbar max-w-full"
                >
                  {CATEGORIES.map((category) => {
                    const isActive = activeCategory === category.id;
                    const count = getCategoryCount(category.id, projects);
                    return (
                      <button
                        key={category.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(category.id)}
                        className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#5B3DF5] ${
                          isActive
                            ? 'bg-[#FAFAF8] text-[#0F0F10] font-bold shadow-xs'
                            : 'text-[#525257] font-medium hover:text-[#0F0F10]'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className="ml-1.5 text-xs text-[#71717A] tabular-nums">
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs sm:text-sm font-normal text-[#71717A] tabular-nums">
                  Exibindo {filteredCatalogProjects.length} de {projects.length} projetos
                </span>
              </div>
            </div>
          </section>

          {/* GRID COMPLETO DE PROJETOS */}
          <section className="py-16 md:py-24 border-b border-[#0F0F10]/[0.08]">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-16">
                {filteredCatalogProjects.map((project, idx) => renderProjectCard(project, idx))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="flex-1">
          {/* 2. HERO — Mantém a primeira Hero criada inicialmente com o posicionamento de Portfólio (Opção C) */}
          <section className="hero-grid relative pt-10 sm:pt-14 md:pt-18 pb-0 lg:pb-0 border-b border-[#0F0F10]/[0.08] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-end">
                {/* Coluna Esquerda: Kicker, Título Principal, Bio e Ações */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                  className="lg:col-span-6 flex flex-col justify-center pb-10 sm:pb-14 lg:pb-20 pt-4 sm:pt-6"
                >
                  {/* Kicker voltado para Portfólio */}
                  <div className="flex items-center gap-3 mb-5 sm:mb-6">
                    <span className="status-dot" aria-hidden="true" />
                    <p className="text-xs sm:text-sm font-semibold text-[#525257] tracking-wider uppercase">
                      Portfólio · Designer Gráfico &amp; Visual Designer
                    </p>
                  </div>

                  {/* Headline de Alto Impacto — Opção C */}
                  <h1 className="text-[2.35rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.05rem] xl:text-[4.35rem] font-bold text-[#0F0F10] tracking-[-0.045em] leading-[1.03] mb-6 max-w-[34rem]">
                    Marcas com presença.<br />
                    Design com propósito.
                  </h1>

                  {/* Bio Profissional focada em Perfil e Contratação */}
                  <p className="text-base sm:text-lg font-medium text-[#525257] leading-relaxed max-w-lg mb-8">
                    Sou Alex, designer gráfico com foco em construção de marcas, sistemas visuais e presença digital. Disponível para posições fixas em empresas e projetos de alto impacto.
                  </p>

                  {/* Botões de Ação com Área de Toque Mínima de 48px */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigateToProjectsPage('Todos')}
                      className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold text-white bg-[#5B3DF5] hover:bg-[#492CE0] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B3DF5]"
                    >
                      <span>Explorar projetos</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <a
                      href="#contato"
                      className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-bold text-[#0F0F10] bg-[#F1F0EC] hover:bg-[#E5E3DC] active:scale-[0.98] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F0F10]"
                    >
                      Entrar em contato
                    </a>
                  </div>
                </motion.div>

                {/* Coluna Direita: Fotografia Recortada de Alex diretamente sobre o fundo claro */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
                  className="lg:col-span-6 flex items-end justify-center lg:justify-end -mb-1 select-none"
                >
                  <div className="portrait-frame relative w-full max-w-[360px] sm:max-w-[500px] lg:max-w-[560px] flex items-end justify-center lg:justify-end">
                    <div className="portrait-index hidden sm:flex" aria-hidden="true">
                      <span>01</span><span>26</span>
                    </div>
                    <img
                      src={HERO_PORTRAIT_IMAGE}
                      alt="Alex — Designer Gráfico"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[440px] sm:max-h-[600px] lg:max-h-[680px] object-contain object-bottom select-none"
                    />
                    <div className="availability-card hidden sm:block">
                      <span className="availability-label">Disponível para</span>
                      <span>projetos selecionados</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 3. PROJETOS SELECIONADOS — Fiel a mydesux.framer.website ("Projetos selecionados" + Aside lateral + Grid 2 colunas) */}
          <section
            id="trabalhos"
            className="py-20 sm:py-24 md:py-32 border-b border-[#0F0F10]/[0.08]"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              {/* Cabeçalho idêntico à referência: Título grande bicromático à esquerda + Texto explicativo à direita */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
              >
                <h2 className="text-4xl sm:text-6xl md:text-[4.25rem] font-bold tracking-[-0.035em] leading-[0.98] text-[#0F0F10]">
                  Projetos <br className="hidden sm:block" />
                  <span className="text-[#0F0F10]/25 font-normal">selecionados</span>
                </h2>

                <div className="md:max-w-xs lg:max-w-sm">
                  <p className="text-sm sm:text-base font-normal text-[#71717A] leading-relaxed">
                    Projetos selecionados em identidade visual, campanhas e interfaces digitais, desde os conceitos iniciais até a entrega final.
                  </p>
                </div>
              </motion.div>

              {/* Filtro enxuto opcional */}
              <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
                <div
                  role="tablist"
                  aria-label="Filtrar projetos por categoria"
                  className="flex items-center gap-1.5 p-1.5 bg-[#F1F0EC] rounded-2xl overflow-x-auto no-scrollbar max-w-full"
                >
                  {CATEGORIES.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(category.id)}
                        className={`min-h-[40px] px-4 py-1.5 text-xs sm:text-sm rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#5B3DF5] ${
                          isActive
                            ? 'bg-[#FAFAF8] text-[#0F0F10] font-bold shadow-xs'
                            : 'text-[#525257] font-medium hover:text-[#0F0F10]'
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => navigateToProjectsPage('Todos')}
                  className="min-h-[40px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F0F10] hover:text-[#5B3DF5] transition-colors cursor-pointer"
                >
                  <span>Ver arquivo completo ({projects.length})</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Projects Grid (2 colunas com gap-6 igual a mydesux.framer.website) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-16">
                {filteredHomeProjects.map((project, idx) => renderProjectCard(project, idx))}
              </div>
            </div>
          </section>

          {/* 4. (SOBRE MIM) — Estrutura fiel a mydesux.framer.website: Kicker + Frase de Impacto Bicromática + Texto de Apoio + Tags de Especialidades */}
          <section
            id="sobre"
            className="py-20 sm:py-28 md:py-36 border-b border-[#0F0F10]/[0.08] overflow-hidden"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-4xl"
              >
                {/* Kicker (SOBRE MIM) */}
                <motion.p
                  variants={fadeSlideUpVariants}
                  className="text-xs font-normal text-[#71717A] tracking-wider uppercase mb-6"
                >
                  (SOBRE MIM)
                </motion.p>

                {/* Frase de impacto bicromática idêntica ao estilo de mydesux.framer.website */}
                <motion.h2
                  variants={fadeSlideUpVariants}
                  className="text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.1] text-[#0F0F10] mb-8"
                >
                  Designer gráfico{' '}
                  <span className="text-[#0F0F10]/25 font-normal">
                    com foco em marcas.
                  </span>{' '}
                  Uno direção de arte, marketing e visão tecnológica.
                </motion.h2>

                {/* Parágrafo descritivo conciso */}
                <motion.p
                  variants={fadeSlideUpVariants}
                  className="text-base sm:text-lg font-normal text-[#525257] leading-[1.7] max-w-2xl mb-12"
                >
                  Atuo na interseção entre o design gráfico e o marketing, desenvolvendo identidades visuais, campanhas e interfaces que comunicam valor com clareza. Minha trajetória combina estudos em Publicidade e Propaganda com Engenharia de Software e IA — unindo repertório estético, pensamento estratégico e precisão digital.
                </motion.p>
              </motion.div>

              {/* Showcase de Especialidades inspirado no módulo interativo de tags de mydesux.framer.website */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
                className="pt-8 border-t border-[#0F0F10]/[0.08]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.number}
                      type="button"
                      onClick={() => navigateToProjectsPage(service.categoryFilter)}
                      className="group text-left p-6 rounded-2xl bg-[#F1F0EC]/70 hover:bg-[#0F0F10] hover:text-white border border-[#0F0F10]/[0.06] transition-all duration-200 flex flex-col justify-between min-h-[160px] cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-4">
                        <span className="text-xs font-mono text-[#71717A] group-hover:text-white/60 tabular-nums">
                          {service.number}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0F0F10] group-hover:text-white mb-1.5">
                          {service.title}
                        </h3>
                        <p className="text-xs font-normal text-[#71717A] group-hover:text-white/75 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* 5. (EXPERIÊN)CIA — Onde trabalhei (Idêntico a mydesux.framer.website) */}
          <section
            id="experiencia"
            className="py-20 sm:py-28 md:py-36 border-b border-[#0F0F10]/[0.08] overflow-hidden"
          >
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              {/* Título com kicker (EXPERIÊN)CIA e tipografia bicromática */}
              <motion.div
                variants={fadeSlideUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mb-12 sm:mb-16"
              >
                <p className="text-xs font-normal text-[#71717A] tracking-wider uppercase mb-3">
                  (EXPERIÊN)CIA
                </p>
                <h2 className="text-4xl sm:text-6xl md:text-[4.25rem] font-bold tracking-[-0.035em] leading-none text-[#0F0F10]">
                  Onde <span className="text-[#0F0F10]/25 font-normal">trabalhei</span>
                </h2>
              </motion.div>

              {/* Experience List: 3 colunas com linhas divisórias finas */}
              <div className="border-t border-[#0F0F10]/[0.09] divide-y divide-[#0F0F10]/[0.09]">
                {EXPERIENCES_DATA.map((exp, idx) => (
                  <motion.div
                    key={`${exp.period}-${exp.company}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="py-6 sm:py-7 md:py-8 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline transition-colors duration-150 hover:bg-[#F1F0EC]/35"
                  >
                    {/* Coluna 1: Período (2025 — Now) */}
                    <div className="sm:col-span-3">
                      <span className="text-sm sm:text-base font-normal text-[#71717A] tabular-nums whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Coluna 2: Cargo em negrito (Lead product designer) */}
                    <div className="sm:col-span-6">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0F0F10]">
                        {exp.role}
                      </h3>
                    </div>

                    {/* Coluna 3: Empresa alinhada à direita (BeSafe, Meetime...) */}
                    <div className="sm:col-span-3 sm:text-right">
                      <span className="text-sm sm:text-base font-normal text-[#0F0F10]">
                        {exp.company}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. (CONTATO) — Fiel a mydesux.framer.website: Kicker (CONTATO) + "Vamos conversar?" + E-mail em destaque + Botão "Agende uma conversa comigo" */}
          <section id="contato" className="py-24 sm:py-32 md:py-40">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                className="flex flex-col items-start"
              >
                <p className="text-xs font-normal text-[#71717A] tracking-wider uppercase mb-4">
                  (CONTATO)
                </p>

                <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[-0.04em] text-[#0F0F10] leading-[1.02] mb-6">
                  Vamos conversar?
                </h2>

                {/* E-mail grande clicável estilo mydesux.framer.website */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <a
                    href={CONTACT_LINKS.email.url}
                    className="text-xl sm:text-3xl md:text-4xl font-normal text-[#0F0F10]/70 hover:text-[#5B3DF5] underline decoration-[#0F0F10]/20 hover:decoration-[#5B3DF5] underline-offset-8 transition-colors break-all"
                  >
                    {CONTACT_LINKS.email.value}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#0F0F10] bg-[#F1F0EC] hover:bg-[#E5E3DC] active:scale-[0.98] rounded-full transition-all cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#5B3DF5]" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#525257]" />
                        <span>Copiar e-mail</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Botão Accent igual à referência ("Agende uma conversa comigo") */}
                <a
                  href={CONTACT_LINKS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-bold text-white bg-[#5B3DF5] hover:bg-[#492CE0] active:scale-[0.98] rounded-full transition-all duration-150 whitespace-nowrap shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B3DF5]"
                >
                  <span>Agende uma conversa comigo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </section>
        </main>
      )}

      {/* 7. RODAPÉ — Idêntico a mydesux.framer.website (© 2026 na esquerda + Links Sociais limpos na direita) */}
      <footer className="border-t border-[#0F0F10]/[0.08] py-8 sm:py-10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-normal text-[#71717A]">
          <p className="tabular-nums">© {new Date().getFullYear()} Alex — Design Gráfico</p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a
              href={CONTACT_LINKS.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F0F10] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={CONTACT_LINKS.email.url}
              className="hover:text-[#0F0F10] transition-colors"
            >
              E-mail
            </a>
            <a
              href={CONTACT_LINKS.behance.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F0F10] transition-colors"
            >
              Behance
            </a>
            <a
              href={CONTACT_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F0F10] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL DE DETALHES DO PROJETO (Lightbox Editorial Responsivo) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-[#0F0F10]/70 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-10 flex items-start justify-center"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#FAFAF8] rounded-2xl border border-[#0F0F10]/[0.08] shadow-modal overflow-hidden my-auto"
            >
              {/* Barra superior do Modal */}
              <div className="px-6 sm:px-8 py-4 border-b border-[#0F0F10]/[0.08] flex items-center justify-between gap-4 sticky top-0 bg-[#FAFAF8]/90 backdrop-blur-md z-10">
                <div className="text-xs sm:text-sm font-medium text-[#525257] truncate">
                  <span>{selectedProject.category}</span>
                  <span aria-hidden="true" className="mx-2">
                    ·
                  </span>
                  <span>Projeto demonstrativo</span>
                  <span aria-hidden="true" className="mx-2">
                    ·
                  </span>
                  <span className="tabular-nums">{selectedProject.year}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShowImageReplacer((prev) => !prev);
                      setImageInputError(null);
                      setImageApplySuccess(null);
                    }}
                    className="min-h-[44px] px-4 py-2 text-xs font-bold text-[#0F0F10] bg-[#F1F0EC] hover:bg-[#E5E3DC] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
                  >
                    Substituir imagem
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Fechar detalhes do projeto"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-[#F1F0EC] hover:bg-[#0F0F10] hover:text-white active:scale-[0.96] text-[#0F0F10] inline-flex items-center justify-center transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Painel para testar substituição rápida de imagem com Estados de Erro, Loading e Sucesso */}
              {showImageReplacer && (
                <div className="px-6 sm:px-8 py-4 bg-[#F1F0EC] border-b border-[#0F0F10]/[0.08]">
                  <form
                    onSubmit={handleApplyCustomImage}
                    noValidate
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                  >
                    <input
                      type="url"
                      value={customImageInput}
                      onChange={(e) => {
                        setCustomImageInput(e.target.value);
                        if (imageInputError) setImageInputError(null);
                      }}
                      placeholder="Cole a URL de uma imagem (https://...) para testar neste projeto"
                      aria-invalid={Boolean(imageInputError)}
                      className={`min-h-[44px] flex-1 px-4 py-2 text-sm font-medium bg-[#FAFAF8] border rounded-xl text-[#0F0F10] placeholder:text-[#525257] focus:outline-2 transition-colors ${
                        imageInputError
                          ? 'border-red-500 focus:outline-red-500'
                          : 'border-[#0F0F10]/[0.15] focus:outline-[#5B3DF5]'
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        disabled={isApplyingImage}
                        className="min-h-[44px] flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#5B3DF5] hover:bg-[#492CE0] active:scale-[0.98] disabled:opacity-60 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                      >
                        {isApplyingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Aplicando...</span>
                          </>
                        ) : (
                          <span>Aplicar imagem</span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleResetDemoProjects}
                        title="Restaurar imagem demonstrativa original"
                        className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0F0F10] bg-[#FAFAF8] hover:bg-white active:scale-[0.98] rounded-xl border border-[#0F0F10]/[0.1] transition-all whitespace-nowrap cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar</span>
                      </button>
                    </div>
                  </form>

                  {/* Feedback Visual de Erro (red-500) */}
                  {imageInputError && (
                    <div
                      role="alert"
                      className="mt-2.5 flex items-center gap-2 text-xs font-medium text-red-500"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{imageInputError}</span>
                    </div>
                  )}

                  {/* Feedback Visual de Sucesso */}
                  {imageApplySuccess && (
                    <div
                      role="status"
                      className="mt-2.5 flex items-center gap-2 text-xs font-medium text-emerald-700"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{imageApplySuccess}</span>
                    </div>
                  )}

                  <p className="text-xs font-medium text-[#525257] mt-2">
                    Dica: Para alterações permanentes no código, edite o arquivo{' '}
                    <code className="font-mono text-[#0F0F10]">src/data/portfolioConfig.ts</code>.
                  </p>
                </div>
              )}

              {/* Conteúdo do Projeto */}
              <div className="p-6 sm:p-8 md:p-10 space-y-8 sm:space-y-10">
                <div>
                  <h2
                    id="modal-project-title"
                    className="text-xl sm:text-3xl md:text-4xl font-bold text-[#0F0F10] mb-4"
                  >
                    {selectedProject.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-[#525257] leading-relaxed max-w-3xl">
                    {selectedProject.summary}
                  </p>
                </div>

                {/* Galeria de Imagens do Projeto */}
                <div className="space-y-6">
                  {selectedProject.galleryImages.map((img, index) => {
                    const failed = failedImages[img.url];
                    return (
                      <figure key={index} className="space-y-2">
                        <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F1F0EC] border border-[#0F0F10]/[0.06]">
                          {!failed ? (
                            <img
                              src={img.url}
                              alt={img.caption}
                              referrerPolicy="no-referrer"
                              onError={() => markImageError(img.url)}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                              <ImageIcon className="w-8 h-8 text-red-500 mb-2" />
                              <span className="text-sm font-bold text-[#0F0F10]">
                                Não foi possível carregar a imagem informada
                              </span>
                              <span className="text-xs font-medium text-[#525257] mt-1">
                                Verifique a URL ou clique em &ldquo;Restaurar&rdquo; acima.
                              </span>
                            </div>
                          )}
                        </div>
                        <figcaption className="text-xs sm:text-sm font-medium text-[#525257]">
                          {img.caption}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>

                {/* Detalhes técnicos: Conceito, Entregas e Paleta */}
                <div className="pt-8 border-t border-[#0F0F10]/[0.09] grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-7 space-y-4">
                    <h3 className="text-sm font-bold text-[#0F0F10]">Direção Visual &amp; Conceito</h3>
                    <p className="text-sm sm:text-base font-medium text-[#525257] leading-relaxed">
                      {selectedProject.concept}
                    </p>

                    {/* Paleta de cores do projeto */}
                    <div className="pt-2">
                      <span className="block text-xs font-medium text-[#525257] mb-2">
                        Paleta cromática
                      </span>
                      <div className="flex flex-wrap items-center gap-4">
                        {selectedProject.palette.map((color) => (
                          <div key={color.hex} className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full border border-[#0F0F10]/15 inline-block ${color.swatchClass}`}
                            />
                            <span className="text-xs font-mono text-[#525257]">{color.hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <h3 className="text-sm font-bold text-[#0F0F10]">Escopo Demonstrativo</h3>
                    <ul className="space-y-2 text-sm font-medium text-[#0F0F10]/85">
                      {selectedProject.deliverables.map((item) => (
                        <li
                          key={item}
                          className="py-2 border-b border-[#0F0F10]/[0.06] last:border-b-0"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Navegação entre projetos com ícones vetoriais Lucide + Chamada para contato */}
                <div className="pt-6 border-t border-[#0F0F10]/[0.09] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleNavigateAdjacentProject('prev')}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-[#0F0F10] bg-[#F1F0EC] hover:bg-[#E5E3DC] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigateAdjacentProject('next')}
                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-[#0F0F10] bg-[#F1F0EC] hover:bg-[#E5E3DC] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B3DF5]"
                    >
                      <span>Próximo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(null);
                      navigateToHomeSection('contato');
                    }}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#5B3DF5] hover:bg-[#492CE0] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B3DF5]"
                  >
                    <span>Solicitar proposta semelhante</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
