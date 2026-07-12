import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth.js';
import { uploadImage } from '../lib/storage.js';
import { createPost, getFeed, deletePost } from '../services/post.service.js';
import { likePost, unlikePost, listPostLikers } from '../services/postLike.service.js';

export const postRoutes = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith('image/')),
});

const createSchema = z.object({ text: z.string().max(5000).optional(), visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC') });

postRoutes.post('/', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    const { text, visibility } = createSchema.parse(req.body);
    let imageUrl: string | null = null;
    if (req.file) imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
    res.status(201).json({ post: await createPost({ authorId: req.userId, text, imageUrl, visibility }) });
  } catch (err) { next(err); }
});

const feedSchema = z.object({ cursor: z.string().optional(), limit: z.coerce.number().optional() });

postRoutes.get('/', requireAuth, async (req, res, next) => {
  try { const { cursor, limit } = feedSchema.parse(req.query); res.json(await getFeed({ userId: req.userId, cursor, limit })); }
  catch (err) { next(err); }
});

postRoutes.delete('/:id', requireAuth, async (req, res, next) => {
  try { await deletePost({ postId: req.params.id as string, userId: req.userId }); res.status(204).end(); }
  catch (err) { next(err); }
});

postRoutes.post('/:id/like', requireAuth, async (req, res, next) => {
  try { res.json(await likePost({ postId: req.params.id as string, userId: req.userId })); } catch (err) { next(err); }
});
postRoutes.delete('/:id/like', requireAuth, async (req, res, next) => {
  try { res.json(await unlikePost({ postId: req.params.id as string, userId: req.userId })); } catch (err) { next(err); }
});
postRoutes.get('/:id/likes', requireAuth, async (req, res, next) => {
  try {
    const { cursor, limit } = z.object({ cursor: z.string().optional(), limit: z.coerce.number().optional() }).parse(req.query);
    res.json(await listPostLikers({ postId: req.params.id as string, cursor, limit }));
  } catch (err) { next(err); }
});
