import { Footer } from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/app/providers/GraphqlProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as PreferencesProvider } from "@/contexts/ThemeContext";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'es', 'fr'];

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <ClerkProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <PreferencesProvider>
                  {children}
                  <Toaster />
                </PreferencesProvider>
                <Footer />
              </ThemeProvider>
            </ClerkProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}