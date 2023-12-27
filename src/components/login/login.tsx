import { SyntheticEvent, useState } from 'react';
import './login.scss';
import { LoginUser } from '../../entities/user';
import { useUsers } from '../../hooks/users/use.users';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const { login } = useUsers();
  const [hasLogin, setHasLogin] = useState(false);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const loginUser: LoginUser = {
      email: formData.get('email')?.toString() as string,
      passwd: formData.get('passwd')?.toString() as string,
    };
    login(loginUser);
    setHasLogin(true);

    navigate('/');
  };

  return (
    <>
      <Link to="/">
        <div className="logo-image-container">
          <img
            src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_50/v1702408600/CS2%20STASH/fmbxdwdh6705npfii0ul.webp"
            alt="CS2 Logo"
            height={35}
          />
        </div>
      </Link>
      <div className="h3-container">
        <h3>LOG IN</h3>
      </div>
      <div className="login-form">
        {!hasLogin && (
          <form onSubmit={handleSubmit} aria-label="form">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" required />
            <label htmlFor="passwd">Password: </label>
            <input type="password" name="passwd" required />
            <button className="button-login" type="submit">
              Log in
            </button>

            <p className="register-button">
              You dont have account? Register <Link to="/register">Here</Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
}
