import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { requireAuth } from '../middleware/requireAuth.js';
import { uploadImage } from '../lib/storage.js';
import { createPost } from '../services/post.service.js';

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
