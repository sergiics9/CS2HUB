import { SyntheticEvent, useState } from 'react';
import './add.skin.scss';
import { useSkins } from '../../hooks/skins/use.skins';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function AddSkin() {
  const navigate = useNavigate();

  const { createSkin } = useSkins();

  const [skinImagePreview, setSkinImagePreview] = useState<string | null>(null);
  const [collectionImagePreview, setCollectionImagePreview] = useState<
    string | null
  >(null);
  const [caseImagePreview, setCaseImagePreview] = useState<string | null>(null);

  const handleSkinImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSkinImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCollectionImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCollectionImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaseImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCaseImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSkin = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    createSkin(formData);
    Swal.fire({
      title: 'Created!',
      text: 'Your skin has been created.',
      icon: 'success',
      background: 'linear-gradient(to right, rgb(58,63,68), rgba(0, 0, 0))',
      color: 'white',
      iconColor: 'limegreen',
      width: '19rem',
      customClass: {
        container: 'custom-swal-font',
      },
    });
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
        <h3>Add Skin</h3>
      </div>

      <div className="add-skin-form">
        <form onSubmit={handleCreateSkin} aria-label="form">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" required />
          <label htmlFor="rarity">Rarity: </label>
          <select name="rarity" id="rarity">
            <option value="Covert">Covert</option>
            <option value="Mil-Spec Grade">Mil-Spec Grade</option>
            <option value="Extraordinary">Extraordinary</option>
            <option value="Restricted">Restricted</option>
            <option value="Classified">Classified</option>
          </select>
          <label htmlFor="category">Category:</label>
          <select name="category" id="category">
            <option value="Rifle">Rifle</option>
            <option value="SMG">SMG</option>
            <option value="Pistol">Pistol</option>
            <option value="Knife">Knife</option>
            <option value="Glove">Glove</option>
          </select>
          <label htmlFor="price">Price: </label>
          <input type="text" name="price" required />
          <label htmlFor="description">Description: </label>
          <input type="text" name="description" required />
          <label htmlFor="image">Skin image: </label>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="image"
              aria-label="Archivo"
              onChange={handleSkinImageChange}
              data-testid="file-input"
            />
            {skinImagePreview && (
              <img
                src={skinImagePreview}
                alt="Preview1"
                style={{
                  maxWidth: '60px',
                  maxHeight: '80px',
                  textAlign: 'center',
                }}
              />
            )}
          </div>
          <label htmlFor="collection_name">Collection name: </label>
          <input type="text" name="collections_name" required />
          <label htmlFor="image">Collection image: </label>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="collections_image"
              aria-label="Archivo"
              onChange={handleCollectionImageChange}
              data-testid="file-input2"
            />
            {collectionImagePreview && (
              <img
                src={collectionImagePreview}
                alt="Preview"
                style={{
                  maxWidth: '60px',
                  maxHeight: '80px',
                  textAlign: 'center',
                }}
              />
            )}
          </div>
          <label htmlFor="case_name">Case name: </label>
          <input type="text" name="case_name" required />
          <label htmlFor="image">Case image: </label>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="case_image"
              aria-label="Archivo"
              onChange={handleCaseImageChange}
              data-testid="file-input3"
            />
            {caseImagePreview && (
              <img
                src={caseImagePreview}
                alt="Preview"
                style={{
                  maxWidth: '60px',
                  maxHeight: '80px',
                  textAlign: 'center',
                }}
              />
            )}
          </div>
          <button className="button-add-skin" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
