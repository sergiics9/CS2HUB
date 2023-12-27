import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import './details.scss';
import { makeImageUrl } from '../../services/images';

export function Details() {
  const { currentSkin } = useSelector((state: RootState) => state.skinsState);

  let rarityClass;

  if (currentSkin?.rarity === 'Covert') {
    rarityClass = 'covert';
  } else if (currentSkin?.rarity === 'Mil-Spec Grade') {
    rarityClass = 'milspec';
  } else if (currentSkin?.rarity === 'Extraordinary') {
    rarityClass = 'extraordinary';
  } else if (currentSkin?.rarity === 'Restricted') {
    rarityClass = 'restricted';
  } else if (currentSkin?.rarity === 'Classified') {
    rarityClass = 'classified';
  } else {
    rarityClass = 'milspec';
  }

  const collectionImage =
    currentSkin &&
    currentSkin.collections_image &&
    makeImageUrl(currentSkin?.collections_image?.publicId, 90);

  const caseImage =
    currentSkin &&
    currentSkin.case_image &&
    makeImageUrl(currentSkin?.case_image?.publicId, 90);

  const updatedSkin = {
    ...currentSkin,
    image: {
      ...currentSkin!.image,
      url: currentSkin!.image.url.replace('http', 'https'),
    },
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
      <li className="card-details">
        <p className="skin-name">{currentSkin?.name}</p>
        <p className={`skin-rarity ${rarityClass}`}>{currentSkin?.rarity}</p>
        <div className="info-container">
          <p>
            <span className="description-details">
              {currentSkin?.description}
            </span>
          </p>
          <span className="category">{currentSkin?.category}</span>
        </div>
        <div className="image-container">
          <img
            src={`${updatedSkin?.image.url}`}
            alt={currentSkin?.collections_name}
            height="300"
            width="400"
          />
        </div>
      </li>

      <li className="card-details">
        <p className="collection-name">
          {' '}
          <span className="collection">Collection: </span>
          {currentSkin?.collections_name}
        </p>
        <p className="case-name-details">
          <span className="case">Case: </span> {currentSkin?.case_name}
        </p>
        <div className="image-container">
          <img src={collectionImage!} alt={currentSkin?.collections_name} />
          <img src={caseImage!} alt={currentSkin?.case_name} />
        </div>

        <Link to={'/'}>
          <button className="details-goback">Home</button>
        </Link>
      </li>
    </>
  );
}
