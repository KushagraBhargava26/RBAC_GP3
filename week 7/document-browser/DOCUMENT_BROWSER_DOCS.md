# Document Browser Documentation

## Overview
The Document Browser is a React-based UI component that provides a visual interface for browsing and exploring documents in a knowledge base. It displays documents in a grid/table format and allows users to interact with the data through sorting, filtering, and searching.

## Features
- **Grid/Table View**: Displays document details such as name, department, and type.
- **Sorting**: Users can sort documents by name or department.
- **Filtering**: Users can filter documents by department.
- **Search**: Optional search functionality for document names.

## File Structure
```
week 7/
└── document-browser/
    ├── DocumentBrowser.jsx
    ├── DocumentBrowser.css
    └── DOCUMENT_BROWSER_DOCS.md
```

## Components
### DocumentBrowser.jsx
This is the main React component that renders the document browser UI. It uses mock data to simulate the document list.

#### Mock Data
```javascript
const mockDocuments = [
  { name: 'financial_summary.md', department: 'Finance', type: 'Markdown' },
  { name: 'hr_data.csv', department: 'HR', type: 'CSV' },
  { name: 'engineering_master_doc.md', department: 'Engineering', type: 'Markdown' },
  { name: 'market_report_q4_2024.md', department: 'Marketing', type: 'Markdown' },
  { name: 'employee_handbook.md', department: 'General', type: 'Markdown' },
];
```

#### State Management
- **`documents`**: Stores the list of documents.
- **`filter`**: Stores the current filter value.
- **`sortKey`**: Stores the current sorting key.

#### Functions
- **`handleFilterChange`**: Updates the filter state based on user input.
- **`handleSortChange`**: Sorts the document list based on the selected key.

### DocumentBrowser.css
Contains styles for the Document Browser UI, ensuring a clean and readable layout.

## Usage
1. Ensure you have Node.js and npm installed.
2. Create a React app or integrate the `DocumentBrowser.jsx` component into an existing React project.
3. Place the `DocumentBrowser.jsx` and `DocumentBrowser.css` files in the appropriate directory.
4. Import and use the `DocumentBrowser` component in your React app:

```javascript
import DocumentBrowser from './document-browser/DocumentBrowser';

function App() {
  return (
    <div className="App">
      <DocumentBrowser />
    </div>
  );
}

export default App;
```

## Future Enhancements
- Add backend integration to fetch real document data.
- Implement advanced search functionality.
- Add pagination for large document lists.