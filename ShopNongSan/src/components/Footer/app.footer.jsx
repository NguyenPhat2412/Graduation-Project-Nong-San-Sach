import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const AppFooter = () => {
  const [footerData, setFooterData] = useState([]);
  const [logo, setLogo] = useState({});

  // Fetch footer data
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/api/client/footer`
        );
        const data = await response.json();
        // console.log("Footer data:", data.sections);
        setFooterData(data.sections);
        setLogo(data.brand);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4 d-flex gap-5">
        <div className="row w-25">
          <div className="col">
            <img
              src="../../../public/Image/Logo/Group.png"
              alt="Logo"
              className="img-fluid"
            />
            <p className="fw-bold fs-5">{logo.title}</p>
            <p className="text-muted">{logo.description}</p>
          </div>
        </div>
        <div className="row text-start w-75">
          {footerData.map((item, index) => (
            <div className="col-12 col-sm-4" key={index}>
              <h5>{item.title}</h5>
              <ul className="list-unstyled">
                {item.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="text-dark">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center p-3 text-white">
        <img src="../../../public/Footer/logobank.png" alt="Footer Logo" />
      </div>
    </footer>
  );
};

export default AppFooter;
