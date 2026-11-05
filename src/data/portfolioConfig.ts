/**
 * ============================================================================
 * CONFIGURAÇÃO DO PORTFÓLIO — FÁCIL SUBSTITUIÇÃO
 * ============================================================================
 * Edite os links de contato e os projetos abaixo para atualizar o portfólio.
 * As imagens podem ser caminhos locais (ex: "/meu-projeto.jpg") ou URLs.
 * - `featuredOnHome: true` define os projetos que aparecem na seção "Projetos selecionados" da Home.
 * - Todos os projetos aparecem na página dedicada de Projetos.
 */

export interface ProjectCategory {
  id: 'Todos' | 'Identidade Visual' | 'Campanhas' | 'Redes Sociais' | 'Web Design';
  label: string;
}

export interface PaletteColor {
  hex: string;
  swatchClass: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Identidade Visual' | 'Campanhas' | 'Redes Sociais' | 'Web Design';
  isDemo: boolean;
  featuredOnHome?: boolean;
  year: string;
  summary: string;
  concept: string;
  deliverables: string[];
  palette: PaletteColor[];
  coverImage: string;
  galleryImages: {
    url: string;
    caption: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  isDemo?: boolean;
}

export interface ServiceItem {
  number: string;
  title: string;
  categoryFilter: ProjectCategory['id'];
  description: string;
  deliverables: string[];
}

export const HERO_PORTRAIT_IMAGE =
  '/assets/aistudio/Homem_Confiante_de_Camisa_Azul_f9b85421.png';

export const CONTACT_LINKS = {
  whatsapp: {
    label: 'WhatsApp',
    value: 'Iniciar conversa',
    url: 'https://wa.me/5500000000000?text=Ol%C3%A1%20Alex%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.',
  },
  email: {
    label: 'E-mail',
    value: 'contato@alexdesign.com',
    url: 'mailto:contato@alexdesign.com',
  },
  instagram: {
    label: 'Instagram',
    value: '@alex.designgrafico',
    url: 'https://instagram.com/',
  },
  behance: {
    label: 'Behance',
    value: 'behance.net/alexdesign',
    url: 'https://behance.net/',
  },
};

export const CATEGORIES: ProjectCategory[] = [
  { id: 'Todos', label: 'Todos' },
  { id: 'Identidade Visual', label: 'Identidade Visual' },
  { id: 'Campanhas', label: 'Campanhas' },
  { id: 'Redes Sociais', label: 'Redes Sociais' },
  { id: 'Web Design', label: 'Web Design' },
];

/**
 * Gerador de pranchas visuais em SVG de alta definição para os projetos demonstrativos.
 * Para usar suas próprias fotos/renders, basta substituir `coverImage` e `galleryImages`
 * pela URL ou caminho da sua imagem (ex: "/projetos/identidade-01.jpg").
 */
const createEditorialSvgDataUri = (svgContent: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;

const DEMO_VISUAL_IDENTITY_COVER = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ECEAE4"/>
      <stop offset="100%" stop-color="#DFDDD4"/>
    </linearGradient>
    <filter id="shadow1" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0F0F10" flood-opacity="0.10"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="url(#bg1)"/>
  <line x1="120" y1="0" x2="120" y2="900" stroke="#0F0F10" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="1080" y1="0" x2="1080" y2="900" stroke="#0F0F10" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="0" y1="120" x2="1200" y2="120" stroke="#0F0F10" stroke-opacity="0.05" stroke-width="1"/>
  <line x1="0" y1="780" x2="1200" y2="780" stroke="#0F0F10" stroke-opacity="0.05" stroke-width="1"/>

  <g filter="url(#shadow1)" transform="translate(210, 170) rotate(-3)">
    <rect width="460" height="560" rx="6" fill="#0F0F10"/>
    <circle cx="96" cy="96" r="28" fill="none" stroke="#FAFAF8" stroke-width="2.5"/>
    <circle cx="116" cy="96" r="28" fill="none" stroke="#5B3DF5" stroke-width="2.5"/>
    <text x="64" y="390" fill="#FAFAF8" font-family="sans-serif" font-size="48" font-weight="700" letter-spacing="-1.5">KINETA</text>
    <text x="64" y="426" fill="#A0A0A8" font-family="sans-serif" font-size="15" font-weight="400" letter-spacing="2">SISTEMA DE IDENTIDADE</text>
    <line x1="64" y1="470" x2="396" y2="470" stroke="#FAFAF8" stroke-opacity="0.16" stroke-width="1"/>
    <text x="64" y="502" fill="#A0A0A8" font-family="monospace" font-size="13">PROJETO DEMONSTRATIVO · 01</text>
  </g>

  <g filter="url(#shadow1)" transform="translate(550, 230) rotate(2)">
    <rect width="440" height="510" rx="6" fill="#FAFAF8"/>
    <rect x="48" y="48" width="84" height="28" rx="4" fill="#5B3DF5"/>
    <text x="90" y="67" fill="#FAFAF8" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle">AA / 01</text>
    <text x="48" y="160" fill="#0F0F10" font-family="sans-serif" font-size="68" font-weight="700" letter-spacing="-2.5">Aa</text>
    <text x="48" y="218" fill="#0F0F10" font-family="sans-serif" font-size="22" font-weight="600">Tipografia &amp; Proporção</text>
    <text x="48" y="252" fill="#525257" font-family="sans-serif" font-size="15">Construção modular com foco em</text>
    <text x="48" y="274" fill="#525257" font-family="sans-serif" font-size="15">clareza, contraste e presença tátil.</text>
    <rect x="48" y="340" width="104" height="104" fill="#0F0F10"/>
    <rect x="168" y="340" width="104" height="104" fill="#5B3DF5"/>
    <rect x="288" y="340" width="104" height="104" fill="#F1F0EC" stroke="#0F0F10" stroke-opacity="0.12"/>
  </g>
</svg>
`);

const DEMO_VISUAL_IDENTITY_DETAIL = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <rect width="1200" height="900" fill="#F1F0EC"/>
  <rect x="90" y="90" width="1020" height="720" rx="8" fill="#FAFAF8" stroke="#0F0F10" stroke-opacity="0.08"/>
  <line x1="90" y1="240" x2="1110" y2="240" stroke="#0F0F10" stroke-opacity="0.08"/>
  <line x1="600" y1="240" x2="600" y2="810" stroke="#0F0F10" stroke-opacity="0.08"/>
  <text x="140" y="175" fill="#0F0F10" font-family="sans-serif" font-size="28" font-weight="700">Manual da Marca — Grid Construtivo &amp; Paleta</text>
  <circle cx="345" cy="525" r="140" fill="none" stroke="#0F0F10" stroke-width="2"/>
  <circle cx="415" cy="525" r="140" fill="none" stroke="#5B3DF5" stroke-width="2"/>
  <line x1="160" y1="525" x2="560" y2="525" stroke="#0F0F10" stroke-dasharray="4 4" stroke-opacity="0.35"/>
  <rect x="670" y="310" width="370" height="120" rx="4" fill="#0F0F10"/>
  <text x="700" y="380" fill="#FAFAF8" font-family="monospace" font-size="18">#0F0F10 · Preto Editorial</text>
  <rect x="670" y="460" width="370" height="120" rx="4" fill="#5B3DF5"/>
  <text x="700" y="530" fill="#FAFAF8" font-family="monospace" font-size="18">#5B3DF5 · Roxo Destaque</text>
  <rect x="670" y="610" width="370" height="120" rx="4" fill="#F1F0EC" stroke="#0F0F10" stroke-opacity="0.15"/>
  <text x="700" y="680" fill="#0F0F10" font-family="monospace" font-size="18">#F1F0EC · Superfície Suave</text>
</svg>
`);

const DEMO_CAMPAIGN_COVER = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <filter id="shadow2" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#0F0F10" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="#E6E4DD"/>
  <g filter="url(#shadow2)" transform="translate(130, 140)">
    <rect width="290" height="620" rx="4" fill="#FAFAF8"/>
    <text x="28" y="80" fill="#0F0F10" font-family="sans-serif" font-size="42" font-weight="700" letter-spacing="-1.5">FORMA</text>
    <text x="28" y="124" fill="#5B3DF5" font-family="sans-serif" font-size="42" font-weight="700" letter-spacing="-1.5">RITMO</text>
    <circle cx="145" cy="360" r="95" fill="#0F0F10"/>
    <circle cx="180" cy="360" r="45" fill="#5B3DF5"/>
    <text x="28" y="575" fill="#525257" font-family="monospace" font-size="12">CAMPANHA · CARTAZ 01</text>
  </g>

  <g filter="url(#shadow2)" transform="translate(455, 140)">
    <rect width="290" height="620" rx="4" fill="#5B3DF5"/>
    <text x="28" y="80" fill="#FAFAF8" font-family="sans-serif" font-size="42" font-weight="700" letter-spacing="-1.5">MOVIMENTO</text>
    <text x="28" y="124" fill="#FAFAF8" fill-opacity="0.7" font-family="sans-serif" font-size="42" font-weight="700" letter-spacing="-1.5">URBANO</text>
    <path d="M 40 440 L 250 260 L 250 440 Z" fill="#FAFAF8"/>
    <text x="28" y="575" fill="#FAFAF8" fill-opacity="0.85" font-family="monospace" font-size="12">CAMPANHA · CARTAZ 02</text>
  </g>

  <g filter="url(#shadow2)" transform="translate(780, 140)">
    <rect width="290" height="620" rx="4" fill="#0F0F10"/>
    <text x="28" y="80" fill="#FAFAF8" font-family="sans-serif" font-size="42" font-weight="700" letter-spacing="-1.5">VOZ</text>
    <text x="28" y="124" fill="#FAFAF8" font-family="sans-serif" font-size="42" font-weight="700" letter-spacing="-1.5">VISUAL</text>
    <rect x="28" y="250" width="234" height="234" fill="none" stroke="#FAFAF8" stroke-width="2"/>
    <line x1="28" y1="250" x2="262" y2="484" stroke="#5B3DF5" stroke-width="3"/>
    <text x="28" y="575" fill="#A0A0A8" font-family="monospace" font-size="12">CAMPANHA · CARTAZ 03</text>
  </g>
</svg>
`);

const DEMO_CAMPAIGN_DETAIL = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <rect width="1200" height="900" fill="#0F0F10"/>
  <rect x="100" y="110" width="1000" height="680" rx="6" fill="#FAFAF8"/>
  <rect x="100" y="110" width="480" height="680" fill="#5B3DF5"/>
  <text x="150" y="240" fill="#FAFAF8" font-family="sans-serif" font-size="56" font-weight="700" letter-spacing="-2">DIREÇÃO</text>
  <text x="150" y="302" fill="#FAFAF8" font-family="sans-serif" font-size="56" font-weight="700" letter-spacing="-2">DE ARTE</text>
  <text x="150" y="720" fill="#FAFAF8" font-family="monospace" font-size="14">DESDOBRAMENTO IMPRESSO &amp; OOH</text>
  <text x="640" y="240" fill="#0F0F10" font-family="sans-serif" font-size="32" font-weight="700">Sistema de Peças Publicitárias</text>
  <text x="640" y="295" fill="#525257" font-family="sans-serif" font-size="18">Hierarquia tipográfica de alto impacto para</text>
  <text x="640" y="325" fill="#525257" font-family="sans-serif" font-size="18">mídia exterior, encartes e mídia digital.</text>
  <line x1="640" y1="380" x2="1020" y2="380" stroke="#0F0F10" stroke-opacity="0.12"/>
  <rect x="640" y="420" width="380" height="290" fill="#F1F0EC"/>
  <text x="675" y="575" fill="#0F0F10" font-family="sans-serif" font-size="24" font-weight="700">Key Visual Horizontal 16:9</text>
</svg>
`);

const DEMO_SOCIAL_COVER = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <filter id="shadow3" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0F0F10" flood-opacity="0.09"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="#ECEAE3"/>
  <g filter="url(#shadow3)" transform="translate(150, 110)">
    <rect width="420" height="320" rx="8" fill="#FAFAF8"/>
    <text x="36" y="64" fill="#5B3DF5" font-family="monospace" font-size="13" font-weight="700">01 / CARROSSEL EDITORIAL</text>
    <text x="36" y="145" fill="#0F0F10" font-family="sans-serif" font-size="36" font-weight="700" letter-spacing="-1">Narrativa visual</text>
    <text x="36" y="188" fill="#0F0F10" font-family="sans-serif" font-size="36" font-weight="700" letter-spacing="-1">para marcas.</text>
    <line x1="36" y1="255" x2="384" y2="255" stroke="#0F0F10" stroke-opacity="0.1"/>
    <text x="36" y="286" fill="#525257" font-family="sans-serif" font-size="14">Deslize para explorar →</text>
  </g>

