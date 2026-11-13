import { useState } from 'react';

interface PetImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function PetImage({ src, alt, className, loading = 'lazy' }: PetImageProps) {
  const [falhou, setFalhou] = useState(false);

  return (
    <img
      src={falhou ? '/pet-fallback.svg' : src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFalhou(true)}
    />
  );
}
