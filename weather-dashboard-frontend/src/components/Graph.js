// Graph.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = ({ forecast }) => (
  <div className="graph-container">
    <BarChart width={500} height={300} data={forecast}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="high" fill="#8884d8" name="High Temp" />
      <Bar dataKey="low" fill="#82ca9d" name="Low Temp" />
    </BarChart>
  </div>
);

export default Graph;
