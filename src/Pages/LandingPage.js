import React, { useState } from "react";
import PropTypes from "prop-types";
import { Octokit } from "@octokit/core";

import DropDown from "../Components/dorpdown/DropDown";
import LinkContainer from "../Components/api-layout/LinkContainer";
import { debouncedFunction } from "../common/util";
import { token } from "../data/githubToken";
import { sortDataList } from "../data/filterArray";

import "./index.css";

const LandingPage = () => {
  const [textInput, setTextInput] = useState("");
  const [sortData, setSortData] = useState("created");
  const [perPageData, setPerPageData] = useState("30");
  const [linksData, setLinksData] = useState([]);

  //new token oktokit
  const octokit = new Octokit({ auth: token });

  function handleInputChange(e) {
    setTextInput(e.target.value);
    getGithubRepoData(e.target.value);
  }

  const handleDropdownSelect = ({ e, id }) => {
    if (textInput === "") {
      alert("Please search before applying filters!");
      return;
    } else if (id === "sort_by") {
      setSortData(e.target.value);
      getGithubRepoData(textInput, e.target.value, perPageData);
    } else if (id === "page") {
      setPerPageData(e.target.value);
      getGithubRepoData(textInput, sortData, e.target.value);
    }
  };

  const getGithubRepoData = async (organistaion, sort, per_page) => {
    const response = await octokit.request(`GET /orgs/${organistaion}/repos`, {
      org: "octokit",
      sort: sort,
      per_page: per_page,
    });

    if (response.status === 200) {
      setLinksData(response?.data);
    } else {
      alert("there is no data for searched text");
    }
  };

  const debouncedSearchHandler = debouncedFunction(handleInputChange, 1000);

  return (
    <div className="flex-container">
      <form>
        <input
          type="text"
          placeholder="Enter Repo Name..."
          className="input-field"
          onChange={(e) => debouncedSearchHandler(e)}
        />
        <div className="flex-container1">
          <DropDown
            name="Sort By:"
            id="sort_by"
            menuItem={sortDataList}
            selectedValue={sortData}
            onSelectHandler={handleDropdownSelect}
          />
          <DropDown
            name="Page:"
            id="page"
            selectedValue={perPageData}
            menuItem={[30, 40, 50, 60]}
            onSelectHandler={handleDropdownSelect}
          />
        </div>
        <LinkContainer links={linksData} />
      </form>
    </div>
  );
};

LandingPage.propTypes = {
  search: PropTypes.object,
};

export default LandingPage;
