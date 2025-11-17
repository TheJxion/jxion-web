import { JxionButton, JxionInput } from '@jxion/ui';
import { useState } from 'react';
import Head from 'next/head';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <Head>
        <title>Jxion Framework - Next.js Case Study</title>
        <meta
          name="description"
          content="React Developer Case Study - Multi-Framework Component Architecture"
        />
      </Head>
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--color-noir-background-primary)' }}
      >
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <h1
            className="text-5xl md:text-7xl font-extrabold mb-6"
            style={{ color: 'var(--color-noir-secondary)' }}
          >
            Jxion Framework
          </h1>
          <p
            className="text-xl md:text-2xl mb-8"
            style={{ color: 'var(--color-noir-text-muted)' }}
          >
            React Developer Case Study - Next.js Primary Deployment
          </p>
          <p
            className="text-base mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--color-noir-text)' }}
          >
            This Next.js application directly consumes the shared and tested
            Jxion UI components, demonstrating 100% design consistency and
            instant component reuse.
          </p>
        </section>

        {/* Component Demo Section */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: 'var(--color-noir-primary)' }}
          >
            Component Library Demo
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Button Variants */}
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-noir-background-secondary)',
                borderColor: 'var(--color-noir-border)',
              }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: 'var(--color-noir-text)' }}
              >
                Button Variants
              </h3>
              <div className="space-y-4">
                <JxionButton
                  variant="primary"
                  onClick={() => alert('Primary clicked!')}
                >
                  Primary (Mürdüm)
                </JxionButton>
                <JxionButton
                  variant="secondary"
                  onClick={() => alert('Secondary clicked!')}
                >
                  Secondary (Gold)
                </JxionButton>
                <JxionButton
                  variant="danger"
                  onClick={() => alert('Danger clicked!')}
                >
                  Danger
                </JxionButton>
              </div>
            </div>

            {/* Form Inputs */}
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-noir-background-secondary)',
                borderColor: 'var(--color-noir-border)',
              }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: 'var(--color-noir-text)' }}
              >
                Form Inputs
              </h3>
              <div className="space-y-4">
                <JxionInput
                  label="Name"
                  value={name}
                  onChange={setName}
                  placeholder="Enter your name"
                  required
                />
                <JxionInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          </div>

          {/* Architecture Info */}
          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--color-noir-background-secondary)',
              borderColor: 'var(--color-noir-border)',
            }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--color-noir-text)' }}
            >
              Architecture Highlights
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: 'var(--color-noir-text-muted)' }}
            >
              <li>
                ✅ Direct import from <code className="text-xs">@jxion/ui</code>
              </li>
              <li>✅ 100% design consistency via CSS variables</li>
              <li>✅ Type-safe components with TypeScript</li>
              <li>✅ Zero re-development required</li>
              <li>✅ Instant component reuse across frameworks</li>
            </ul>
          </div>
        </section>

        {/* Case Study Link */}
        <section className="py-16 px-6 text-center">
          <a href="/case-study" className="inline-block">
            <JxionButton variant="primary" fullWidth={false}>
              View Full Case Study
            </JxionButton>
          </a>
        </section>
      </div>
    </>
  );
}
