import { Link } from 'react-router-dom';
import { UserButtons } from '../user.buttons/user.buttons';
import './header.scss';
import { Filter } from '../filter/filter';

export function Header() {
  return (
    <header>
      <div className="container-header">
        <div className="container--img-filter">
          <Link to="/">
            <div className="logo-image-container">
              <div className="desktop-logo">
                <img
                  src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_50/v1702408600/CS2%20STASH/fmbxdwdh6705npfii0ul.webp"
                  alt="CS2 Logo"
                />
              </div>
              <div className="mobile-logo">
                <img
                  src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_50/v1702408600/CS2%20STASH/fmbxdwdh6705npfii0ul.webp"
                  alt="CS2 Logo"
                />
              </div>
            </div>
          </Link>
          <div className="filter-container">
            <Filter></Filter>
          </div>
        </div>

        <UserButtons></UserButtons>
      </div>
    </header>
  );
}
