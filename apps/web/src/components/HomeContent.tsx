"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Leaf, Heart, Compass, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Footer } from "./shared/Footer"

export function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="relative z-10">
            <h1 className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-primary">
                Moment
              </span>
            </h1>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Testimonials
              </Link>
            </nav>
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary font-medium relative overflow-hidden group">
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-block">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full border bg-primary/5 text-primary font-medium">
                  ✨ Your journey to mindfulness starts here
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                Transform Your Life Through
                <span className="block mt-4 bg-gradient-to-r from-primary pb-3 to-primary/70 bg-clip-text text-transparent">
                  Mindful Living
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of people who use Moment to build better habits, 
                find inner peace, and live more meaningful lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/sign-up">
                  <Button size="lg" className="h-14 px-8 text-lg font-medium relative overflow-hidden group">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Free Trial 
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-12 pt-12 border-t flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground font-medium">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground font-medium">No credit card required</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(13,148,136,0.1)_0%,rgba(255,255,255,0)_100%)]"></div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Everything you need to grow</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and guidance for your personal development journey.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-8 h-8" />}
              title="Daily Meditation"
              description="Guided practices for mindfulness and stress reduction."
              link="#"
            />
            <FeatureCard 
              icon={<Heart className="w-8 h-8" />}
              title="Mood Tracking"
              description="Understand your emotional patterns and triggers."
              link="#"
            />
            <FeatureCard 
              icon={<Compass className="w-8 h-8" />}
              title="Personal Journal"
              description="Document your journey and track your progress."
              link="#"
            />
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(13,148,136,0.1)_0%,rgba(255,255,255,0)_100%)]"></div>
      </section>

      {/* Would you like me to continue with the rest of the sections (Testimonials, CTA)? */}
    </div>
  )
}

function FeatureCard({ icon, title, description, link }: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ y: -8 }}
        className="flex flex-col items-start p-6 rounded-xl border bg-white hover:shadow-lg transition-all duration-300 h-full"
      >
        <div className="text-primary mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="mt-auto flex items-center text-sm text-primary font-medium">
          Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
        </div>
      </motion.div>
    </Link>
  )
}

function TestimonialCard({ quote, author, title }: {
  quote: string
  author: string
  title: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl bg-white border"
    >
      <p className="text-lg mb-4">"{quote}"</p>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </motion.div>
  )
}