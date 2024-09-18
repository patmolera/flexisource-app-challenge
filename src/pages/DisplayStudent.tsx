import React, { useState, useEffect } from 'react';
import {
  Table,
  TableCell,
  TableRow,
  Placeholder,
  TableHead,
  TableBody,
  Button,
} from '@aws-amplify/ui-react';
import { del, get } from 'aws-amplify/api';
import { MdDelete, MdAdd } from 'react-icons/md';
import { Students } from '../types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const DisplayStudent: React.FC = () => {
  const [students, setStudents] = useState<Students[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = get({
          apiName: 'studentsApi',
          path: '/students',
        });

        console.log('data', data);
        const { body } = await data.response;
        const studentsJson = await body.json();
        setStudents([...students, ...studentsJson]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setErrorMessage('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  const handleDeleteStudent = async (id: string) => {
    try {
      const deleteStudent = del({
        apiName: 'studentsApi',
        path: `/students/object/${id}/id`,
      });
      await deleteStudent.response;
      console.log('delete', deleteStudent);
      setStudents(students.filter((student) => student.id !== id));
      toast.success('Student deleted.');
    } catch (error) {
      console.log('DELETE call failed: ', JSON.parse(error.response.body));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <PageWrapper>
          <div className="flex items-center justify-between my-4">
            <h2 className="text-center text-gray-600 text-lg font-semibold tracking-wide">
              Students List
            </h2>
            <Button
              variation="primary"
              colorTheme="info"
              onClick={() => navigate('/create-student')}
            >
              <MdAdd className="text-xl" /> Add Student
            </Button>
          </div>
          <div>
            <Table highlightOnHover={true}>
              <TableHead>
                <TableRow>
                  <TableCell as="th">ID</TableCell>
                  <TableCell as="th">First Name</TableCell>
                  <TableCell as="th">Last Name</TableCell>
                  <TableCell as="th">Email Address</TableCell>
                  <TableCell as="th">Date of Birt</TableCell>
                  <TableCell as="th">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <>
                    <TableRow>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Placeholder width="100%" height="30px" />
                      </TableCell>
                    </TableRow>
                  </>
                ) : students.length > 0 ? (
                  students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.first_name}</TableCell>
                      <TableCell>{student.last_name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.dob}</TableCell>
                      <TableCell>
                        <MdDelete
                          className="text-red-500 text-xl"
                          onClick={() => handleDeleteStudent(student.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center" colSpan={6}>
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </PageWrapper>
      </div>
    </>
  );
};

export default DisplayStudent;
