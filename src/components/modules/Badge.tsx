"use client";

interface BadgeProps {
  text: string;
  className?: string;
}

export default function Badge({ text, className = "" }: BadgeProps) {
  if (!text) return null;
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-gold">{text}</span>
    </div>
  );
}
