'use client';

interface CountryFlagProps {
  countryCode: string;
  className?: string;
}

export function CountryFlag({ countryCode, className = "w-6 h-4" }: CountryFlagProps) {
  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
      alt={`Bandeira ${countryCode}`}
      className={`inline-block object-cover rounded ${className}`}
      loading="lazy"
    />
  );
}
