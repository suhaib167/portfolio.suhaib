import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Outfit, Noto_Naskh_Arabic } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cursor } from '@/components/Cursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { ParticleBackground } from '@/components/ParticleBackground';
import { AIChat } from '@/components/AIChat';
import { SoundEffects } from '@/components/SoundEffects';
import { PageTransition } from '@/components/PageTransition';
import { Loader } from '@/components/Loader';
import { AvatarAssistant } from '@/components/AvatarAssistant';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedsuhaib.dev'),
  title: {
    default: 'Mohamed Suhaib | ECE Engineer & Full Stack Developer',
    template: '%s | Mohamed Suhaib ',
  },
  description:
    'Electronics & Communication engineer specializing in full stack development, AI applications, and embedded systems. Building beautiful web experiences and solving real-world problems through code.',
  keywords: [
    'Mohamed Suhaib',
    'full stack developer',
    'ECE engineer',
    'AI enthusiast',
    'web development',
    'React',
    'Next.js',
    'TypeScript',
    'embedded systems',
    'portfolio',
    'Chennai',
  ],
  authors: [{ name: 'Mohamed Suhaib' }],
  creator: 'Mohamed Suhaib',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mohamedsuhaib.dev',
    siteName: 'Mohamed Suhaib Portfolio',
    title: 'Mohamed Suhaib | ECE Engineer & Full Stack Developer',
    description:
      'Electronics & Communication engineer specializing in full stack development, AI applications, and embedded systems.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Mohamed Suhaib Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Suhaib | ECE Engineer & Full Stack Developer',
    description:
      'Electronics & Communication engineer specializing in full stack development, AI applications, and embedded systems.',
    images: ['/images/og-image.png'],
    creator: '@mohamedsuhaib',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${outfit.variable} ${notoNaskhArabic.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Loader />
          <ParticleBackground />
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <BackToTop />
          <AvatarAssistant />
          <AIChat />
          <SoundEffects />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'glass text-foreground',
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}