import MainHeader from "./MainHeader";
import BackHeader from "./BackHeader";
interface HeaderProps {
  variant: "main" | "none" | "back";
  title?: string;
  onMenuClick?: () => void;
}
export default function Header({ variant, title, onMenuClick }: HeaderProps) {
  if (variant === "none") {
    return null;
  }
  return (
    <header className="app-header  border-b bg-white">
      {variant === "main" && <MainHeader title={title} onMenuClick={onMenuClick} />}
      {variant === "back" && title && <BackHeader title={title} />}
    </header>
  );
} 
