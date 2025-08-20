import UserDashboard from "@/components/user-dashboard";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import type { DecodedToken } from "@/types/decoded-token";
import type { Note } from "@/types/note";

export default async function Dashboard() {
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("accessToken")?.value || "";
  const refreshToken = cookiesStore.get("refreshToken")?.value || "";

  let notes: Note[] = [];
  let user: DecodedToken | null = null;
  let invalidToken = false;
  let tokenNotFound = false;

  if (!authToken) {
    tokenNotFound = true;
  }

  try {
    user = jwtDecode<DecodedToken>(authToken);
  } catch (error: unknown) {
    if (error) {
      invalidToken = true;
      throw error;
    }
  }

  const fetchNotes = async () => {
    try {
      const response = await axios.get<Note[]>(
        `https://uptick-week-4.onrender.com/api/note?user_id=${user?._id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      notes = response.data;
    } catch (error: unknown) {
      if (error) throw error;
      throw error;
    }
  };

  fetchNotes();

  return (
    <UserDashboard
      user={user}
      authToken={authToken}
      refreshToken={refreshToken}
      invalidToken={invalidToken}
      tokenNotFound={tokenNotFound}
      notes={notes}
    />
  );
}
