export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-t">
      <div className="container text-sm text-center text-muted-foreground">
        &copy; {currentYear} React Image Crop. All rights reserved.
      </div>
    </footer>
  );
}
