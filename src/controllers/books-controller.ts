import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateBook, QueryParams } from '../protocols/books-protocol';
import booksService from '../services/books-service';
import applicationError from '../errors/index';

async function create(req: Request, res: Response): Promise<Response> {
  const book = req.body as CreateBook;
  await booksService.create(book);

  return res.sendStatus(httpStatus.CREATED);
}

async function readAll(req: Request, res: Response): Promise<Response> {
  const params = req.query as QueryParams;
  const books = await booksService.readAll(params);

  if (books.length === 0) throw applicationError.notFound('Books');

  return res.send(books).status(httpStatus.OK);
}

async function toggleHasBeenRead(req: Request, res: Response): Promise<Response> {
  const id = req.query.id as string;
  await booksService.toggleHasBeenRead(id);

  return res.sendStatus(httpStatus.OK);
}

async function remove(req: Request, res: Response): Promise<Response> {
  const id = req.query.id as string;
  await booksService.remove(id);

  return res.sendStatus(httpStatus.OK);
}

const booksController = {
  create,
  readAll,
  toggleHasBeenRead,
  remove,
};
export default booksController;
