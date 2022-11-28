import React from "react";
import PropTypes from "prop-types";

import "./link-container.css";

const LinkContainer = ({ links }) => {
  return (
    <div className="list-container">
      {links.length ? (
        links.map((data, idx) => (
          <a
            href={data?.html_url}
            key={`links_${idx}`}
            className="links-container"
          >
            {data?.html_url}
          </a>
        ))
      ) : (
        <span>Search something to show!</span>
      )}
    </div>
  );
};

LinkContainer.propTypes = {
  links: PropTypes.array,
};

export default LinkContainer;
