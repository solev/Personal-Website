import { faDev, faGithub, faLinkedin, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './social-links.module.css';

const SocialLinks = () => {
  const emailMailTo = `mailto:martin_solev@hotmail.com`;
  return (
    <div className={classes.SocialLinks}>
      <ul>
        <li>
          <a href={emailMailTo} rel="noopener noreferrer" target="_blank">
            <em className="fas fa-paper-plane"></em>
            <FontAwesomeIcon icon={faPaperPlane} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/solev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/martin-solev-a09b0061/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </li>
        {/* <li>
          <a
            href="https://www.xing.com/profile/Patrick_Schadler2/cv"
            rel="noopener noreferrer"
            target="_blank"
          >
            <em className="fab fa-xing-square"></em>
          </a>
        </li> */}
        <li>
          <a
            href="https://twitter.com/MartinSolev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a
            href="https://dev.to/martinsolev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faDev} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
