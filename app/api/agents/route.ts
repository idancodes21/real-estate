import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function GET(request: NextRequest) {
  try {
    // Verify the authenticated user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    // Only managers can access this endpoint
    if (currentUser.role !== "MANAGER") {
      return NextResponse.json(
        { message: "You do not have permission to view agents." },
        { status: 403 },
      );
    }

    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(searchParams.get("limit")) || 10),
    );

    const where = {
      user: {
        is: {
          role: "AGENT" as const,
          ...(search
            ? {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: "insensitive" as const,
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive" as const,
                    },
                  },
                  {
                    phone: {
                      contains: search,
                      mode: "insensitive" as const,
                    },
                  },
                ],
              }
            : {}),
        },
      },
    };

    const [agents, totalAgents] = await Promise.all([
      prisma.agent.findMany({
        where,
        select: {
          id: true,
          licenseNo: true,
          experience: true,
          designation: true,
          isVerified: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
              isActive: true,
              createdAt: true,
              profile: {
                select: {
                  city: true,
                  country: true,
                },
              },
            },
          },
          _count: {
            select: {
              properties: true,
              inquiries: true,
            },
          },
        },
        orderBy: {
          user: {
            createdAt: "desc",
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.agent.count({ where }),
    ]);

    return NextResponse.json({
      message: "Agents fetched successfully.",
      data: agents,
      pagination: {
        page,
        limit,
        totalAgents,
        totalPages: Math.ceil(totalAgents / limit),
      },
    });
  } catch (error) {
    console.error("GET AGENTS ERROR:", error);

    return NextResponse.json(
      { message: "Something went wrong while fetching agents." },
      { status: 500 },
    );
  }
}
