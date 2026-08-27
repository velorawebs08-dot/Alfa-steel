import React, { useState, useMemo } from 'react';
import { PROJECT_CATEGORIES, GALLERY_PROJECTS, ProjectCategory } from '../data/projects';
import { ProjectItem } from '../types';
import { Eye, MessageSquare, ChevronDown, ChevronUp, Sparkles, ArrowRight } from 'lucide-react';
import { ImageLightbox } from './ImageLightbox';
import { getWhatsAppUrl } from '../data/company';
import { useLanguage } from '../context/LanguageContext';

// Spotlight project indexes: 1st (index 0), 6th (index 5), 12th (index 11), 18th (index 17)
const SPOTLIGHT_INDEXES = [0, 5, 11, 17];
const SPOTLIGHT_PROJECTS = SPOTLIGHT_INDEXES.map((idx) => GALLERY_PROJECTS[idx]).filter(Boolean);

export const ProjectsGallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const displayedProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return isExpanded ? GALLERY_PROJECTS : SPOTLIGHT_PROJECTS;
    }
    return GALLERY_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory, isExpanded]);

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    // If switching to a specific category, show all for that category
    if (category !== 'All') {
      setIsExpanded(true);
    }
  };

  const getCategoryLabel = (cat: ProjectCategory) => {
    if (language !== 'mr') return cat;
    switch (cat) {
      case 'All': return 'सर्व';
      case 'Kitchen Equipment': return 'किचन उपकरणे';
      case 'SS Furniture': return 'फर्निचर व रॅक';
      case 'SS Railings': return 'रेलिंग व गेट्स';
      case 'Custom Projects': return 'कस्टम प्रोजेक्ट्स';
      default: return cat;
    }
  };

  return (
    <section id="projects" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.projectsGallery.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.projectsGallery.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.projectsGallery.subtitle}
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === 'All' 
              ? GALLERY_PROJECTS.length 
              : GALLERY_PROJECTS.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 border flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0062D2] border-[#0062D2] text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{getCategoryLabel(cat)}</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Unified Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              id={`gallery-item-${project.id}`}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              {/* Image Preview Container */}
              <div
                className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer flex items-center justify-center p-3"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-300 select-none"
                />

                {/* Category Pill */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {getCategoryLabel(project.category as ProjectCategory)}
                </div>

                {/* Subtle Hover Action Button */}
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'फोटो पहा' : 'View Image'}</span>
                  </span>
                </div>
              </div>

              {/* Text Information */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  {project.clientType && (
                    <div className="text-[11px] font-semibold text-[#0062D2]">
                      {project.clientType}
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#0062D2] transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Bottom Quick Inquiry Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-slate-700 hover:text-[#0062D2] transition-colors cursor-pointer"
                  >
                    {language === 'mr' ? 'तपशील पहा' : 'View Details'}
                  </button>
                  <a
                    href={getWhatsAppUrl(`Hello Alfa Steel, I am inquiring about your work: "${project.title}".`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366] hover:underline inline-flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3 fill-current" />
                    {language === 'mr' ? 'चौकशी करा' : 'Enquire'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / See More Controls */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          {activeCategory === 'All' && (
            <button
              id="toggle-projects-expansion-btn"
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 border-2 border-[#0062D2]/30 hover:border-[#0062D2] text-sm font-bold px-8 py-3 rounded-xl shadow-xs hover:shadow transition-all duration-150 cursor-pointer group"
            >
              <span>
                {isExpanded
                  ? (language === 'mr' ? 'कमी प्रोजेक्ट्स दाखवा' : 'Show Less Projects')
                  : (language === 'mr'
                      ? `आणखी प्रोजेक्ट्स पहा (${GALLERY_PROJECTS.length - displayedProjects.length} अधिक)`
                      : `See More Projects (${GALLERY_PROJECTS.length - displayedProjects.length} More)`)}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#0062D2] group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#0062D2] group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          )}

          {activeCategory !== 'All' && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setIsExpanded(true);
              }}
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-[#0062D2] hover:text-[#0051B0] hover:underline cursor-pointer"
            >
              <span>
                {language === 'mr'
                  ? `सर्व कॅटेगरी पहा (${GALLERY_PROJECTS.length} प्रोजेक्ट्स)`
                  : `View all categories (${GALLERY_PROJECTS.length} projects)`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr'
              ? `एकूण ${GALLERY_PROJECTS.length} पैकी ${displayedProjects.length} मॅन्युफॅक्चरिंग प्रोजेक्ट्स दाखवले आहेत. गरजेनुसार कस्टम ऑर्डर स्वीकारल्या जातात.`
              : `Showing ${displayedProjects.length} of ${GALLERY_PROJECTS.length} completed fabrication projects. Custom specifications manufactured upon request.`}
          </p>
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {selectedProject && (
        <ImageLightbox
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          image={selectedProject.image}
          title={selectedProject.title}
          category={getCategoryLabel(selectedProject.category as ProjectCategory)}
          description={selectedProject.description}
        />
      )}
    </section>
  );
};

