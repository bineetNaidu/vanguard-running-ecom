'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrueSizingMatrixProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: string) => void;
  category: string;
}

export default function TrueSizingMatrix({ isOpen, onClose, onSelectSize, category }: TrueSizingMatrixProps) {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profile, setProfile] = useState({ q1: '', q2: '', q3: '' });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setProfile({ q1: '', q2: '', q3: '' });
      setIsAnalyzing(false);
    }
  }, [isOpen]);

  const isApparel = category.toUpperCase() === 'APPAREL';

  const stepsData: Record<1 | 2 | 3, { title: string; options: string[] }> = isApparel ? {
    1: { title: "Morphological Build", options: ['Lean / Ectomorph', 'Athletic / Mesomorph', 'Broad / Endomorph'] },
    2: { title: "Fit Protocol", options: ['Aero-Compression', 'Standard Articulation', 'Relaxed / Overshell'] },
    3: { title: "Layering Intent", options: ['Base Layer Contact', 'Mid-Layer Insulation', 'Outer Shell Protection'] }
  } : {
    1: { title: "Select Arch Profile", options: ['Flat / Low Arch', 'Neutral / Medium Arch', 'High Arch'] },
    2: { title: "Determine Strike Path", options: ['Heel Strike', 'Midfoot Strike', 'Forefoot Strike'] },
    3: { title: "Weekly Kinetic Volume", options: ['< 20 KM / Base', '20-50 KM / Threshold', '50+ KM / Vanguard'] }
  };

  const resultData = isApparel ? {
    size: 'SIZE M', 
    width: 'TAPERED_FIT', 
    desc: `Based on your ${profile.q1.toLowerCase() || 'selected'} build and preference for ${profile.q2.toLowerCase() || 'selected'}, we recommend standard Size M for optimal articulation.`
  } : {
    size: 'US 10.5', 
    width: 'STANDARD', 
    desc: `Based on your ${profile.q2.toLowerCase() || 'selected'} and ${profile.q3.toLowerCase() || 'selected'} load, we recommend a half-size up to accommodate late-stage carbon plate expansion.`
  };

  const handleNext = () => {
    if (step === 3) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(4);
      }, 1500);
    } else {
      setStep(s => s + 1);
    }
  };

  const modalVariants:any = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { y: '100%', opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-brand-graphite/30 backdrop-blur-sm cursor-pointer" />

          <motion.div className="fixed inset-x-0 bottom-0 z-50 md:inset-0 md:flex md:items-center md:justify-center pointer-events-none">
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="pointer-events-auto w-full md:w-[500px] bg-brand-offwhite h-[85vh] md:h-auto max-h-[85vh] md:max-h-[800px] flex flex-col rounded-t-4xl md:rounded-none shadow-2xl border-t md:border border-brand-graphite/20 overflow-hidden relative">
              
              <div className="flex items-center justify-between px-6 py-5 border-b border-brand-graphite/10 shrink-0">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-gray">
                  Sys.Calc // {isApparel ? 'Apparel Profile' : 'Kinetic Profile'}
                </span>
                <button onClick={onClose} className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-brand-gray p-2 -mr-2">[ CLOSE ]</button>
              </div>

              <div className="grow overflow-y-auto px-6 py-8 custom-scrollbar">
                <AnimatePresence mode="wait">
                  
                  {/* DYNAMIC STEPS 1-3 */}
                  {[1, 2, 3].map((currentStep) => {
                    const stepKey = currentStep as 1 | 2 | 3;
                    return step === stepKey && !isAnalyzing && (
                      <motion.div key={`step${stepKey}`} variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full">
                        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-6">
                          {stepsData[stepKey].title}
                        </h3>
                        <div className="space-y-3">
                          {stepsData[stepKey].options.map((option: string) => {
                            const profileKey = `q${stepKey}` as keyof typeof profile;
                            const isSelected = profile[profileKey] === option;
                            return (
                              <button
                                key={option}
                                onClick={() => setProfile({ ...profile, [profileKey]: option })}
                                className={`w-full text-left p-5 border transition-colors ${isSelected ? 'border-brand-graphite bg-brand-graphite text-brand-offwhite' : 'border-brand-graphite/20 text-brand-graphite hover:border-brand-graphite/50'}`}
                              >
                                <span className="text-[11px] uppercase tracking-widest font-mono block">{option}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* LOADING STATE */}
                  {isAnalyzing && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-[40vh] text-center">
                      <div className="w-12 h-12 border-2 border-brand-graphite/10 border-t-brand-graphite rounded-full animate-spin mb-6" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-brand-graphite animate-pulse">
                        {isApparel ? 'Compiling Morphological Data...' : 'Compiling Kinetic Data...'}
                      </span>
                    </motion.div>
                  )}

                  {/* RESULT STATE */}
                  {step === 4 && (
                    <motion.div key="step4" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center text-center h-full pt-8">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-gray mb-4 block">Optimal Matrix Alignment</span>
                      <h2 className="font-display text-6xl md:text-7xl uppercase tracking-tight mb-2">{resultData.size}</h2>
                      <span className="text-[12px] uppercase tracking-widest font-mono text-brand-graphite bg-brand-graphite/5 px-4 py-1 mb-8">
                        PROFILE: {resultData.width}
                      </span>
                      <p className="text-sm text-brand-gray max-w-sm leading-relaxed mb-8">
                        {resultData.desc}
                      </p>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="px-6 py-6 border-t border-brand-graphite/10 shrink-0 bg-brand-offwhite md:pb-6 pb-10">
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={(step === 1 && !profile.q1) || (step === 2 && !profile.q2) || (step === 3 && !profile.q3) || isAnalyzing}
                    className="w-full bg-brand-graphite text-brand-offwhite py-4 text-[11px] uppercase tracking-[0.2em] font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  >
                    {step === 3 ? 'Calculate Optimal Size' : 'Proceed_'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSelectSize(resultData.size);
                      onClose();
                    }}
                    className="w-full bg-brand-graphite text-brand-offwhite py-4 text-[11px] uppercase tracking-[0.2em] font-medium transition-transform active:scale-[0.98]"
                  >
                    Load Size Into System [ {resultData.size} ]
                  </button>
                )}
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}