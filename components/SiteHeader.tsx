import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/write-for-us", label: "Write for Us" },
];

function NavigationLinks() {
  return navigation.map((item) => (
    <Link href={item.href} key={item.href}>
      {item.label}
    </Link>
  ));
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Student Outlook home">
          <span className="brand-mark" aria-hidden="true">
            SO
          </span>
          <span>Student Outlook</span>
        </Link>

        <nav className="desktop-navigation" aria-label="Main navigation">
          <NavigationLinks />
        </nav>

        <details className="mobile-navigation">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <NavigationLinks />
          </nav>
        </details>
      </div>
    </header>
  );
}
