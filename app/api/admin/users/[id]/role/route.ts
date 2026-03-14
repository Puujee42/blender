import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id: targetUserId } = await params;
  const body = await request.json();
  const { role } = body;

  if (!["admin", "barber", "customer"].includes(role)) {
    return NextResponse.json(
      { error: "Invalid role. Must be admin, barber, or customer." },
      { status: 400 }
    );
  }

  // Update the target user's publicMetadata
  await client.users.updateUser(targetUserId, {
    publicMetadata: { role },
  });

  return NextResponse.json({ success: true, userId: targetUserId, role });
}
