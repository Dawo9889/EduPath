import { useState } from 'react';
import Papa from 'papaparse';
import User from '../../types/User';

interface Props {
  onImport: (users: User[]) => void;
}

function CSVImport({ onImport }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleImport = () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedUsers: User[] = results.data.map((row: any, index: number) => ({
          id: (Date.now() + index).toString(), // temp ID
          firstname: row.firstname,
          lastname: row.lastname,
          email: row.email.toLowerCase(),
          role: row.role?.toLowerCase() || 'student',
        }));
        onImport(parsedUsers);
        setFile(null); // reset file after import
      },
      error: (err) => {
        console.error('CSV parse error', err);
      },
    });
  };

  return (
    <div>
      <label className="block font-medium mb-1 text-primary">Import Users from CSV</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-2 cursor-pointer font-light text-primary"
      />
      <button
        onClick={handleImport}
        disabled={!file}
        className="px-4 py-2 rounded font-medium text-primary bg-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
      >
        Import
      </button>
      <p className="text-sm text-secondary mt-4">
        CSV must include: firstname, lastname, email (role defaults to student if missing).
      </p>
    </div>
  );
}

export default CSVImport;
