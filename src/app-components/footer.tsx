import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between py-6 w-full px-4 md:px-6 border-t bg-background">
      <p className="text-sm text-muted-foreground">
        &copy; 2024 EduIfa. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
        <Link
          href="#"
          className="text-sm hover:underline underline-offset-4 transition-colors duration-300 ease-in-out"
          prefetch={false}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className="text-sm hover:underline underline-offset-4 transition-colors duration-300 ease-in-out"
          prefetch={false}
        >
          Cookie Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
