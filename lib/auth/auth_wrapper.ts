import { context } from "@/lib/context";
import { jwtService } from "@/lib/jwt/jwt_service";
import { AppError } from "@/exceptionHandling/app.exception";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";
import { logger } from "../logger";

type Handler = (
    req: NextRequest,
    ...args: any[]
) => Promise<NextResponse>;

/**
 * RBAC Middleware for Next.js Route Handlers
 */
export function withAuth(
    handler: Handler,
    requiredPermissions?: string[]
) {
    return async (req: NextRequest, ...args: any[]) => {
        try {
            // =========================
            // 1. CHECK AUTH HEADER
            // =========================
            const authHeader = req.headers.get("authorization");

            if (!authHeader?.startsWith("Bearer ")) {
                throw new AppError("UNAUTHORIZED");
            }

            const token = authHeader.split(" ")[1];

            // =========================
            // 2. VERIFY JWT
            // =========================
            const payload = await jwtService.verifyAndParse(token);
            jwtService.assertAccessToken(payload);

            const roles = payload.scope ? payload.scope.split(" ") : [];

            // =========================
            // 3. LOAD ROLES + PERMISSIONS
            // =========================
            const rolesData = await prisma.role.findMany({
                where: {
                    name: {
                        in: roles,
                    },
                },
                select: {
                    role_permission: {
                        select: {
                            permission: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            // flatten permissions
            const permissions = [
                ...new Set(
                    rolesData.flatMap(role =>
                        role.role_permission.map(rp => rp.permission.name)
                    )
                ),
            ];

            // =========================
            // 4. BUILD USER CONTEXT
            // =========================
            const user = {
                sub: payload.sub,
                roles,
                permissions,
            };

            // =========================
            // 5. PERMISSION CHECK
            // =========================
            if (requiredPermissions?.length) {
                const hasPermission = requiredPermissions.every(p =>
                    permissions.includes(p)
                );

                if (!hasPermission) {
                    throw new AppError("FORBIDDEN");
                }
            }

            // =========================
            // 6. RUN HANDLER WITH CONTEXT
            // =========================
            return context.run(user, async () => {
                return await handler(req, ...args);
            });
        } catch (err: any) {
            logger.error({ message: "Auth wrapper error", error: err instanceof Error ? err.message : err });

            if (err instanceof AppError) {
                return NextResponse.json({ error: err.message, code: err.code }, { status: err.statusCode || 400 });
            }

            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    };
}