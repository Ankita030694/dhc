'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LenisContextProvider, useLenis } from '../context/LenisContext';

function LenisSetup({ children }: { children: React.ReactNode }) {
  const { setLenis } = useLenis();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    });

    setLenis(lenis);

    // Get scroll value
    lenis.on('scroll', (e: any) => {
      // Optional: You can add scroll event handling here if needed
      // console.log(e)
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, [setLenis]);

  return <>{children}</>;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <LenisContextProvider>
      <LenisSetup>{children}</LenisSetup>
    </LenisContextProvider>
  );
}
