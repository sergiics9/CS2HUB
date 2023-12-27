import { SyntheticEvent, useState } from 'react';
import './register.scss';
import { useUsers } from '../../hooks/users/use.users';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../entities/user';
import Swal from 'sweetalert2';

export function Register() {
  const [hasRegister, setHasRegister] = useState(false);
  const { register } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const newUser = {
      name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
      surname: (formElement.elements.namedItem('name') as HTMLInputElement)
        .value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      passwd: (formElement.elements.namedItem('passwd') as HTMLInputElement)
        .value,
    } as Partial<User>;
    register(newUser);
    Swal.fire({
      title: 'Success!',
      text: 'You have registered successfully.',
      icon: 'success',
      background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'limegreen',
      width: '19rem',
      customClass: {
        container: 'custom-swal-font',
      },
    });

    setHasRegister(true);
    navigate('/login');
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
        <h3>REGISTER</h3>
      </div>

      <div className="register-form">
        {!hasRegister && (
          <form onSubmit={handleSubmit} aria-label="form">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" required />
            <label htmlFor="surname">Surname: </label>
            <input type="text" name="surname" required />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required />
            <label htmlFor="passwd">Password: </label>
            <input type="password" name="passwd" required />
            <button className="button-register" type="submit">
              Register
            </button>
            <p className="register-button">
              You already have account? Login <Link to="/login">Here</Link>
            </p>
          </form>
        )}
        {hasRegister && (
          <Link to={'/'}>
            <p>Registro correcto</p>
          </Link>
        )}
      </div>
    </>
  );
}