  <g filter="url(#shadow3)" transform="translate(630, 110)">
    <rect width="420" height="320" rx="8" fill="#0F0F10"/>
    <circle cx="330" cy="160" r="88" fill="#5B3DF5"/>
    <text x="36" y="150" fill="#FAFAF8" font-family="sans-serif" font-size="34" font-weight="700">Direção de</text>
    <text x="36" y="192" fill="#FAFAF8" font-family="sans-serif" font-size="34" font-weight="700">Conteúdo</text>
    <text x="36" y="286" fill="#A0A0A8" font-family="monospace" font-size="13">FEED &amp; STORIES SYSTEM</text>
  </g>

  <g filter="url(#shadow3)" transform="translate(150, 470)">
    <rect width="420" height="320" rx="8" fill="#5B3DF5"/>
    <text x="36" y="110" fill="#FAFAF8" font-family="sans-serif" font-size="64" font-weight="700" letter-spacing="-2">4:5</text>
    <text x="36" y="165" fill="#FAFAF8" font-family="sans-serif" font-size="22" font-weight="500">Templates Modulares</text>
    <text x="36" y="200" fill="#FAFAF8" fill-opacity="0.8" font-family="sans-serif" font-size="15">Consistência tipográfica e</text>
    <text x="36" y="224" fill="#FAFAF8" fill-opacity="0.8" font-family="sans-serif" font-size="15">reconhecimento imediato no feed.</text>
  </g>

