<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.

Before writing or modifying any Next.js code, you MUST read the relevant guide in:

`node_modules/next/dist/docs/`

Heed deprecation notices.

Do not rely only on your training data for Next.js APIs, routing, server actions, middleware, config, or file structure.
<!-- END:nextjs-agent-rules -->

# Agent Coding Rules

You are an AI coding agent working on this project.

Your goal is to write maintainable, production-like code, not just code that works once.

## Mandatory workflow

For every coding task, follow this order:

1. Inspect existing files
2. Identify the correct layer to modify
3. If unclear, ask the user
4. Design the change briefly
5. Edit files
6. Check for type/schema/import errors
7. Explain the result

Never skip directly to editing files unless the task is trivial and unambiguous.

---

## 1. Think before coding

Before editing any file, you MUST first understand:

- What the user wants
- Which files are related
- What framework/library version is being used
- What existing project conventions already exist
- Whether the requested change affects database, auth, API, UI, or business logic

Do not immediately write code without checking the existing structure.

If the task is unclear, incomplete, or has multiple possible interpretations, ASK the user before coding.

Examples of unclear requests:

- "Làm auth"
- "Sửa API"
- "Thiết kế DB chuẩn"
- "Thêm chức năng Gmail"
- "Tối ưu code"
- "Làm RBAC"

In these cases, ask a short clarification question instead of guessing.

## 2. Do not put everything in one file

Never write all business logic directly inside one API route, page, component, or action file.

Code must be separated by responsibility.

When implementing an API feature, prefer this structure:

```txt
src/
  app/
    api/
      feature-name/
        route.ts

  modules/
    feature-name/
      feature-name.schema.ts
      feature-name.service.ts
      feature-name.repository.ts
      feature-name.types.ts
```

Or follow the closest existing structure in the project if it already has one.

Layer responsibilities at a glance:

```txt
route.ts        -> nhận request / trả response
schema.ts       -> validate input
service.ts      -> xử lý nghiệp vụ
repository.ts   -> làm việc với DB
client.ts       -> gọi service ngoài như Gmail API / LLM service
types.ts        -> type dùng chung
```

## 3. API route responsibility

API route files should be thin.

A route file should mainly handle:

- Reading request data
- Calling validation
- Calling service
- Returning response
- Handling errors in a simple and consistent way

A route file must NOT contain:

- Long business logic
- Direct complex Prisma queries
- LLM prompt building logic
- OAuth flow logic mixed with DB logic
- Large validation blocks
- Repeated helper functions

**Bad example:**

```ts
export async function POST(req: Request) {
  // validate body
  // check user
  // query db
  // build business rule
  // call external API
  // save result
  // format response
  // 200 lines of code
}
```

**Good example:**

```ts
export async function POST(req: Request) {
  const body = await req.json();
  const input = createUserSchema.parse(body);

  const result = await userService.createUser(input);

  return Response.json(result);
}
```

## 4. Validation layer

Input validation must be separated from business logic.

Use a dedicated schema file when possible:

```txt
user.schema.ts
auth.schema.ts
gmail.schema.ts
application.schema.ts
```

Validation files should contain things like:

- Zod schemas
- Request DTO validation
- Enum validation
- Input shape validation

Example:

```ts
export const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  role: z.enum(["ADMIN", "HR", "REVIEWER"]),
});
```

Do not manually validate the same input repeatedly across many files.

## 5. Service layer

Business logic must be placed in service files.

Service files are responsible for:

- Use-case logic
- Permission checks
- Calling repositories
- Calling external services
- Deciding what should happen

Example:

```txt
user.service.ts
auth.service.ts
gmail.service.ts
candidate.service.ts
cv-analysis.service.ts
```

Service files should NOT directly contain huge raw SQL or complicated Prisma queries if they can be moved into repository files.

## 6. Repository layer

Database access must be placed in repository files when the query is more than trivial.

Repository files are responsible for:

- Prisma queries
- Database reads
- Database writes
- Query filters
- Transaction helpers

Example:

```txt
user.repository.ts
gmail-connection.repository.ts
application.repository.ts
candidate.repository.ts
analysis-result.repository.ts
```

