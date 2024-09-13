import React, { useState } from "react";
import userMenuData from "../../helpers/data/user-menu.json";
import { useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import "./user-menu.scss";

const UserMenu = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const handleClose = () => setShowMenu(false);
  const handleOpen = () => setShowMenu(true);

  return (
    <>
      <div className="user-menu">
        {isUserLogin ? (
          <>
            <Button variant="primary" size="sm">
              {user.name}
            </Button>

            <Offcanvas show={showMenu} onHide={handleOpen}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements
                you have chosen. Like, text, images, lists, etc.
              </Offcanvas.Body>
            </Offcanvas>
          </>
        ) : (
          <Link to="/login">
            <AiFillLock /> Login
          </Link>
        )}
      </div>
    </>
  );
};

export default UserMenu;
