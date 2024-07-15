const items = [
  { id: 1, booktitle: 'Slowness', author: 'Milan Kundera', publicationhdate: '1996' },
  { id: 1, booktitle: 'Death with Interruptions', author: 'Jose Saramago', publicationhdate: '2005' },
  { id: 1, booktitle: 'Slowness', author: 'Milan Kundera', publicationhdate: '1996' },
  { id: 1, booktitle: 'Slowness', author: 'Milan Kundera', publicationhdate: '1996' },
  { id: 1, booktitle: 'Slowness', author: 'Milan Kundera', publicationhdate: '1996' },
];

export function getAll() {
  return items;
}

export function getItem(id) {
  return items.find(item => item.id === parseInt(id));
}
