import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'audit' | 'call'>('audit');
  const [targetDomain, setTargetDomain] = useState('');

  const handleOpenAudit = (domain?: string) => {
    if (domain) setTargetDomain(domain);
    setModalMode('audit');
    setModalOpen(true);
  };

  const handleOpenBooking = () => {
    setModalMode('call');
    setModalOpen(true);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setModalMode('audit');
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#FFFFFD] font-['Montserrat',sans-serif] selection:bg-[#00D4FF] selection:text-black">
      {/* Fixed Header */}
      <Header onOpenAudit={() => handleOpenAudit()} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero onLaunchAnalytics={() => handleOpenAudit()} />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services onSelectService={handleServiceSelect} />

        {/* CTA Section */}
        <CtaSection
          onStartAudit={(domain) => handleOpenAudit(domain)}
          onBookCall={handleOpenBooking}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Audit & Strategy Call Modal */}
      <AuditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialDomain={targetDomain}
        mode={modalMode}
      />
    </div>
  );
}

