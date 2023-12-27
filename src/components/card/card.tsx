import { Skin } from '../../entities/skin';
import './card.scss';
import { useSkins } from '../../hooks/skins/use.skins';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/users/use.users';
import { makeImageUrl } from '../../services/images';
import Swal from 'sweetalert2';

type Props = {
  skin: Skin;
};

export function Card({ skin }: Props) {
  const { deleteSkin, handleCurrentSkin } = useSkins();
  const { loggedUser } = useUsers();

  const handleDelete = () => {
    Swal.fire({
      customClass: {
        container: 'custom-swal-font',
      },
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'orange',
      width: '19rem',
      showCancelButton: true,
      confirmButtonColor: 'limegreen',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSkin(skin.id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your skin has been deleted.',
          icon: 'success',
          background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
          color: 'white',
          iconColor: 'limegreen',
          width: '19rem',
          customClass: {
            container: 'custom-swal-font',
          },
        });
      }
    });
  };

  let rarityClass;

  if (skin.rarity === 'Covert') {
    rarityClass = 'covert';
  } else if (skin.rarity === 'Mil-Spec Grade') {
    rarityClass = 'milspec';
  } else if (skin.rarity === 'Extraordinary') {
    rarityClass = 'extraordinary';
  } else if (skin.rarity === 'Restricted') {
    rarityClass = 'restricted';
  } else if (skin.rarity === 'Classified') {
    rarityClass = 'classified';
  } else {
    rarityClass = 'milspec';
  }

  const caseImage = makeImageUrl(skin.case_image.publicId, 80);

  const handleUpdateCurrentSkin = (skin: Skin) => {
    handleCurrentSkin(skin);
  };

  const updatedSkin = {
    ...skin,
    image: {
      ...skin.image,
      url: skin.image.url.replace('http', 'https'),
    },
  };

  return (
    <li className="card">
      {loggedUser && loggedUser.role === 'Admin' && (
        <>
          <div className="container--delete-modify-buttons">
            <Link to={'/modify-skin/' + skin.id}>
              <div className="modify-button-container">
                <img
                  onClick={() => handleUpdateCurrentSkin(skin)}
                  role="button"
                  src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_20/v1702214592/CS2%20STASH/owz9qtt16ikaksimcg7x.webp"
                  alt="Modify image"
                />
              </div>
            </Link>

            <div className="delete-button-container">
              <img
                onClick={handleDelete}
                role="button"
                className=""
                src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_20/v1702214585/CS2%20STASH/ugszyo397i7sphzk9iqt.webp"
                alt="Delete image"
              />
            </div>
          </div>
        </>
      )}
      <div className="card-container">
        <p className="skin-name">{skin.name}</p>
        <p className={`skin-rarity ${rarityClass}`}>{skin.rarity}</p>
        <p className="skin-category">{skin.category}</p>

        <div className="image-container">
          <Link to={'/details/' + skin.id} style={{ textDecoration: 'none' }}>
            <img
              role="button"
              className="skin-image"
              src={`${updatedSkin.image.url}`}
              alt={`imagen de ${skin.name}`}
              width={400}
              height={300}
              onClick={() => handleCurrentSkin(skin)}
            />
          </Link>
          <p className="price">{skin.price}$</p>
        </div>
        <div className="container-case-img-case-name">
          <img src={caseImage} alt={`imagen de ${skin.case_name}`} />
          <p className="case-name">{skin.case_name}</p>
        </div>
        {/* <div className="container-details-add-cart">
          <p className="show-details-button">Show Details</p>
          <p className="add-to-cart-button">+ Add to cart</p>
        </div> */}
      </div>
    </li>
  );
}
