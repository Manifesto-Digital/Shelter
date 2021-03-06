import React from 'react';
import { snapshotComponent } from 'test-helpers';
import { TableOfContentsFootNotes } from './footnotes';

export const createReferenceList = () => [
  '[s.3 Public Order Act 1986.]',
  '[s.2 Public Order Act 1986.]',
  '[s.2 Public Order Act 1986.]',
  '[s.4A(1) Public Order Act 1986.]',
  '[s.24 Police and Criminal Evidence Act 1984]',
  '[s.25 Police and Criminal Evidence Act 1984]',
  '[s.1(3) Police and Criminal Evidence Act 1984.]',
];

it('renders correctly', () => {
  const mockData = createReferenceList();
  snapshotComponent(<TableOfContentsFootNotes referenceList={mockData} />);
});
