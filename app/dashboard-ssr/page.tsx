import UserDashboard from "@/components/user-dashboard";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("authToken")?.value || null;
  const refreshToken = cookiesStore.get("refreshToken")?.value || null;

  console.log("authToken", authToken);
  console.log("refreshToken", refreshToken);
  return (
    <div>
      <p className="flex flex-col gap-2">
        server rendered <span>{authToken}</span> <span>{refreshToken}</span>
      </p>
      <UserDashboard
        user={null}
        authToken={null}
        refreshToken={null}
        invalidToken={false}
        tokenNotFound={false}
        notes={[]}
        loading={false}
      />
    </div>
  );
}
