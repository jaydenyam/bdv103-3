import previous_assignment from './assignment-2'

export type BookID = string

export interface Book {
  id?: BookID
  name: string
  author: string
  description: string
  price: number
  image: string
  genre?: string
  publicationDate?: string  // Expecting ISO date string format, e.g., "2023-01-01"
};

export interface Filter {
  from?: number
  to?: number
  name?: string
  author?: string
  genre?: string
  publicationDateFrom?: string  // Expecting ISO date string
  publicationDateTo?: string    // Expecting ISO date string
};

// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters?: Filter[]): Promise<Book[]> {
  const allBooks: Book[] = await previous_assignment.getAllBooks();
  if (!filters || filters.length === 0) return allBooks;

  return allBooks.filter(book =>
    filters.some(filter =>
      (filter.from === undefined || book.price >= filter.from) &&
      (filter.to === undefined || book.price <= filter.to) &&
      (filter.name === undefined || book.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.author === undefined || book.author.toLowerCase().includes(filter.author.toLowerCase())) &&
      (filter.genre === undefined || book.genre?.toLowerCase() === filter.genre.toLowerCase()) &&
      (filter.publicationDateFrom === undefined || new Date(book.publicationDate || '') >= new Date(filter.publicationDateFrom)) &&
      (filter.publicationDateTo === undefined || new Date(book.publicationDate || '') <= new Date(filter.publicationDateTo))
    )
  );
}

async function createOrUpdateBook(book: Book): Promise<BookID> {
  return await previous_assignment.createOrUpdateBook(book);
}

async function removeBook(book: BookID): Promise<void> {
  await previous_assignment.removeBook(book);
}

const assignment = 'assignment-3';

export default {
  assignment,
  createOrUpdateBook,
  removeBook,
  listBooks
};