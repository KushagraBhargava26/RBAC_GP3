import React, { useState } from 'react';
import './DocumentBrowser.css';

const mockDocuments = [
  { name: 'financial_summary.md', department: 'Finance', type: 'Markdown' },
  { name: 'hr_data.csv', department: 'HR', type: 'CSV' },
  { name: 'engineering_master_doc.md', department: 'Engineering', type: 'Markdown' },
  { name: 'market_report_q4_2024.md', department: 'Marketing', type: 'Markdown' },
  { name: 'employee_handbook.md', department: 'General', type: 'Markdown' },
];

const DocumentBrowser = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('name');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (key) => {
    setSortKey(key);
    setDocuments((prevDocs) =>
      [...prevDocs].sort((a, b) => a[key].localeCompare(b[key]))
    );
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.department.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="document-browser">
      <h1>Document Browser</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Filter by department"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={() => handleSortChange('name')}>Sort by Name</button>
        <button onClick={() => handleSortChange('department')}>Sort by Department</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc, index) => (
            <tr key={index}>
              <td>{doc.name}</td>
              <td>{doc.department}</td>
              <td>{doc.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentBrowser;