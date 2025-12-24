import Image from "next/image";
import { AuthSwitcher } from "./components/AuthSwitcher";

export default function AuthPage() {
  return (
    <main className="h-[100vh] relative">
      <p className="text-2xl uppercase tracking-wider absolute top-2 left-2 text-white/60">
        Next Notes
      </p>

      <Image
        src="/clouds-bg.jpg"
        alt="Background"
        fill
        priority
        style={{ zIndex: -1 }}
      />

      <AuthSwitcher />
    </main>
  );
}
