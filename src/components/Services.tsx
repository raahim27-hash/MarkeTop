import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Share2, 
  Gauge
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const servicesList = [
    {
      id: 'service-seo-analytics',
      title: 'SEO Analytics mastery',
      description: 'real time keywords tracking, competitor analysis, technical audits',
      icon: LineChart,
      bullets: [
        'Live SERP rank velocity & position monitoring',
        'Deep crawl spider for technical debt & core web vitals',
        'Competitor gap discovery & search intent clustering',
      ],
      metric: '#1 Positions',
      metricVal: '+185%',
    },
    {
      id: 'service-campaign-automation',
      title: 'Campaign Automation',
      description: 'Google, Meta, Linkedin orchestration with AI optimization',
      icon: Cpu,
      bullets: [
        'Cross-channel budget rebalancing in sub-second intervals',
        'Omnichannel audience cohort synchronization',
        'Real-time automated ad creative degradation prevention',
      ],
      metric: 'Ad Spend Waste',
      metricVal: '-42%',
    },
    {
      id: 'service-roi-performance',
      title: 'ROI Performance',
      description: 'Custom dashboards predictive analytics growth forecasting',
      icon: TrendingUp,
      bullets: [
        'Multi-touch algorithmic attribution pipelines',
        'Predictive revenue simulation based on search volatility',
        'Executive board dashboards with real-time KPI streaming',
      ],
      metric: 'Revenue Multiplier',
      metricVal: '3.4x Avg',
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full py-28 px-6 sm:px-8 lg:px-12 bg-[#1A1A1A] overflow-hidden"
    >
      {/* Subtle neon grid ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00D4FF]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#FF6B9D]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* H2: Core Services (Montserrat Black 40px, white center) */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="services-heading"
              className="text-[34px] sm:text-[40px] font-black tracking-tight text-white uppercase"
              style={{
                fontWeight: 900,
                textShadow: '0 0 25px rgba(255, 255, 255, 0.4)',
              }}
            >
              Core Services
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00D4FF] to-[#FF6B9D] mx-auto mt-4 rounded-full shadow-[0_0_12px_#00D4FF]" />
            <p className="mt-4 text-[#B0B0B0] text-base sm:text-lg max-w-2xl mx-auto">
              Precision-engineered analytics pillars designed to systematically capture market share and maximize return.
            </p>
          </motion.div>
        </div>

        {/* 3-column neon grid: repeat(auto-fit, minmax(350px, 1fr)) */}
        <div
          id="services-grid"
          className="grid gap-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          }}
        >
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer"
                style={{
                  border: '3px solid #00D4FF',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(26, 26, 26, 0.75)',
                  boxShadow:
                    '0 0 20px rgba(0, 212, 255, 0.25), inset 0 0 15px rgba(0, 212, 255, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 15px 40px -5px rgba(0, 212, 255, 0.5), 0 0 35px rgba(0, 212, 255, 0.7), inset 0 0 25px rgba(0, 212, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 20px rgba(0, 212, 255, 0.25), inset 0 0 15px rgba(0, 212, 255, 0.08)';
                }}
                onClick={() => onSelectService(service.title)}
              >
                {/* Top Corner Tag */}
                <div className="flex items-center justify-between mb-8">
                  {/* Icon (64px): fas fa-chart-line / #00D4FF Glow */}
                  <div
                    className="w-16 h-16 rounded-2xl bg-[#0C0C0C] flex items-center justify-center border border-[#00D4FF]/60 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      boxShadow: '0 0 20px #00D4FF, 0 0 35px rgba(0, 212, 255, 0.4)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-[#00D4FF] filter drop-shadow-[0_0_12px_#00D4FF]" />
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase text-[#B0B0B0] block">
                      {service.metric}
                    </span>
                    <span className="text-sm font-black text-[#00D4FF] font-mono">
                      {service.metricVal}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  {/* Title: 28px white bold */}
                  <h3
                    className="text-[26px] sm:text-[28px] font-bold text-white leading-tight mb-4 group-hover:text-[#00D4FF] transition-colors duration-300"
                    style={{ fontWeight: 700 }}
                  >
                    {service.title}
                  </h3>

                  {/* Description: 16px #B0B0B0 */}
                  <p
                    className="text-[16px] text-[#B0B0B0] leading-relaxed mb-6 font-normal"
                    style={{ color: '#B0B0B0', fontSize: '16px' }}
                  >
                    {service.description}
                  </p>

                  {/* Specific actionable features */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                    {service.bullets.map((bullet, bIndex) => (
                      <div key={bIndex} className="flex items-start gap-2.5 text-xs text-[#FFFFFD]/90">
                        <CheckCircle2 className="w-4 h-4 text-[#00D4FF] flex-shrink-0 mt-0.5 filter drop-shadow-[0_0_4px_#00D4FF]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-2 flex items-center justify-between text-sm font-semibold text-[#00D4FF] group-hover:translate-x-1 transition-transform duration-300">
                  <span className="tracking-wide uppercase text-xs">Explore Capability</span>
                  <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 flex items-center justify-center border border-[#00D4FF]/40 group-hover:bg-[#00D4FF] group-hover:text-black transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
