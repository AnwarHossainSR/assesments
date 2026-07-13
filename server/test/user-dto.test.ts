import { beforeEach, expect, test } from 'bun:test';
import { toPublicUser, toSelfUser } from '../src/services/auth.service.js';
import { createUser, resetDb } from './helpers.js';

beforeEach(resetDb);

test('public user omits private account fields', async () => {
  const user = await createUser('owner@example.test');

  expect(toPublicUser(user)).toEqual({
    id: user.id,
    firstName: 'Test',
    lastName: 'User',
    avatarUrl: null,
  });
});

test('self user includes account fields', async () => {
  const user = await createUser('owner@example.test');

  expect(toSelfUser(user)).toEqual({
    id: user.id,
    firstName: 'Test',
    lastName: 'User',
    avatarUrl: null,
    email: 'owner@example.test',
    createdAt: user.createdAt.toISOString(),
  });
});
