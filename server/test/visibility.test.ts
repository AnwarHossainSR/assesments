import { expect, test } from 'bun:test';
import { visiblePostByIdWhere, visiblePostWhere } from '../src/services/visibility.js';

test('visibility includes public and own posts', () => {
  expect(visiblePostWhere('viewer')).toEqual({
    OR: [{ visibility: 'PUBLIC' }, { authorId: 'viewer' }],
  });
  expect(visiblePostByIdWhere('post', 'viewer')).toEqual({
    id: 'post',
    OR: [{ visibility: 'PUBLIC' }, { authorId: 'viewer' }],
  });
});
