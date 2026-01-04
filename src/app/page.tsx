"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title text-gradient">
            Run Smarter.<br />
            Train Harder.<br />
            Evolve.
          </h1>
          <p className="hero-subtitle">
            Scientific plans tailored to your physiology.
            The only fitness app you'll ever need.
          </p>

          <div className="hero-actions">
            <Link href="/onboarding">
              <Button size="lg" variant="primary">Start Your Journey</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="glow-orb glow-orb--1" />
      <div className="glow-orb glow-orb--2" />

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .hero {
          z-index: 10;
          text-align: center;
          max-width: 800px;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          z-index: 0;
        }

        .glow-orb--1 {
          width: 300px;
          height: 300px;
          background: var(--kinetiq-volt);
          top: -10%;
          left: -10%;
        }

        .glow-orb--2 {
          width: 400px;
          height: 400px;
          background: var(--kinetiq-electric);
          bottom: -10%;
          right: -10%;
        }
      `}</style>
    </div>
  );
}
