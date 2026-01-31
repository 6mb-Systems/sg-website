"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig, navigation } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [whoWeAreOpen, setWhoWeAreOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container-width flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-blue">
              <div className="h-6 w-4 rounded-sm bg-brand-orange" />
            </div>
          </div>
          <span className="text-lg font-semibold">
            <span className="text-brand-orange">Super</span>
            <span className="text-brand-blue">Guardian</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.main.map((item) =>
            item.children ? (
              <div key={item.name} className="relative group">
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors"
                  aria-expanded="false"
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                  <div className="w-48 rounded-md border bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-blue transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button variant="secondary" size="sm" asChild>
            <a
              href={siteConfig.externalLinks.login}
              target="_blank"
              rel="noopener noreferrer"
            >
              Log In
            </a>
          </Button>
          <Button size="sm" asChild>
            <a
              href={siteConfig.externalLinks.getStarted}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container-width py-4 space-y-2">
            {navigation.main.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700"
                    onClick={() => setWhoWeAreOpen(!whoWeAreOpen)}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        whoWeAreOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {whoWeAreOpen && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-sm text-gray-600 hover:text-brand-blue"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="secondary" asChild>
                <a
                  href={siteConfig.externalLinks.login}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Log In
                </a>
              </Button>
              <Button asChild>
                <a
                  href={siteConfig.externalLinks.getStarted}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
