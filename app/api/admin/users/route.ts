import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clerkClient();

  // Check if requesting user is admin
  const requestingUser = await client.users.getUser(userId);
  const requestingRole = (requestingUser.publicMetadata as any)?.role;

  if (requestingRole !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fetch all users
  const { data: users } = await client.users.getUserList({ limit: 100 });

  const userList = users.map((user) => ({
    id: user.id,
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown",
    email: user.emailAddresses[0]?.emailAddress || "",
    imageUrl: user.imageUrl,
    role: (user.publicMetadata as any)?.role || "customer",
    createdAt: user.createdAt,
  }));

  return NextResponse.json({ users: userList });
}
