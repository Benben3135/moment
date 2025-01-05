"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-white border-t relative mt-32">
      {/* Newsletter Section - Now a floating card */}
      <div className="container mx-auto px-4">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl">
          <div className="mx-4">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                    Stay in the moment
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Get mindfulness tips and updates in your inbox
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="md:w-64"
                  />
                  <Button className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Moment
              </h3>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Transform your life through mindful practices and personal growth. Join our community of mindful individuals.
            </p>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1 md:col-span-2">
              <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary inline-flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 ml-0.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Moment. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}



const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Community', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'DPA', href: '#' },
      { name: 'Support', href: '#' },
    ],
  },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Settings', href: '#' },
]