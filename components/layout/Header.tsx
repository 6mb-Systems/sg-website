"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig, navigation } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openMobileMenuId, setOpenMobileMenuId] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container-width flex py-3 md:py-5 items-end justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/sg_logo.svg"
            alt="SuperGuardian"
            width={360}
            height={80}
            className="h-16 w-auto md:h-[104px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1 mb-2 md:mb-4">
          {navigation.main.map((item) =>
            item.children ? (
              <div key={item.name} className="relative group">
                {item.href !== "#" ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors"
                    aria-expanded="false"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                )}
                <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                  <div className="w-48 rounded-md border bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-orange/5 hover:text-brand-orange transition-colors"
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
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-3 mb-2 md:mb-4">
          <Button variant="secondary" size="sm" asChild>
            {siteConfig.externalLinks.login.startsWith("/") ? (
              <Link href={siteConfig.externalLinks.login}>Log In</Link>
            ) : (
              <a
                href={siteConfig.externalLinks.login}
                target="_blank"
                rel="noopener noreferrer"
              >
                Log In
              </a>
            )}
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
          className="lg:hidden p-2 text-gray-700 mb-2"
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
                  <div className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700">
                    {item.href !== "#" ? (
                      <Link href={item.href} className="hover:text-brand-orange" onClick={() => setMobileMenuOpen(false)}>
                        {item.name}
                      </Link>
                    ) : (
                      <span className="cursor-default">{item.name}</span>
                    )}
                    <button
                      className="p-2 -mr-2"
                      onClick={() => setOpenMobileMenuId(openMobileMenuId === item.name ? null : item.name)}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openMobileMenuId === item.name && "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                  {openMobileMenuId === item.name && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-sm text-gray-600 hover:text-brand-orange"
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
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-brand-orange"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="secondary" asChild>
                {siteConfig.externalLinks.login.startsWith("/") ? (
                  <Link href={siteConfig.externalLinks.login} onClick={() => setMobileMenuOpen(false)}>
                    Log In
                  </Link>
                ) : (
                  <a
                    href={siteConfig.externalLinks.login}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Log In
                  </a>
                )}
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
