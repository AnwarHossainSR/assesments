import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth.js';
import { listReplies, deleteComment } from '../services/comment.service.js';
import { likeComment, unlikeComment, listCommentLikers } from '../services/commentLike.service.js';

export const commentRoutes = Router();

commentRoutes.get('/:id/replies', requireAuth, async (req, res, next) => {
  try {
    const { cursor, limit } = z.object({ cursor: z.string().optional(), limit: z.coerce.number().optional() }).parse(req.query);
    res.json(await listReplies({ commentId: req.params.id as string, userId: req.userId, cursor, limit }));
  } catch (err) { next(err); }
});

commentRoutes.delete('/:id', requireAuth, async (req, res, next) => {
  try { await deleteComment({ commentId: req.params.id as string, userId: req.userId }); res.status(204).end(); }
  catch (err) { next(err); }
});

commentRoutes.post('/:id/like', requireAuth, async (req, res, next) => {
  try { res.json(await likeComment({ commentId: req.params.id as string, userId: req.userId })); } catch (err) { next(err); }
});
commentRoutes.delete('/:id/like', requireAuth, async (req, res, next) => {
  try { res.json(await unlikeComment({ commentId: req.params.id as string, userId: req.userId })); } catch (err) { next(err); }
});
commentRoutes.get('/:id/likes', requireAuth, async (req, res, next) => {
  try {
    const { cursor, limit } = z.object({ cursor: z.string().optional(), limit: z.coerce.number().optional() }).parse(req.query);
    res.json(await listCommentLikers({ commentId: req.params.id as string, userId: req.userId, cursor, limit }));
  } catch (err) { next(err); }
});
