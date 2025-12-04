import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="border-t border-border/60 bg-background/70 supports-[backdrop-filter]:backdrop-blur"
      role="contentinfo"
    >
      <div className=" px-4 py-8 " >
        <div className="flex flex-col min-w-full md:flex-row items-center justify-between gap-4">
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Taskline. Tüm hakları saklıdır.
          </div>

          <nav className="flex gap-4 text-sm">
            <Link to="/about" className="hover:text-foreground">
              Hakkımızda
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              Gizlilik
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Kullanım Şartları
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              İletişim
            </Link>
          </nav>

          <div className="flex px-16 gap-4 text-sm">
          <Link to="https://github.com/krs1zzet" className="hover:text-foreground">
              #Github
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
