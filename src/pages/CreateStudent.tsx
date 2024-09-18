import React, { useState } from 'react';
import { post } from 'aws-amplify/api';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdArrowBack } from 'react-icons/md';

import PageWrapper from '../components/PageWrapper';

interface StudentFormInput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
}

const CreateStudent: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StudentFormInput>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();

  const onSubmit = async (data: StudentFormInput) => {
    try {
      setLoading(true);
      const studentCreate = post({
        apiName: 'studentsApi',
        path: '/students',
        options: {
          body: {
            id: data.id,
            first_name: data.first_name,
            last_name: data.first_name,
            email: data.email,
            dob: data.dob,
          },
        },
      });
      const { body } = await studentCreate.response;
      const response = await body.json();

      console.log('POST call succeeded');
      console.log('res', response);
      setLoading(false);
      toast.success('Student added successfully.');
      navigate('/students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <PageWrapper>
          <Button
            variation="link"
            colorTheme="overlay"
            onClick={() => navigate('/students')}
          >
            <MdArrowBack className="text-lg" />
          </Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-gray-600 text-lg font-semibold tracking-wide">
              Student Form
            </h2>
            <Controller
              name="id"
              control={control}
              rules={{ required: 'ID is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ID"
                  errorMessage={errors.id?.message}
                  hasError={!!errors.id}
                />
              )}
            />

            <Controller
              name="first_name"
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  errorMessage={errors.first_name?.message}
                  hasError={!!errors.first_name}
                />
              )}
            />

            <Controller
              name="last_name"
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  errorMessage={errors.last_name?.message}
                  hasError={!!errors.last_name}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  errorMessage={errors.email?.message}
                  hasError={!!errors.email}
                />
              )}
            />

            <Controller
              name="dob"
              control={control}
              rules={{ required: 'Date of Birth is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Birth"
                  type="date"
                  errorMessage={errors.dob?.message}
                  hasError={!!errors.dob}
                />
              )}
            />

            <Button
              className="mt-4 ml-auto mr-auto"
              variation="primary"
              colorTheme="info"
              type="submit"
              loadingText="Saving..."
              isLoading={loading}
            >
              Create Student
            </Button>
          </form>
        </PageWrapper>
      </div>
    </>
  );
};

export default CreateStudent;
