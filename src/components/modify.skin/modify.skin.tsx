import { SyntheticEvent, useEffect, useState } from 'react';
import './modify.skin.scss';
import { useSkins } from '../../hooks/skins/use.skins';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function ModifySkin() {
  const { currentSkin, updateSkin } = useSkins();
  const navigate = useNavigate();

  const [skin, setSkin] = useState(currentSkin);
  const [skinImagePreview, setModifiedSkinImagePreview] = useState<
    string | null
  >(null);
  const [collectionImagePreview, setModifiedCollectionImagePreview] = useState<
    string | null
  >(null);
  const [caseImagePreview, setModifiedCaseImagePreview] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSkin(currentSkin);
  }, [currentSkin]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSkin((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleModifySkinImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModifiedSkinImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModifyCollectionImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModifiedCollectionImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModifyCaseImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModifiedCaseImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModifySkin = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    updateSkin(skin!.id, formData);
    Swal.fire({
      title: 'Modified!',
      text: 'Your skin has been updated.',
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
        <h3>Modify Skin</h3>
      </div>

      <div className="modify-skin-form">
        <form onSubmit={handleModifySkin} aria-label="form">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={skin?.name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="rarity">Rarity: </label>
          <select
            name="rarity"
            id="rarity"
            value={skin?.rarity}
            onChange={handleInputChange}
          >
            <option value="Covert">Covert</option>
            <option value="Mil-Spec Grade">Mil-Spec Grade</option>
            <option value="Extraordinary">Extraordinary</option>
            <option value="Restricted">Restricted</option>
            <option value="Classified">Classified</option>
          </select>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={skin?.category}
            onChange={handleInputChange}
          >
            <option value="Rifle">Rifle</option>
            <option value="SMG">SMG</option>
            <option value="Pistol">Pistol</option>
            <option value="Knife">Knife</option>
            <option value="Glove">Glove</option>
          </select>
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            value={skin?.price}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            value={skin?.description}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="image">Skin image: </label>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="image"
              aria-label="Archivo"
              onChange={handleModifySkinImageChange}
              data-testid="file-inputt1"
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
          <input
            type="text"
            name="collections_name"
            value={skin?.collections_name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="image">Collection image: </label>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="collections_image"
              aria-label="Archivo"
              onChange={handleModifyCollectionImageChange}
              data-testid="file-inputt2"
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
          <input
            type="text"
            name="case_name"
            required
            value={skin?.case_name}
            onChange={handleInputChange}
          />
          <label htmlFor="image">Case image: </label>
          <div className="file-select" id="src-file1">
            <input
              type="file"
              name="case_image"
              aria-label="Archivo"
              onChange={handleModifyCaseImageChange}
              data-testid="file-inputt3"
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
          <button className="button-modify-skin" type="submit">
            Modify
          </button>
        </form>
      </div>
    </>
  );
}
