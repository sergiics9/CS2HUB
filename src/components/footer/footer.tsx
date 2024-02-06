import './footer.scss';

export function Footer() {
  return (
    <footer>
      <p className="footer--first-content">
        CS2 HUB and CSGO HUB © 2014-2023. Powered by Steam.
      </p>

      <div className="text-and-social-media-imgs-container">
        <p>Design made by Sergi Casiano</p>
        <div className="social-media-imgs-container">
          <div className="container--instagram-img">
            <a href="https://www.instagram.com/">
              {' '}
              <img
                src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_17/v1702035293/CS2%20STASH/zhimsms1jfj7hpqiqkfb.webp"
                alt="Instagram logo"
              />
            </a>
          </div>
          <div className="container--twitter-img">
            <a href="https://twitter.com/home">
              {' '}
              <img
                src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_17/v1702035291/CS2%20STASH/pw96qxvu9iwecrnqc1wk.webp"
                alt="Twitter logo"
              />
            </a>
          </div>
          <div className="container--steam-img">
            <a href="https://store.steampowered.com/?l=spanish">
              {' '}
              <img
                src="https://res.cloudinary.com/dbhsorjvc/image/upload/h_17/v1702035341/CS2%20STASH/mgtk6taum5rbkx8loy78.webp"
                alt="Steam logo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
