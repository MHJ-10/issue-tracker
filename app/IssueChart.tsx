'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data: { label: string; value: number }[] = [
    { label: 'Open', value: open },
    { label: 'In Progrerss', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar dataKey='value' barSize={60} fill='#1e3a8a' />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default IssueChart;
