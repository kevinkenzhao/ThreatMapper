import { useNavigate } from 'react-router-dom';

import Button from '../components/button/Button';
import { useLocalStorage } from '../components/hooks/useLocalStorage';

export const Home = () => {
  const [, setValueInLocalStorage] = useLocalStorage('user', {});
  const navigate = useNavigate();

  return (
    <div className="flex justify-around">
      <div>Home</div>
      <Button
        onClick={() => {
          setValueInLocalStorage({
            auth: false,
          });
          navigate('/login');
        }}
      >
        Logout
      </Button>
    </div>
  );
};
