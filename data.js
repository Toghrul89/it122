const books = [
  { id: 1, title: 'Slowness', author: 'Milan Kundera', publicationhdate: '1996', genre: 'novel' },
  { id: 2, title: 'Death with Interruptions', author: 'Jose Saramago', publicationhdate: '2005', genre: 'novel' },
  { id: 3, title: 'Emma', author: 'Jane Austen', publicationhdate: '1815', genre: 'novel' },
  { id: 4, title: 'Animal Farm', author: 'George Orwell', publicationhdate: '1945', genre: 'novel' },
  { id: 5, title: 'Letter to My Daughter', author: 'Maya Angelou', publicationhdate: '2008', genre: 'novel' },
];

export function getAll() {
  return books;
}

export function getItem(id) {
  return books.find(book => book.id === parseInt(id));
}
