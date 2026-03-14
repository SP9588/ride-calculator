import { Outlet } from '@tanstack/react-router';
import { Car } from 'lucide-react';

export function Layout() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'ride-calculator'
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="relative border-b border-border bg-card shadow-sm">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="Transportation"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-glow">
              <Car className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Ride Calculator
              </h1>
              <p className="text-sm text-muted-foreground">
                Easy transportation with transparent pricing
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Ride Calculator. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with{' '}
              <span className="text-primary" aria-label="love">
                ❤️
              </span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

