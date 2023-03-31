import { decrement, increment } from 'redux/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Container } from './styles';

const ExampleCounter = () => {
  // hook to get the value
  const { value } = useAppSelector((state) => state.counter);

  // hook to dispatch(action) to update the value
  const dispatch = useAppDispatch();

  // simple just to show the value and functionality
  // i know not to use + and - here
  return (
    <Container>
      <button onClick={() => dispatch(increment())}>+</button>
      <h1>{value}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
    </Container>
  );
};

export default ExampleCounter;
