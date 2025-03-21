import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <h1 className="text-xl font-bold text-foreground">React Image Crop</h1>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 transition-colors hover:text-primary"
        >
          <Github className="w-5 h-5" />
          <span className="sr-only">GitHub</span>
        </a>
      </div>
    </header>
  );
}
