import MainLayout from "@/components/layouts/MainLayout";
import Hero from "@/components/modules/LandingPage/Hero";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  if (typeof window === "undefined") return null;
  if (status === "authenticated") {
    router.replace("/dashboard");
  }
  if (status === "unauthenticated")
    return (
      <MainLayout>
        <Hero />
      </MainLayout>
    );
}
