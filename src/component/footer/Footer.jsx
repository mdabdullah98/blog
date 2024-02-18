import React from "react";

import "./footer.css";

import listItem from "./index";
import { Logo } from "../index";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="copyright-brand">
          <Logo />
          <p>@Copyright reserver Dev UI</p>
        </div>
        <div className="footer-content">
          {listItem.map((item) => (
            <React.Fragment key={item.id}>
              <ul>
                <li>
                  <h2>{item.heading}</h2>
                </li>
                <li>{item.list_item_1}</li>
                <li>{item.list_item_2}</li>
                <li>{item.list_item_3}</li>
                <li>{item.list_item_4}</li>
              </ul>
            </React.Fragment>
          ))}
          ;
        </div>
      </footer>
    </>
  );
};

export default Footer;
