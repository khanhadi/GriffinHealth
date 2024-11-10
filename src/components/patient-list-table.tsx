import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Activity,
  AlertCircle,
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
}

type SortField = 'id' | 'name' | 'age' | 'lastVisit';
type SortDirection = 'asc' | 'desc';

interface PatientListTableProps {
  /** Array of patient data */
  patients?: Patient[];
  /** Initial field to sort by */
  initialSortField?: SortField;
  /** Initial sort direction */
  initialSortDirection?: SortDirection;
  /** Callback when a patient row is clicked */
  onPatientClick?: (patient: Patient) => void;
  /** Callback when export button is clicked */
  onExport?: () => void;
  /** Whether to show the export button */
  showExport?: boolean;
  /** Custom class name for the table container */
  className?: string;
}

const PatientListTable: React.FC<PatientListTableProps> = ({
  patients = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      age: 45,
      lastVisit: '2024-11-08',
      condition: 'Diabetes Type 2',
      status: 'Stable',
      priority: 'medium',
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      age: 62,
      lastVisit: '2024-11-09',
      condition: 'Hypertension',
      status: 'Need Attention',
      priority: 'high',
    },
    {
      id: 'P003',
      name: 'Emma Davis',
      age: 28,
      lastVisit: '2024-11-07',
      condition: 'Asthma',
      status: 'Stable',
      priority: 'low',
    },
    {
      id: 'P004',
      name: 'James Wilson',
      age: 53,
      lastVisit: '2024-11-10',
      condition: 'Arthritis',
      status: 'Improving',
      priority: 'medium',
    },
  ],
  initialSortField = 'name',
  initialSortDirection = 'asc',
  onPatientClick,
  onExport,
  showExport = true,
  className = '',
}) => {
  const [sortField, setSortField] = useState<SortField>(initialSortField);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedPatients = () => {
    const filteredPatients = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredPatients.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'stable':
        return 'text-green-500';
      case 'need attention':
        return 'text-red-500';
      case 'improving':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPriorityIcon = (priority: Patient['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <Activity className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {showExport && (
          <Button variant="outline" onClick={onExport}>
            Export
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('id')}
              >
                ID
                {sortField === 'id' &&
                  (sortDirection === 'asc' ? (
                    <ChevronUp className="inline h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name
                {sortField === 'name' &&
                  (sortDirection === 'asc' ? (
                    <ChevronUp className="inline h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort('age')}
              >
                Age
                {sortField === 'age' &&
                  (sortDirection === 'asc' ? (
                    <ChevronUp className="inline h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getSortedPatients().map((patient) => (
              <TableRow
                key={patient.id}
                className="cursor-pointer"
                onClick={() => onPatientClick?.(patient)}
              >
                <TableCell>{getPriorityIcon(patient.priority)}</TableCell>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <span className={getStatusColor(patient.status)}>
                    {patient.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientListTable;
