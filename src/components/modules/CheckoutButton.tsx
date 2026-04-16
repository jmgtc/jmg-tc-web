"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  serviceId: string;
  serviceName: string;
  price: number;
  className?: string;
  label?: string;
}

export default function CheckoutButton({
  serviceId,
  serviceName,
  price,
  className = "",
  label = "Contratar ahora",
}: CheckoutButtonProps) {
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          serviceName,
          price,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className={className}>
          {label}
        </button>
      </SignInButton>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} flex items-center justify-center gap-2`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Procesando...
        </>
      ) : (
        label
      )}
    </button>
  );
}
