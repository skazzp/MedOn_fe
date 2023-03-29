import React from 'react';
import ExampleComponent from '../../components/ExampleComponent';
import ExampleForm from '../../components/ExampleForm';

interface IProps {}

export default function ExamplePage({}: IProps) {
  return (
    <>
      <ExampleComponent />
      <ExampleForm />
    </>
  );
}
