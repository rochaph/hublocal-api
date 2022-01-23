import { Request } from 'express';

export type RequestWithUser = Request & { user: { id: number; login: string } };

export type QueryPagination = Query & { page?: string; limit?: string };
