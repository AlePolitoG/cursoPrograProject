import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';
import { env } from '../lib/env.js';
import { HttpError } from '../lib/httpError.js';

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200),
});

// Public-shape projection — never leak the password hash.
function publicUser(u) {
  return {
    id: u.id,
    email: u.email,
    isSubscribed: u.isSubscribed,
    createdAt: u.createdAt,
  };
}

/** POST /api/auth/register */
export async function register(req, res) {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, 'Invalid input', parsed.error.flatten().fieldErrors);
  }
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Avoid leaking which addresses are registered. Return 409 with a
    // generic message — clients should treat both register/login the same.
    throw new HttpError(409, 'Could not create account with that email');
  }

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: { email, passwordHash },
  });

  const token = signToken(user);
  res.status(201).json({ token, user: publicUser(user) });
}

/** POST /api/auth/login */
export async function login(req, res) {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, 'Invalid input', parsed.error.flatten().fieldErrors);
  }
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  // Run bcrypt.compare even when the user is missing so failed logins don't
  // reveal account existence via timing. Compare against a stable hash.
  const dummyHash = '$2b$12$CwTycUXWue0Thq9StjUM0uJ8.6m7LZv0jxQfXqxZl1aP3rKqX9VgC';
  const ok = await bcrypt.compare(password, user?.passwordHash ?? dummyHash);

  if (!user || !ok) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const token = signToken(user);
  res.status(200).json({ token, user: publicUser(user) });
}

/** GET /api/auth/me — handy for the client to revalidate state on boot. */
export async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}
