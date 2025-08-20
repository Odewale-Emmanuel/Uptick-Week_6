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

  console.log("cookiesStore", cookiesStore);
  console.log("authToken", authToken);
  console.log("refreshToken", refreshToken);

  // let notes: Note[] = [];
  // let user: DecodedToken | null = null;
  // let invalidToken = false;
  // let tokenNotFound = false;

  // if (!authToken) {
  //   tokenNotFound = true;
  // }

  // try {
  //   user = jwtDecode<DecodedToken>(authToken);
  // } catch (error: unknown) {
  //   if (error) {
  //     invalidToken = true;
  //     throw error;
  //   }
  // }

  // const fetchNotes = async () => {
  //   try {
  //     const response = await axios.get<Note[]>(
  //       `https://uptick-week-4.onrender.com/api/note?user_id=${user?._id}`,
  //       {
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }
  //     );
  //     return response.data;
  //   } catch (error: unknown) {
  //     console.error("Error fetching notes:", error);
  //     throw error;
  //   }
  // };

  // try {
  //   notes = await fetchNotes();
  // } catch (error) {
  //   console.error("Error while fetching notes", error);
  // }

  // console.log("user", user);
  // console.log("notes", notes);

  return (
    <div>
      <p>
        hello from server {authToken} {refreshToken}
      </p>
      {/* Pass the fetched notes and other data to UserDashboard */}
      {/* <UserDashboard
        user={user}
        authToken={authToken}
        refreshToken={refreshToken}
        invalidToken={invalidToken}
        tokenNotFound={tokenNotFound}
        notes={notes}
      /> */}
    </div>
  );
}
