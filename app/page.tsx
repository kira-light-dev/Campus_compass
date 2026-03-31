import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  // When DISABLE_AUTH is true, skip token check and go straight to dashboard
  if (process.env.DISABLE_AUTH === "true") {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  redirect("/dashboard");
}