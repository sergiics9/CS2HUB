import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/users/use.users';
import './user.buttons.scss';
import Swal from 'sweetalert2';

export function UserButtons() {
  const { logout, loggedUser } = useUsers();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout?',
      icon: 'warning',
      background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'orange',
      width: '19rem',
      showCancelButton: true,
      confirmButtonColor: 'limegreen',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, logout!',
      customClass: {
        container: 'custom-swal-font',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: 'Logged out!',
          text: 'You have logged out successfully.',
          icon: 'success',
          customClass: {
            container: 'custom-swal-font',
          },
          background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
          color: 'white',
          iconColor: 'orange',
          width: '19rem',
        });
      }
    });
  };

  return (
    <section className="log-in-register-container">
      {!loggedUser && (
        <Link to="/login">
          <img
            className="login-image"
            role="button"
            src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_30/v1701889613/CS2%20STASH/nprf0pgji4ud47zgawr3.webp"
            alt="Login image"
          />
        </Link>
      )}

      {loggedUser && (
        <>
          <div className="logout-with-welcome">
            <Link to="/">
              <img
                onClick={handleLogout}
                role="button"
                className="logout-image"
                src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_20/v1701891289/CS2%20STASH/rlnvtifbsovsnwzagayu.webp"
                alt="Logout image"
              />
            </Link>
            <h3>Hi {loggedUser?.name}!</h3>
          </div>
          <div className="container-cart-add-buttons">
            <div className="cart-container-image">
              <img
                className="cart-image"
                src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_20/v1701889665/CS2%20STASH/j2y6eipzuqrv30hpveht.webp"
                alt="Cart image"
              />
            </div>
            {loggedUser && loggedUser.role === 'Admin' && (
              <Link to="/add-skin">
                <div className="add-container-image">
                  <img
                    className="add-image"
                    src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_20/v1701940303/CS2%20STASH/mjzzkkxprf5ykpddp8eg.webp"
                    alt="Add image"
                  />
                </div>
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}