  <g filter="url(#shadow3)" transform="translate(630, 470)">
    <rect width="420" height="320" rx="8" fill="#FAFAF8"/>
    <rect x="36" y="36" width="348" height="180" rx="4" fill="#F1F0EC"/>
    <line x1="36" y1="36" x2="384" y2="216" stroke="#0F0F10" stroke-opacity="0.15"/>
    <text x="36" y="264" fill="#0F0F10" font-family="sans-serif" font-size="20" font-weight="700">Guia de Estilo para Social</text>
    <text x="36" y="292" fill="#525257" font-family="monospace" font-size="12">PROJETO DEMONSTRATIVO</text>
  </g>
</svg>
`);

const DEMO_WEB_DESIGN_COVER = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <filter id="shadow4" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="26" stdDeviation="30" flood-color="#0F0F10" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="#E5E3DC"/>
  <g filter="url(#shadow4)" transform="translate(110, 105)">
    <rect width="980" height="690" rx="10" fill="#FAFAF8" stroke="#0F0F10" stroke-opacity="0.08"/>
    <line x1="0" y1="54" x2="980" y2="54" stroke="#0F0F10" stroke-opacity="0.08"/>
    <circle cx="28" cy="27" r="5" fill="#0F0F10" fill-opacity="0.25"/>
    <circle cx="46" cy="27" r="5" fill="#0F0F10" fill-opacity="0.25"/>
    <circle cx="64" cy="27" r="5" fill="#0F0F10" fill-opacity="0.25"/>
    <text x="490" y="32" fill="#525257" font-family="monospace" font-size="12" text-anchor="middle">atelier-editorial.demo</text>

    <text x="64" y="112" fill="#0F0F10" font-family="sans-serif" font-size="16" font-weight="700">ATELIER</text>
    <text x="740" y="112" fill="#525257" font-family="sans-serif" font-size="13">Coleção   Sobre   Contato</text>
    <line x1="64" y1="136" x2="916" y2="136" stroke="#0F0F10" stroke-opacity="0.08"/>

    <text x="64" y="245" fill="#0F0F10" font-family="sans-serif" font-size="58" font-weight="700" letter-spacing="-2">Arquitetura digital</text>
    <text x="64" y="310" fill="#0F0F10" font-family="sans-serif" font-size="58" font-weight="700" letter-spacing="-2">minimalista.</text>

    <rect x="64" y="360" width="160" height="46" rx="6" fill="#5B3DF5"/>
    <text x="144" y="388" fill="#FAFAF8" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle">Explorar projeto</text>

    <rect x="64" y="450" width="520" height="190" rx="6" fill="#0F0F10"/>
    <text x="96" y="555" fill="#FAFAF8" font-family="sans-serif" font-size="24" font-weight="600">Grid Responsivo &amp; Tipografia</text>
    <rect x="608" y="450" width="308" height="190" rx="6" fill="#F1F0EC"/>
    <circle cx="762" cy="545" r="52" fill="none" stroke="#5B3DF5" stroke-width="2.5"/>
  </g>
</svg>
`);

