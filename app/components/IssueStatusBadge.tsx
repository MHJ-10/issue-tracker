import React from 'react';
import { Status } from '@prisma/client';

const statusMap: Record<Status, { label: string; color: string }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue' },
  CLOSE: { label: 'Close', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <span
      className={`bg-${statusMap[status].color}-200  text-${statusMap[status].color}-700 inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ring-${statusMap[status].color}-500/10`}
    >
      {statusMap[status].label}
    </span>
  );
};

export default IssueStatusBadge;
