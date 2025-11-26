// i18n 国际化配置
// 支持多语言的静态站点

export const languages = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

// 语言代码到 hreflang 的映射
export const hreflangMap: Record<Language, string> = {
  en: 'en',
  zh: 'zh-CN',
  es: 'es',
  de: 'de',
  fr: 'fr',
  ja: 'ja',
  ko: 'ko',
  pt: 'pt',
  ru: 'ru',
};

// 翻译文本
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Site
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Windows System Error Fix Encyclopedia',
    'site.description': 'Fix DLL missing errors safely with official Microsoft runtime packages. No suspicious downloads.',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dll': 'DLL Files',
    'nav.guides': 'Guides',
    'nav.search': 'Search',
    'nav.about': 'About',
    
    // Home
    'home.hero.title': 'Fix Windows DLL Errors',
    'home.hero.subtitle': 'Safe, Official Solutions',
    'home.hero.description': 'Stop searching for suspicious DLL downloads. We show you how to fix missing DLL errors the safe way - using official Microsoft runtime packages.',
    'home.search.placeholder': 'Search for a DLL file (e.g., vcruntime140.dll)',
    'home.search.button': 'Search',
    'home.quickfix.title': 'Quick Fix',
    'home.quickfix.description': 'Most DLL errors can be fixed by installing the correct Microsoft runtime package.',
    'home.popular.title': 'Popular DLL Files',
    'home.popular.viewAll': 'View All DLL Files',
    
    // DLL Detail
    'dll.fix': 'Fix',
    'dll.missing.error': 'Missing Error',
    'dll.quickfix.title': 'Quick Fix',
    'dll.official.download': 'Download Official Package',
    'dll.from.microsoft': 'From Microsoft.com',
    'dll.common.errors': 'Common Error Messages',
    'dll.what.is': 'What is',
    'dll.how.to.fix': 'How to Fix',
    'dll.manual.download': 'Manual Download (Last Resort)',
    'dll.warning': 'Important Warning',
    'dll.related.files': 'Related Files',
    'dll.file.details': 'File Details',
    'dll.verify.hash': 'Verify File Hash',
    'dll.safety.title': 'Safety Guarantee',
    
    // Footer
    'footer.copyright': '© 2025 FixMissingDLL. All rights reserved.',
    'footer.disclaimer': 'We recommend official Microsoft solutions first.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.dmca': 'DMCA',
    
    // Common
    'common.version': 'Version',
    'common.size': 'Size',
    'common.architecture': 'Architecture',
    'common.lastScanned': 'Last Scanned',
    'common.downloads': 'downloads',
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
  },
  zh: {
    // Site
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Windows 系统错误修复百科',
    'site.description': '使用官方 Microsoft 运行时包安全修复 DLL 缺失错误。无可疑下载。',
    
    // Navigation
    'nav.home': '首页',
    'nav.dll': 'DLL 文件',
    'nav.guides': '修复指南',
    'nav.search': '搜索',
    'nav.about': '关于我们',
    
    // Home
    'home.hero.title': '修复 Windows DLL 错误',
    'home.hero.subtitle': '安全、官方的解决方案',
    'home.hero.description': '不再寻找可疑的 DLL 下载。我们教您如何使用官方 Microsoft 运行时包安全地修复 DLL 缺失错误。',
    'home.search.placeholder': '搜索 DLL 文件（例如：vcruntime140.dll）',
    'home.search.button': '搜索',
    'home.quickfix.title': '快速修复',
    'home.quickfix.description': '大多数 DLL 错误可以通过安装正确的 Microsoft 运行时包来修复。',
    'home.popular.title': '热门 DLL 文件',
    'home.popular.viewAll': '查看全部 DLL 文件',
    
    // DLL Detail
    'dll.fix': '修复',
    'dll.missing.error': '缺失错误',
    'dll.quickfix.title': '快速修复',
    'dll.official.download': '下载官方安装包',
    'dll.from.microsoft': '来自 Microsoft.com',
    'dll.common.errors': '常见错误消息',
    'dll.what.is': '什么是',
    'dll.how.to.fix': '如何修复',
    'dll.manual.download': '手动下载（最后手段）',
    'dll.warning': '重要警告',
    'dll.related.files': '相关文件',
    'dll.file.details': '文件详情',
    'dll.verify.hash': '验证文件哈希',
    'dll.safety.title': '安全保证',
    
    // Footer
    'footer.copyright': '© 2025 FixMissingDLL. 保留所有权利。',
    'footer.disclaimer': '我们优先推荐官方 Microsoft 解决方案。',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.dmca': 'DMCA',
    
    // Common
    'common.version': '版本',
    'common.size': '大小',
    'common.architecture': '架构',
    'common.lastScanned': '最后扫描',
    'common.downloads': '次下载',
    'common.readMore': '阅读更多',
    'common.learnMore': '了解更多',
  },
  es: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Enciclopedia de errores del sistema Windows',
    'site.description': 'Repare errores de DLL faltantes de forma segura con paquetes oficiales de Microsoft.',
    'nav.home': 'Inicio',
    'nav.dll': 'Archivos DLL',
    'nav.guides': 'Guías',
    'nav.search': 'Buscar',
    'nav.about': 'Acerca de',
    'home.hero.title': 'Reparar errores de DLL de Windows',
    'home.hero.subtitle': 'Soluciones seguras y oficiales',
    'home.search.placeholder': 'Buscar un archivo DLL (ej: vcruntime140.dll)',
    'home.search.button': 'Buscar',
    'footer.copyright': '© 2025 FixMissingDLL. Todos los derechos reservados.',
  },
  de: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Windows-Systemfehler-Enzyklopädie',
    'site.description': 'Beheben Sie fehlende DLL-Fehler sicher mit offiziellen Microsoft-Laufzeitpaketen.',
    'nav.home': 'Startseite',
    'nav.dll': 'DLL-Dateien',
    'nav.guides': 'Anleitungen',
    'nav.search': 'Suche',
    'nav.about': 'Über uns',
    'home.hero.title': 'Windows DLL-Fehler beheben',
    'home.hero.subtitle': 'Sichere, offizielle Lösungen',
    'home.search.placeholder': 'Nach DLL-Datei suchen (z.B. vcruntime140.dll)',
    'home.search.button': 'Suchen',
    'footer.copyright': '© 2025 FixMissingDLL. Alle Rechte vorbehalten.',
  },
  fr: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Encyclopédie des erreurs système Windows',
    'site.description': 'Corrigez les erreurs DLL manquantes en toute sécurité avec les packages officiels Microsoft.',
    'nav.home': 'Accueil',
    'nav.dll': 'Fichiers DLL',
    'nav.guides': 'Guides',
    'nav.search': 'Rechercher',
    'nav.about': 'À propos',
    'home.hero.title': 'Corriger les erreurs DLL Windows',
    'home.hero.subtitle': 'Solutions sûres et officielles',
    'home.search.placeholder': 'Rechercher un fichier DLL (ex: vcruntime140.dll)',
    'home.search.button': 'Rechercher',
    'footer.copyright': '© 2025 FixMissingDLL. Tous droits réservés.',
  },
  ja: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Windows システムエラー修復百科事典',
    'site.description': '公式 Microsoft ランタイムパッケージで DLL エラーを安全に修復。',
    'nav.home': 'ホーム',
    'nav.dll': 'DLL ファイル',
    'nav.guides': 'ガイド',
    'nav.search': '検索',
    'nav.about': '概要',
    'home.hero.title': 'Windows DLL エラーを修復',
    'home.hero.subtitle': '安全で公式なソリューション',
    'home.search.placeholder': 'DLL ファイルを検索（例：vcruntime140.dll）',
    'home.search.button': '検索',
    'footer.copyright': '© 2025 FixMissingDLL. All rights reserved.',
  },
  ko: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Windows 시스템 오류 수정 백과사전',
    'site.description': '공식 Microsoft 런타임 패키지로 DLL 누락 오류를 안전하게 수정하세요.',
    'nav.home': '홈',
    'nav.dll': 'DLL 파일',
    'nav.guides': '가이드',
    'nav.search': '검색',
    'nav.about': '정보',
    'home.hero.title': 'Windows DLL 오류 수정',
    'home.hero.subtitle': '안전하고 공식적인 솔루션',
    'home.search.placeholder': 'DLL 파일 검색 (예: vcruntime140.dll)',
    'home.search.button': '검색',
    'footer.copyright': '© 2025 FixMissingDLL. All rights reserved.',
  },
  pt: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Enciclopédia de erros do sistema Windows',
    'site.description': 'Corrija erros de DLL ausentes com segurança usando pacotes oficiais da Microsoft.',
    'nav.home': 'Início',
    'nav.dll': 'Arquivos DLL',
    'nav.guides': 'Guias',
    'nav.search': 'Pesquisar',
    'nav.about': 'Sobre',
    'home.hero.title': 'Corrigir erros de DLL do Windows',
    'home.hero.subtitle': 'Soluções seguras e oficiais',
    'home.search.placeholder': 'Pesquisar arquivo DLL (ex: vcruntime140.dll)',
    'home.search.button': 'Pesquisar',
    'footer.copyright': '© 2025 FixMissingDLL. Todos os direitos reservados.',
  },
  ru: {
    'site.title': 'FixMissingDLL',
    'site.tagline': 'Энциклопедия ошибок системы Windows',
    'site.description': 'Безопасно исправляйте ошибки отсутствующих DLL с помощью официальных пакетов Microsoft.',
    'nav.home': 'Главная',
    'nav.dll': 'DLL файлы',
    'nav.guides': 'Руководства',
    'nav.search': 'Поиск',
    'nav.about': 'О нас',
    'home.hero.title': 'Исправить ошибки DLL Windows',
    'home.hero.subtitle': 'Безопасные официальные решения',
    'home.search.placeholder': 'Поиск DLL файла (напр: vcruntime140.dll)',
    'home.search.button': 'Поиск',
    'footer.copyright': '© 2025 FixMissingDLL. Все права защищены.',
  },
};

