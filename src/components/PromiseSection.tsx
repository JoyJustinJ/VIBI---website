import React from 'react';

export const PromiseSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-white/10 px-5 py-28 md:px-10">
      <p className="font-mono text-xs tracking-[.3em] text-[#D1FF00]">
        OUR PROMISE
      </p>
      <p className="mt-8 max-w-5xl font-serif text-5xl leading-[1.05] md:text-8xl text-white">
        Fresh chicken. Prepared with care. Served at the speed of{' '}
        <i className="italic">hunger.</i>
      </p>
    </section>
  );
};
