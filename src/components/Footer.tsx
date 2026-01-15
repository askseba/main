import Link from 'next/link'
import { Twitter, Instagram, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer
      dir="rtl"
      className="bg-white border-t border-brown-text/20 py-8 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* قصتنا */}
          <div>
            <h3 className="text-brown-text font-semibold mb-4">قصتنا</h3>
            <Link
              href="/about"
              className="block text-brown-text/70 hover:text-primary transition-colors mb-2"
            >
              قصتنا في Ask Seba
            </Link>
          </div>

          {/* تساؤلات تهمك */}
          <div>
            <h3 className="text-brown-text font-semibold mb-4">تساؤلات تهمك</h3>
            <Link
              href="/faq"
              className="block text-brown-text/70 hover:text-primary transition-colors mb-2"
            >
              الأسئلة الشائعة
            </Link>
          </div>

          {/* سياسة الخصوصية */}
          <div>
            <h3 className="text-brown-text font-semibold mb-4">الخصوصية</h3>
            <Link
              href="/privacy"
              className="block text-brown-text/70 hover:text-primary transition-colors mb-2"
            >
              سياسة الخصوصية
            </Link>
          </div>

          {/* تواصل معنا */}
          <div>
            <h3 className="text-brown-text font-semibold mb-4">تواصل معنا</h3>
            <a
              href="mailto:support@askseba.com"
              className="flex items-center gap-2 text-brown-text/70 hover:text-primary transition-colors mb-2"
            >
              <Mail className="w-4 h-4" />
              <span>support@askseba.com</span>
            </a>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://twitter.com/askseba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-text/70 hover:text-primary transition-colors"
                aria-label="تابعنا على تويتر"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/askseba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-text/70 hover:text-primary transition-colors"
                aria-label="تابعنا على إنستغرام"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brown-text/10 pt-6 text-center">
          <p className="text-brown-text/60 text-sm">
            © {new Date().getFullYear()} Ask Seba. جميع الحقوق محفوظة.
          </p>
          <p className="text-brown-text/40 text-xs mt-2">
            صنع بكل حب في السعودية 🇸🇦
          </p>
        </div>
      </div>
    </footer>
  )
}
