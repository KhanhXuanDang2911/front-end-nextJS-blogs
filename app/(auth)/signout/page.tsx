"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const logout = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        setError("No token found. Redirecting...");
        setTimeout(() => router.push("/"), 2000);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/auth/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/");
        } else {
          setError(data.message || "Failed to log out");
        }
      } catch (err) {
        setError("An error occurred while logging out. Please try again.");
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Signing Out...</CardTitle>
            <CardDescription className="text-center">
              {error ? error : "Please wait while we sign you out"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LogOut className="h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/")}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
