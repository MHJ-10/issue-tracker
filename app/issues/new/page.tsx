import { Metadata } from 'next';
import IssueForm from '../_components/IssueForm';

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;

export const metadata: Metadata = {
  title: 'Issue Tracker - New Issue',
  description: 'Add new issue form',
};