// 获取翻译文本
export function t(lang: Language, key: string): string {
  return translations[lang]?.[key] || translations[defaultLang][key] || key;
}

// 从 URL 获取语言
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Language;
  }
  return defaultLang;
}

// 生成语言切换链接
export function getLanguageSwitchUrl(currentUrl: URL, targetLang: Language): string {
  const currentLang = getLangFromUrl(currentUrl);
  const path = currentUrl.pathname;
  
  if (currentLang === defaultLang) {
    // 当前是默认语言，添加语言前缀
    return targetLang === defaultLang ? path : `/${targetLang}${path}`;
  } else {
    // 当前有语言前缀，替换或移除
    const pathWithoutLang = path.replace(`/${currentLang}`, '') || '/';
    return targetLang === defaultLang ? pathWithoutLang : `/${targetLang}${pathWithoutLang}`;
  }
}

// 生成 hreflang 链接
export function generateHreflangLinks(currentPath: string, baseUrl: string): Array<{ lang: string; href: string }> {
  const links: Array<{ lang: string; href: string }> = [];
  
  // 默认语言使用 x-default
  links.push({ lang: 'x-default', href: `${baseUrl}${currentPath}` });
  
  for (const [lang, hreflang] of Object.entries(hreflangMap)) {
    const langPath = lang === defaultLang ? currentPath : `/${lang}${currentPath}`;
    links.push({ lang: hreflang, href: `${baseUrl}${langPath}` });
  }
  
  return links;
}
