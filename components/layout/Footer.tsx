import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";
import { siteConfig, navigation } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="container-width py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-brand-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-brand-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold">SuperGuardian</h3>
              <p className="mt-2 text-sm text-gray-300">
                Professional SMSF administration, accounting, and compliance
                services for advisers, accountants, and trustees across
                Australia.
              </p>
            </div>
          </div>

          {/* Navigate Column - two columns, top-aligned */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Navigate
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 items-start">
              <ul className="space-y-2">
                {navigation.navigate.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-brand-orange transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {navigation.navigate.slice(5, 10).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-brand-orange transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column - wider for full addresses */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span className="min-w-0">
                  <strong className="text-white">{siteConfig.locations.adelaide.name}:</strong> {siteConfig.locations.adelaide.address}, {siteConfig.locations.adelaide.city}
                  <br />
                  <strong className="text-white">{siteConfig.locations.melbourne.name}:</strong> {siteConfig.locations.melbourne.address}, {siteConfig.locations.melbourne.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span>💼</span>
                <Link
                  href="/careers"
                  className="text-sm text-gray-300 hover:text-brand-orange transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="border-t border-transparent">
        <div className="container-width py-6">
          <div className="text-xs text-gray-400 space-y-4">
            <p>
              SuperGuardian is a registered tax agent with the Tax Practitioners Board (TPB) and is bound by the TPB Code of Professional Conduct.
              If you have a concern about the services we provide, you can make a complaint to the TPB via their website: <a href="https://www.tpb.gov.au/complaints" className="hover:text-brand-orange transition-colors" target="_blank" rel="noopener noreferrer">www.tpb.gov.au/complaints</a>
            </p>
            <p>
              <strong>Disclaimer:</strong> Any information that is financial
              product advice is provided by SuperGuardian Pty Ltd (AFSL No.{" "}
              {siteConfig.afsl}). The advice provided is general in nature and
              is not personal financial product advice. The advice provided has
              been prepared without taking into account your objectives,
              financial situation or needs and because of this you should,
              before acting on it, consider the appropriateness of it having
              regard to your objectives, financial situation and needs. You
              should carefully read and consider any product disclosure
              statement that is relevant to any financial product that has been
              discussed before making any decision about whether to acquire the
              financial product. Please refer to SuperGuardian FSG for contact
              information.
            </p>
            <p>
              By accessing and/or using information at or through this site each
              user waives and releases SuperGuardian to the full extent
              permitted by law from any and all claims relating to the usage of
              the material made available through the website. In no event shall
              SuperGuardian be liable for any incident or consequential damages
              resulting from use of the material.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-transparent">
        <div className="container-width py-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-gray-400 md:flex-row">
            <p>
              AFSL {siteConfig.afsl} | ABN {siteConfig.abn} | TAN {siteConfig.tan}
            </p>
            <p>
              © {new Date().getFullYear()} SuperGuardian Pty Ltd. All rights
              reserved.
            </p>
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-brand-orange transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-brand-orange transition-colors hidden md:block"
              >
                |
              </Link>
              <Link
                href="#"
                className="hover:text-brand-orange transition-colors"
              >
                Liability limited by a scheme approved under Professional
                Standards Legislation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