const DEMO_IDENTITY_BOTANICA = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <filter id="shadow5" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#0F0F10" flood-opacity="0.10"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="#E9E7E0"/>
  <g filter="url(#shadow5)" transform="translate(180, 140)">
    <rect width="840" height="620" rx="8" fill="#FAFAF8"/>
    <rect x="60" y="60" width="340" height="500" rx="4" fill="#0F0F10"/>
    <text x="100" y="150" fill="#FAFAF8" font-family="sans-serif" font-size="44" font-weight="700" letter-spacing="-1">VERA</text>
    <text x="100" y="185" fill="#A0A0A8" font-family="monospace" font-size="13">ESSÊNCIA BOTÂNICA</text>
    <path d="M 230 270 C 290 270, 290 390, 230 390 C 170 390, 170 270, 230 270 Z" fill="none" stroke="#5B3DF5" stroke-width="3"/>
    <circle cx="230" cy="330" r="18" fill="#FAFAF8"/>
    <text x="100" y="510" fill="#A0A0A8" font-family="monospace" font-size="12">EMBALAGEM &amp; RÓTULO</text>

    <text x="450" y="140" fill="#5B3DF5" font-family="monospace" font-size="13" font-weight="700">IDENTIDADE VISUAL · 02</text>
    <text x="450" y="205" fill="#0F0F10" font-family="sans-serif" font-size="36" font-weight="700" letter-spacing="-1">Sistema de Rótulos</text>
    <text x="450" y="248" fill="#0F0F10" font-family="sans-serif" font-size="36" font-weight="700" letter-spacing="-1">&amp; Embalagens</text>
    <text x="450" y="305" fill="#525257" font-family="sans-serif" font-size="16">Arquitetura de informação limpa para</text>
    <text x="450" y="330" fill="#525257" font-family="sans-serif" font-size="16">linha de produtos e pontos de venda.</text>
    <line x1="450" y1="380" x2="770" y2="380" stroke="#0F0F10" stroke-opacity="0.1"/>
    <rect x="450" y="420" width="150" height="140" rx="4" fill="#F1F0EC"/>
    <rect x="620" y="420" width="150" height="140" rx="4" fill="#5B3DF5"/>
  </g>
