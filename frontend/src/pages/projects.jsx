import React, { useState } from "react";
import "../styles/projects.css";
import {
  BsFillCaretDownFill,
  BsGithub,
  BsFillCaretRightFill,
} from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { languageFilterList } from "../assets/js/languageFlter";
// import projectimg from "../imgs/project-img.png";
import { projectData } from "../data";
import { useEffect } from "react";
function Projects() {
  const [repeat, setRepeat] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [languages, setLanguages] = useState([]);
  const [projects, setProjects] = useState([]);

  let formattedLangs = [];

  const updateFilter = () => {
    formattedLangs = languages.map((langa) => {
      return langa.split(" ").join("_").toLowerCase();
    });

    formattedLangs.length > 0 &&
      setProjects(
        projects.filter((e) =>
          formattedLangs.every((val) => e.languages.includes(val))
        )
      );

    formattedLangs.length > 0 && console.log("info ", formattedLangs);

    console.log("languages altered ");

    console.log("filteredLangs ", formattedLangs);
  };

  const updateFilter1 = () => {
    setProjects(projectData);
  };

  useEffect(() => {
    updateFilter();
  }, [languages]);

  const setLanguage = (lang) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((e) => e !== lang));

      updateFilter1();
    } else {
      setLanguages([...languages, lang]);
    }
  };

  useEffect(() => {
    setProjects(projectData);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSideNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="body">
        <div className="left-wing">
          <div className="left-wing-top">
            <div className="left-wing-top-inner"></div>
            <div className="page-title-container">
              <div
                className="projects-page-title"
                onClick={() => console.log(languages)}
              >
                {languages.length != 0 ? languages.join("; ") : "all"}
              </div>
              {/* <div className="projec/ts-page-title">{languages.length != 0 ? languages.map(lang => <div>{lang};</div>) : "all"}</div> */}
            </div>
          </div>
          <div className="left-wing-body">
            <div className="max-width">
              <section className="projects-body">
                {projects.length > 0 ? (
                  projects.map((data, i) => (
                    <div className="projects-info" key={i}>
                      <div className="project-name">
                        <span>Project {i + 1} //</span>{" "}
                        <span
                          style={{
                            textTransform: "lowercase",
                            color: "#FFFFFF",
                          }}
                        >{`_${data.projectName}`}</span>
                      </div>
                      <div className="project-card">
                        <div className="project-image">
                          <img
                            src={data.image}
                            alt="project-img"
                            className="project-img"
                          />
                        </div>
                        <div className="project-info">{data.projectInfo}</div>
                        <div className="project-links">
                          <a href={data.livePreview} target="_blank">
                            <div className="live-preview">
                              <div>View Project here</div>
                              <div>
                                {/* <GrNext className="next-btn" color="#fff"/> */}
                                <MdOutlineNavigateNext
                                  className="next-btn"
                                  color="#fff"
                                  size={25}
                                />
                              </div>
                            </div>
                          </a>

                          <div className="git-preview" target="_blank">
                            <a href={data.githubLink}>
                              <BsGithub
                                style={{ cursor: "pointer" }}
                                size={20}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="not-found-container">
                    <div className="project-open-tag">
                      &lt;
                      <span className="white-tag-text">
                        <span style={{ color: "#FFBD44" }}>h1</span>
                      </span>
                      &gt;
                    </div>
                    <span className="not-found-text">
                      Sorry, match not found !
                    </span>
                    <div className="project-close-tag">
                      &lt;
                      <span className="white-tag-text">
                        /<span style={{ color: "#FFBD44" }}>h1</span>
                      </span>
                      &gt;
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
        <div className="right-wing">
          <div className="right-wing-top">
            <div className="right-wing-top-inner"></div>
            <div>
              <div className="sidebar-title" onClick={toggleSideNav}>
                {sidebarOpen ? (
                  <BsFillCaretDownFill size={20} />
                ) : (
                  <BsFillCaretRightFill size={20} />
                )}
                &nbsp;projects
              </div>
              <div
                className={`sidebar-body-project ${
                  sidebarOpen ? "opened" : "closed"
                }`}
              >
                <div className="sidebar">
                  {languageFilterList.map((data, i) => (
                    <div className="social-media-project" key={i}>
                      <div className="flex-align">
                        <label className="label">
                          <input
                            type="checkbox"
                            onChange={() => {
                              setLanguage(data.name);
                            }}
                          />
                          &nbsp;
                          {data.icon}
                          &nbsp;{data.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
