"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteSearchForm } from "@/components/search/SiteSearchForm";
import { siteConfig, navigation } from "@/lib/constants";

type MainNavItem = (typeof navigation.main)[number];

/** Path segment only: strips ?query and #hash (Next.js pathname never includes those). */
function pathFromHref(href: string): string {
  const noHash = href.split("#")[0] ?? "";
  const noQuery = noHash.split("?")[0] ?? "";
  return noQuery || "/";
}

function pathMatchesRoute(pathname: string, href: string): boolean {
  const base = pathFromHref(href);
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** Active orange for current section; Home is never marked active (per site UX). */
function isMainNavActive(item: MainNavItem, pathname: string): boolean {
  if (item.name === "Home") return false;
  if (item.name === "Education") {
    if (pathname === "/webinars" || pathname.startsWith("/webinars/")) return true;
  }
  if (item.children) {
    return item.children.some((c) => pathMatchesRoute(pathname, c.href));
  }
  return pathMatchesRoute(pathname, item.href);
}

function navLinkTone(active: boolean) {
  return cn(
    "transition-colors hover:text-brand-orange",
    active ? "text-brand-orange" : "text-gray-700"
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openMobileMenuId, setOpenMobileMenuId] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [searchOpen]);

  function toggleSearch() {
    setSearchOpen((open) => !open);
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 relative">
      <nav className="container-width grid grid-cols-[1fr_auto] items-end gap-x-4 py-3 md:py-5 lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-self-start lg:col-start-1">
          <Image
            src="/sg_logo.svg"
            alt="SuperGuardian"
            width={360}
            height={80}
            className="h-16 w-auto md:h-[104px]"
            priority
          />
        </Link>

        {/* Desktop Navigation — centered in header; equal 1fr tracks avoid shifting left when CTAs grow */}
        <div className="hidden lg:col-start-2 lg:flex lg:items-center lg:justify-self-center lg:gap-1 lg:mt-[3px] lg:mb-[-4px]">
          {navigation.main.map((item) => {
            const active = isMainNavActive(item, pathname);
            return item.children ? (
              <div key={item.name} className="relative group">
                {item.href !== "#" ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium",
                      navLinkTone(active)
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium",
                      navLinkTone(active)
                    )}
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
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  navLinkTone(active)
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:col-start-3 lg:flex lg:items-center lg:justify-self-end lg:gap-3 lg:mt-1 lg:mb-1">
          <button
            type="button"
            onClick={toggleSearch}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-blue transition-colors",
              "hover:bg-brand-orange/10 hover:text-brand-orange",
              "focus-visible:outline-none focus-visible:bg-brand-orange/10"
            )}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="site-search-popover"
          >
            {searchOpen ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Search className="h-4 w-4" aria-hidden />
            )}
          </button>
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

        <div className="col-start-2 flex items-center justify-self-end gap-1 mb-2 lg:hidden">
          <button
            type="button"
            className="rounded-full p-2 text-brand-blue transition-colors hover:bg-brand-blue/5 hover:text-brand-orange focus-visible:outline-none focus-visible:bg-brand-orange/10"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            aria-controls="site-search-popover"
          >
            {searchOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Search className="h-5 w-5" aria-hidden />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="p-2 text-gray-700"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setSearchOpen(false);
            }}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div
          id="site-search-popover"
          className="absolute left-0 top-full w-full border-t border-brand-blue/10 bg-white shadow-lg"
        >
          <div className="container-width py-4">
            <SiteSearchForm
              ref={searchInputRef}
              variant="header"
              inputId="site-search-input"
            />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container-width py-4 space-y-2">
            {navigation.main.map((item) => {
              const active = isMainNavActive(item, pathname);
              return item.children ? (
                <div key={item.name}>
                  <div
                    className={cn(
                      "flex w-full items-center justify-between py-2 text-sm font-medium",
                      navLinkTone(active)
                    )}
                  >
                    {item.href !== "#" ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
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
                  className={cn(
                    "block py-2 text-sm font-medium",
                    navLinkTone(active)
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
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
