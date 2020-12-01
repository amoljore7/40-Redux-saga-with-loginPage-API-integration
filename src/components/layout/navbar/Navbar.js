// import React, { useState } from "react";
// import "./navbar.scss";
// import { Link, withRouter } from "react-router-dom";
// import { Layout, Menu, Dropdown, Drawer } from "antd";
// import {
//   UserOutlined,
//   DownOutlined,
//   MenuOutlined,
//   PieChartOutlined,
// } from "@ant-design/icons";
// import acme from "../../../images/acme.png";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { userLogout } from "../../../actions/auth/authActions";
// const { Header } = Layout;

// const Navbar = (props) => {
//   const menuList = [
//     {
//       name: "Employee",
//       icon: <PieChartOutlined />,
//       link: "/dashboard",
//     },
//     {
//       name: "Home",
//       icon: <PieChartOutlined />,
//       link: "/home",
//     },
//   ];
//   const [visible, setVisible] = useState(false);
//   const onClose = () => {
//     setVisible(!visible);
//   };
//   const logout = () => {
//     props.userLogout();
//     props.history.push("/");
//   };

//   const { auth } = props;
//   const menu = (
//     <Menu>
//       {/* <Menu.Item>
//         <span>Profile</span>
//       </Menu.Item> */}
//       <Menu.Item id="user-logout">
//         <span onClick={logout}>Log out</span>
//       </Menu.Item>
//     </Menu>
//   );
//   return (
//     auth.isAuthenticated && (
//       <Layout>
//         <Header className="header" style={{ height: "65px" }}>
//           <MenuOutlined className="menu-icon" onClick={onClose} />
//           <div style={{ padding: "6px 0 0 0", marginLeft: "20px" }}>
//             <img width="80" height="50" src={acme} />
//           </div>

//           <Dropdown overlay={menu} className="login-user">
//             <a
//               className="ant-dropdown-link"
//               onClick={(e) => e.preventDefault()}
//             >
//               <UserOutlined className="user-logo" /> {auth.user.user}{" "}
//               <DownOutlined />
//             </a>
//           </Dropdown>
//         </Header>
//         <Drawer
//           title="Menu"
//           placement="left"
//           closable={true}
//           onClose={onClose}
//           visible={visible}
//           mask={true}
//         >
//           <Menu mode="inline" defaultSelectedKeys={["0"]}>
//             {menuList.map((menu, index) => (
//               <Menu.Item key={index}>
//                 <Link to={menu.link} onClick={onClose}>
//                   {menu.icon} {menu.name}
//                 </Link>
//               </Menu.Item>
//             ))}
//           </Menu>
//         </Drawer>
//       </Layout>
//     )
//   );
// };

// Navbar.propTypes = {
//   auth: PropTypes.object.isRequired,
//   userLogout: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { userLogout })(withRouter(Navbar));
import React from "react";
import { connect } from "react-redux";
import { userLogout } from "../../../actions/auth/authActions";
import { Link, withRouter } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navbar: {
    width: "100%",
    overflow: "auto",
  },
  navbarLink: {
    float: "left",
    padding: "12px",
    color: "white",
    fontSize: "17px",
  },
  active: {
    backgroundColor: "#4CAF50",
  },
}));

const Navbar = (props) => {
  const { auth } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logout = () => {
    props.userLogout();
    props.history.push("/");
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          logout();
          handleMenuClose();
        }}
      >
        Log Out
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          logout();
          handleMenuClose();
        }}
      >
        Log Out
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            TaleNavigation 2.0
          </Typography>

          <div className={classes.grow}>
            <Link to="/home" className={classes.navbarLink}>
              <i className="fa fa-fw fa-home"></i> Home
            </Link>
            <Link to="/dashboard" className={classes.navbarLink}>
              <i className="fa fa-fw fa-search"></i> Dashboard
            </Link>
            <Link to="/patients" className={classes.navbarLink}>
              <i className="fa fa-fw fa-envelope"></i> Patients
            </Link>
            <Link to="/resources" className={classes.navbarLink}>
              <i className="fa fa-fw fa-user"></i> Resources
            </Link>
            <Link to="/analytics" className={classes.navbarLink}>
              <i className="fa fa-fw fa-user"></i> Analytics
            </Link>
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              {auth.user.user}
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userLogout })(withRouter(Navbar));