</svg>
`);

const DEMO_CAMPAIGN_CULTURAL = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <rect width="1200" height="900" fill="#0F0F10"/>
  <rect x="120" y="110" width="960" height="680" rx="8" fill="#FAFAF8"/>
  <rect x="120" y="110" width="960" height="260" fill="#5B3DF5"/>
  <text x="180" y="235" fill="#FAFAF8" font-family="sans-serif" font-size="64" font-weight="700" letter-spacing="-2.5">MOSTRA HORIZONTE</text>
  <text x="180" y="290" fill="#FAFAF8" fill-opacity="0.85" font-family="monospace" font-size="15">CAMPANHA DE LANÇAMENTO &amp; SINALIZAÇÃO</text>
  <text x="180" y="465" fill="#0F0F10" font-family="sans-serif" font-size="34" font-weight="700">Identidade de Campanha Cultural</text>
  <text x="180" y="515" fill="#525257" font-family="sans-serif" font-size="18">Desdobramento de peças gráficas para divulgação impressa,</text>
  <text x="180" y="543" fill="#525257" font-family="sans-serif" font-size="18">banners digitais, credenciais e mídia exterior.</text>
  <line x1="180" y1="600" x2="1020" y2="600" stroke="#0F0F10" stroke-opacity="0.1"/>
  <text x="180" y="660" fill="#0F0F10" font-family="monospace" font-size="14">PROJETO DEMONSTRATIVO · DIREÇÃO DE ARTE PUBLICITÁRIA</text>
</svg>
`);

const DEMO_SOCIAL_LANCAMENTO = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <filter id="shadow7" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#0F0F10" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="#E7E5DE"/>
  <!-- 3 Vertical 9:16 Story Mockups -->
  <g filter="url(#shadow7)" transform="translate(155, 130)">
    <rect width="270" height="640" rx="16" fill="#0F0F10"/>
    <text x="32" y="72" fill="#5B3DF5" font-family="monospace" font-size="12" font-weight="700">STORY 01</text>
    <text x="32" y="260" fill="#FAFAF8" font-family="sans-serif" font-size="38" font-weight="700" letter-spacing="-1">Novo</text>
    <text x="32" y="304" fill="#FAFAF8" font-family="sans-serif" font-size="38" font-weight="700" letter-spacing="-1">Ciclo.</text>
    <rect x="32" y="530" width="206" height="48" rx="6" fill="#5B3DF5"/>
  </g>
  <g filter="url(#shadow7)" transform="translate(465, 130)">
    <rect width="270" height="640" rx="16" fill="#FAFAF8"/>
    <text x="32" y="72" fill="#525257" font-family="monospace" font-size="12" font-weight="700">STORY 02</text>
    <rect x="32" y="120" width="206" height="250" rx="8" fill="#F1F0EC"/>
    <circle cx="135" cy="245" r="56" fill="#0F0F10"/>
    <text x="32" y="435" fill="#0F0F10" font-family="sans-serif" font-size="24" font-weight="700">Sequência de</text>
    <text x="32" y="465" fill="#0F0F10" font-family="sans-serif" font-size="24" font-weight="700">Lançamento</text>
  </g>
  <g filter="url(#shadow7)" transform="translate(775, 130)">
    <rect width="270" height="640" rx="16" fill="#5B3DF5"/>
    <text x="32" y="72" fill="#FAFAF8" fill-opacity="0.8" font-family="monospace" font-size="12" font-weight="700">STORY 03</text>
    <text x="32" y="290" fill="#FAFAF8" font-family="sans-serif" font-size="52" font-weight="700" letter-spacing="-2">9:16</text>
    <text x="32" y="340" fill="#FAFAF8" font-family="sans-serif" font-size="20" font-weight="500">Direção Mobile</text>
    <line x1="32" y1="520" x2="238" y2="520" stroke="#FAFAF8" stroke-opacity="0.3"/>
    <text x="32" y="560" fill="#FAFAF8" font-family="monospace" font-size="12">CRIATIVOS DIGITAIS</text>
  </g>
