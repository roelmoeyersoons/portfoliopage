import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/demo/helpers';

interface StepperProps {
  className?: string;
}

const steps = [
  { title: 'Ranging Request', desc: 'Node broadcasts sub-GHz sync request' },
  { title: 'Slot Negotiation', desc: 'Cluster assigns collision-free time slots' },
  { title: 'UWB Ranging', desc: 'Two-way ranging pulses execute' },
  { title: 'Position Update', desc: 'Sub-10cm coordinates published' },
];

const Stepper: React.FC<StepperProps> = ({ className }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((a) => (a + 1) % steps.length);

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      <div className="flex w-full max-w-lg items-start">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: active === i ? 1.15 : 1,
                  backgroundColor: active >= i ? 'rgba(0,242,254,1)' : 'rgba(255,255,255,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  active >= i
                    ? 'border-cyan-400 text-black'
                    : 'border-white/15 text-slate-500'
                }`}
              >
                {active > i ? '✓' : i + 1}
              </motion.div>
              <p className={`mt-2 text-center text-[9px] leading-tight ${active === i ? 'text-cyan-300' : 'text-slate-600'}`}>
                {step.title}
              </p>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="mx-1 mt-4 h-0.5 flex-1 overflow-hidden rounded bg-white/10">
                <motion.div
                  className="h-full bg-cyan-400"
                  animate={{ width: active > i ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current step detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="flex w-full max-w-lg items-center justify-between rounded-xl border border-white/10 bg-surface-100 px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-white">{steps[active].title}</p>
            <p className="text-xs text-slate-500">{steps[active].desc}</p>
          </div>
          <button
            onClick={handleNext}
            className="rounded-lg bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/25"
          >
            Next →
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Stepper;