Business decisions should not live inside repositories.

**Bad:**

```ts
if (user.role !== "ADMIN") {
  throw new Error("Forbidden");
}
```

**Good:**

```ts
// service layer checks permissions
// repository only queries database
```

## 7. Suggested feature structure

For auth:

```txt
src/modules/auth/
  auth.schema.ts
  auth.service.ts
  auth.repository.ts
  auth.types.ts
```

For users:

```txt
src/modules/users/
  user.schema.ts
  user.service.ts
  user.repository.ts
  user.types.ts
```

For Gmail connection:

```txt
src/modules/gmail/
  gmail.schema.ts
  gmail.service.ts
  gmail.repository.ts
  gmail-oauth.client.ts
  gmail.types.ts
```

For applications:

```txt
src/modules/applications/
  application.schema.ts
  application.service.ts
  application.repository.ts
  application.types.ts
```

For LLM analysis:

```txt
src/modules/llm-analysis/
  llm-analysis.schema.ts
  llm-analysis.service.ts
  llm-analysis.repository.ts
  llm-analysis.client.ts
  llm-analysis.types.ts
```

## 8. Error handling

Use consistent error handling.

Do not throw random string errors.

Prefer custom app errors or consistent error objects.

Example:

```ts
throw new AppError("EMAIL_ALREADY_EXISTS", "Email already exists", 409);
```

API routes should convert errors to HTTP responses consistently.

Avoid exposing internal errors, database errors, tokens, stack traces, or secrets to the client.

## 9. Security rules

Never hardcode secrets in source code.

Never expose:

- Access tokens
- Refresh tokens
- OAuth tokens
- API keys
- Password hashes
- Internal service keys

OAuth tokens stored in database should use encrypted field names such as:

```txt
accessTokenEncrypted
refreshTokenEncrypted
```

Do not name encrypted token fields like plain tokens.

Never log sensitive values.

## 10. Auth and RBAC rules

This project uses internal users.

Do not implement public registration unless explicitly requested.

Preferred flow:

```txt
Admin creates user
User logs in
User connects Gmail
System processes recruitment emails
```

Initial roles:

```txt
ADMIN
HR
REVIEWER
```

Do not over-engineer permission-based RBAC unless explicitly requested.

Use simple role checks first.

## 11. Prisma rules

Before changing Prisma schema, inspect the current Prisma version and config.

For Prisma 7+, do not put datasource URL directly inside `schema.prisma`.

Use `prisma.config.ts` for datasource URL configuration.

When changing schema:

- Keep model names PascalCase
- Keep field names camelCase
- Add indexes for frequently queried fields
- Use enums for stable statuses
- Use Json for flexible LLM result data
- Do not store binary files in the database
- Do not store plain text refresh tokens

After editing Prisma schema, suggest or run:

```bash
npx prisma format
npx prisma db push
npx prisma generate
```

For migration-based workflow, suggest:

```bash
npx prisma migrate dev --name <migration_name>
npx prisma generate
```

## 12. Next.js rules

Because this project may use a newer Next.js version with breaking changes:

Before writing code related to:

- App Router
- Route Handlers
- Middleware
- Server Actions
- Cookies
- Headers
- Config files
- Runtime behavior
- Caching
- Authentication integration

Read the relevant docs from:

```txt
node_modules/next/dist/docs/
```

Do not assume old Next.js behavior.

## 13. Code quality rules

Write code that is:

- Easy to read
- Easy to test
- Easy to extend
- Split by responsibility
- Consistent with existing project style

Avoid:

- God files
- Huge functions
- Duplicate logic
- Magic strings
- Hardcoded config
- Mixing DB, validation, and business logic in one place
- Writing code without checking existing files first

## 14. When modifying existing code

Before editing existing code:

1. Read the related files
2. Understand the current flow
3. Preserve existing conventions if they are reasonable
4. Refactor only what is necessary
5. Do not rewrite unrelated parts
6. Do not introduce breaking changes unless required

## 15. Final response after coding

After making changes, explain briefly:

- What files were changed
- What logic was added
- How the code is structured
- What command the user should run next
- Any risks or assumptions

Do not include unnecessary long explanations.