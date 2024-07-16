const items = [
  { id: 1, title: 'Slowness', author: 'Milan Kundera', publicationhdate: '1996' },
  { id: 1, title: 'Death with Interruptions', author: 'Jose Saramago', publicationhdate: '2005' },
  { id: 1, title: 'Emma', author: 'Jane Austen', publicationhdate: '1815' },
  { id: 1, title: 'Animal Farm', author: 'George Orwell', publicationhdate: '1945' },
  { id: 1, title: 'Letter to My Daughter', author: 'Maya Angelou', publicationhdate: '2008' },
];

export function getAll() {
  return items;
}

export function getItem(id) {
  return items.find(item => item.id === parseInt(id));
}
