"use client"
import { Logo } from "@/components/ui/logo";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#97A2D7] ">
      <div className="md:animate-pulse ">
        <Logo  size={80} />
      </div>
    </div>
  );
}