</svg>
`);

const DEMO_WEB_PORTFOLIO_SAAS = createEditorialSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <filter id="shadow8" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0F0F10" flood-opacity="0.14"/>
    </filter>
  </defs>
  <rect width="1200" height="900" fill="#E8E6DF"/>
  <g filter="url(#shadow8)" transform="translate(110, 110)">
    <rect width="980" height="680" rx="10" fill="#0F0F10"/>
    <line x1="0" y1="54" x2="980" y2="54" stroke="#FAFAF8" stroke-opacity="0.1"/>
    <circle cx="28" cy="27" r="5" fill="#FAFAF8" fill-opacity="0.3"/>
    <circle cx="46" cy="27" r="5" fill="#FAFAF8" fill-opacity="0.3"/>
    <circle cx="64" cy="27" r="5" fill="#FAFAF8" fill-opacity="0.3"/>
    <text x="64" y="150" fill="#5B3DF5" font-family="monospace" font-size="14" font-weight="700">PLATAFORMA DIGITAL · UI DESIGN</text>
    <text x="64" y="235" fill="#FAFAF8" font-family="sans-serif" font-size="54" font-weight="700" letter-spacing="-2">Clareza em cada</text>
    <text x="64" y="298" fill="#FAFAF8" font-family="sans-serif" font-size="54" font-weight="700" letter-spacing="-2">interação.</text>
    <rect x="64" y="370" width="270" height="240" rx="8" fill="#1B1B1E" stroke="#FAFAF8" stroke-opacity="0.08"/>
    <rect x="355" y="370" width="270" height="240" rx="8" fill="#5B3DF5"/>
    <rect x="646" y="370" width="270" height="240" rx="8" fill="#FAFAF8"/>
  </g>
</svg>
`);

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'identidade-kineta',
    title: 'Kineta — Sistema de Identidade Visual',
    category: 'Identidade Visual',
    isDemo: true,
    featuredOnHome: true,
    year: '2026',
    summary:
      'Projeto demonstrativo de identidade visual com direção tipográfica minimalista, símbolo geométrico e papelaria institucional.',
    concept:
      'Desenvolvido para demonstrar a construção de uma marca contemporânea a partir de formas puras, contraste editorial entre preto profundo (#0F0F10) e roxo elétrico (#5B3DF5), e aplicação consistente em pontos de contato físicos e digitais.',
    deliverables: [
      'Logotipo e símbolo construtivo',
      'Definição tipográfica e paleta cromática',
      'Papelaria essencial e embalagens',
      'Guia de aplicação da marca',
    ],
    palette: [
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
      { hex: '#F1F0EC', swatchClass: 'bg-[#F1F0EC]' },
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
    ],
    coverImage: DEMO_VISUAL_IDENTITY_COVER,
    galleryImages: [
      {
        url: DEMO_VISUAL_IDENTITY_COVER,
        caption: 'Prancha 01 — Papelaria institucional e contraste cromático (Projeto demonstrativo)',
      },
      {
        url: DEMO_VISUAL_IDENTITY_DETAIL,
        caption: 'Prancha 02 — Grid construtivo do símbolo e especificações de cor (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'campanha-forma-ritmo',
    title: 'Forma & Ritmo — Campanha Multiplataforma',
    category: 'Campanhas',
    isDemo: true,
    featuredOnHome: true,
    year: '2026',
    summary:
      'Projeto demonstrativo de campanha publicitária integrando série de cartazes tipográficos, mídia exterior (OOH) e desdobramentos digitais.',
    concept:
      'Exploração de direção de arte publicitária baseada em tipografia de grande escala, blocos de cor de alta visibilidade e síntese visual para leitura rápida em ambientes urbanos e feeds digitais.',
    deliverables: [
      'Conceito visual e Key Visual da campanha',
      'Série de 3 cartazes tipográficos',
      'Desdobramento para mídia exterior (OOH)',
      'Adaptações para mídia digital e banners',
    ],
    palette: [
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#E6E4DD', swatchClass: 'bg-[#E6E4DD]' },
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
    ],
    coverImage: DEMO_CAMPAIGN_COVER,
    galleryImages: [
      {
        url: DEMO_CAMPAIGN_COVER,
        caption: 'Prancha 01 — Tríptico de cartazes tipográficos (Projeto demonstrativo)',
      },
      {
        url: DEMO_CAMPAIGN_DETAIL,
        caption: 'Prancha 02 — Key Visual e aplicação em formatos horizontais (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'social-narrativa-visual',
    title: 'Sistema Editorial para Redes Sociais',
    category: 'Redes Sociais',
    isDemo: true,
    featuredOnHome: true,
    year: '2026',
    summary:
      'Projeto demonstrativo de direção visual para conteúdo digital, com carrosséis modulares, stories e padronização estética de feed.',
    concept:
      'Criação de um ecossistema visual reconhecível para redes sociais, unindo raciocínio de marketing de conteúdo, ritmo de leitura em carrosséis e hierarquia clara de informação.',
    deliverables: [
      'Direção de arte para feed e carrosséis (4:5)',
      'Sistema de layouts para Stories (9:16)',
      'Padronização tipográfica e capas de destaques',
      'Estrutura visual orientada a retenção e clareza',
    ],
    palette: [
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
      { hex: '#ECEAE3', swatchClass: 'bg-[#ECEAE3]' },
    ],
    coverImage: DEMO_SOCIAL_COVER,
    galleryImages: [
      {
        url: DEMO_SOCIAL_COVER,
        caption: 'Prancha 01 — Sistema modular de carrosséis e publicações (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'web-atelier-digital',
    title: 'Atelier — Interface & Presença Digital',
    category: 'Web Design',
    isDemo: true,
    featuredOnHome: true,
    year: '2026',
    summary:
      'Projeto demonstrativo de web design para landing page editorial com foco em tipografia expressiva, espaço negativo e navegação fluida.',
    concept:
      'Interface projetada com abordagem mobile-first, unindo estética editorial minimalista, engenharia de front-end limpa e foco absoluto na apresentação visual do produto.',
    deliverables: [
      'Direção visual e UI Design completo',
      'Layout responsivo (Desktop e Mobile)',
      'Sistema de componentes e tipografia web',
      'Prototipagem interativa e especificações de código',
    ],
    palette: [
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
      { hex: '#F1F0EC', swatchClass: 'bg-[#F1F0EC]' },
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
    ],
    coverImage: DEMO_WEB_DESIGN_COVER,
    galleryImages: [
      {
        url: DEMO_WEB_DESIGN_COVER,
        caption: 'Prancha 01 — Composição da Hero e sistema de grid responsivo (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'identidade-vera-botanica',
    title: 'Vera — Identidade & Embalagens',
    category: 'Identidade Visual',
    isDemo: true,
    featuredOnHome: false,
    year: '2026',
    summary:
      'Projeto demonstrativo focado em arquitetura de rótulos, design de embalagens e direção tipográfica minimalista.',
    concept:
      'Estruturação de uma linguagem visual limpa para embalagens e impressos, priorizando leitura imediata no ponto de venda e equilíbrio entre superfícies foscas e acentos cromáticos.',
    deliverables: [
      'Identidade visual e logotipo',
      'Sistema de rótulos e embalagens',
      'Direção de arte para catálogo impresso',
      'Especificações para produção gráfica',
    ],
    palette: [
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
      { hex: '#F1F0EC', swatchClass: 'bg-[#F1F0EC]' },
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
    ],
    coverImage: DEMO_IDENTITY_BOTANICA,
    galleryImages: [
      {
        url: DEMO_IDENTITY_BOTANICA,
        caption: 'Prancha 01 — Rótulo principal e sistema de embalagens (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'campanha-mostra-horizonte',
    title: 'Mostra Horizonte — Campanha Cultural',
    category: 'Campanhas',
    isDemo: true,
    featuredOnHome: false,
    year: '2026',
    summary:
      'Projeto demonstrativo de campanha de lançamento para evento cultural, englobando cartazes, sinalização e mídia digital.',
    concept:
      'Desenvolvimento de uma identidade de campanha vibrante e modular, capaz de se adaptar de grandes formatos urbanos (OOH) a peças digitais mantendo unidade visual.',
    deliverables: [
      'Key Visual do evento',
      'Peças de sinalização e ambientação',
      'Cartazes impressos e convites',
      'Kit de divulgação digital',
    ],
    palette: [
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
    ],
    coverImage: DEMO_CAMPAIGN_CULTURAL,
    galleryImages: [
      {
        url: DEMO_CAMPAIGN_CULTURAL,
        caption: 'Prancha 01 — Sistema gráfico para campanha e sinalização (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'social-sequencia-lancamento',
    title: 'Direção Mobile & Criativos 9:16',
    category: 'Redes Sociais',
    isDemo: true,
    featuredOnHome: false,
    year: '2026',
    summary:
      'Projeto demonstrativo voltado a sequências visuais para Stories, Reels covers e criativos de performance mobile-first.',
    concept:
      'Planejamento visual pensado nativamente para telas verticais (9:16), combinando ganchos visuais fortes nos primeiros segundos, tipografia legível e chamada para ação clara.',
    deliverables: [
      'Sequências estratégicas para Stories',
      'Capas para Reels e vídeos curtos',
      'Criativos verticais para tráfego pago',
      'Guia de boas práticas mobile',
    ],
    palette: [
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
    ],
    coverImage: DEMO_SOCIAL_LANCAMENTO,
    galleryImages: [
      {
        url: DEMO_SOCIAL_LANCAMENTO,
        caption: 'Prancha 01 — Sequência vertical 9:16 para campanhas mobile (Projeto demonstrativo)',
      },
    ],
  },
  {
    id: 'web-plataforma-modular',
    title: 'Nexo — Landing Page de Produto Digital',
    category: 'Web Design',
    isDemo: true,
    featuredOnHome: false,
    year: '2026',
    summary:
      'Projeto demonstrativo de interface web para apresentação de produto digital, unindo contraste escuro, grid modular e foco em conversão.',
    concept:
      'Estruturação de uma página de produto com hierarquia de leitura escaneável, seções de demonstração visual e arquitetura de informação pensada tanto para desktop quanto para celular.',
    deliverables: [
      'Arquitetura de informação e Wireframe',
      'UI Design responsivo',
      'Design System enxuto de interface',
      'Especificação de interações e estados',
    ],
    palette: [
      { hex: '#0F0F10', swatchClass: 'bg-[#0F0F10]' },
      { hex: '#5B3DF5', swatchClass: 'bg-[#5B3DF5]' },
      { hex: '#FAFAF8', swatchClass: 'bg-[#FAFAF8]' },
    ],
    coverImage: DEMO_WEB_PORTFOLIO_SAAS,
    galleryImages: [
      {
        url: DEMO_WEB_PORTFOLIO_SAAS,
        caption: 'Prancha 01 — Interface desktop com grid modular (Projeto demonstrativo)',
      },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    period: '2025 — Now',
    role: 'Lead product designer',
    company: 'BeSafe',
    isDemo: true,
  },
  {
    period: '2024 — 2025',
    role: 'Lead product designer',
    company: 'Meetime',
    isDemo: true,
  },
  {
    period: '2023 — 2024',
    role: 'Product designer',
    company: 'Gamers Brawl',
    isDemo: true,
  },
  {
    period: '2023 — 2024',
    role: 'UX/UI designer',
    company: 'Construtora Patriani',
    isDemo: true,
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Identidade Visual & Branding',
    categoryFilter: 'Identidade Visual',
    description:
      'Construção de sistemas visuais memoráveis, logotipos, tipografia proprietária e diretrizes de marca para posicionamento claro no mercado.',
    deliverables: [
      'Logotipo & Símbolo',
      ' Direção Tipográfica & Cromática',
      'Papelaria & Embalagens',
      'Manual de Identidade Visual',
    ],
  },
  {
    number: '02',
    title: 'Campanhas & Direção de Arte',
    categoryFilter: 'Campanhas',
    description:
      'Desenvolvimento de conceitos visuais, key visuals e desdobramento de peças publicitárias para lançamentos, eventos e mídia on/offline.',
    deliverables: [
      'Key Visual de Campanha',
      'Peças Impressas & OOH',
      'Criativos de Performance',
      'Direção Fotográfica & Editorial',
    ],
  },
  {
    number: '03',
    title: 'Redes Sociais & Conteúdo Visual',
    categoryFilter: 'Redes Sociais',
    description:
      'Arquitetura visual para presença digital contínua, carrosséis estratégicos, stories e sistemas modulares que fortalecem a autoridade da marca.',
    deliverables: [
      'Sistemas para Feed & Carrosséis',
      'Direção para Stories & Reels',
      'Templates Editáveis',
      'Padronização Estética de Perfil',
    ],
  },
  {
    number: '04',
    title: 'Web Design & Interfaces Digitais',
    categoryFilter: 'Web Design',
    description:
      'Design de landing pages, portfólios e interfaces web responsivas com foco em experiência do usuário, clareza tipográfica e conversão.',
    deliverables: [
      'Landing Pages & Sites Institucionais',
      'UI Design Responsivo (Mobile-First)',
      'Design System & Componentes',
      'Prototipagem de Alta Fidelidade',
    ],
  },
];



