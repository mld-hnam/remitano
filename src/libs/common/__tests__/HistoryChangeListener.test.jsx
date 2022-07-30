import { render } from '@/libs/test';
import HistoryChangeListener from '../HistoryChangeListener';

it('should call handler if the history is change', () => {
  const handleChange = jest.fn();

  const { history } = render(<HistoryChangeListener onChange={handleChange} />);

  history.push('/next-route');

  expect(handleChange).toBeCalled();
});
