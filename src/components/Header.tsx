// LOGO SOURCE
const logo: string = require("../images/Full-Logo.svg").default;

const Header = () => {
  return (
    <div className="header">
      <figure className="Logo">
        <img src={logo} alt="Logo" />
      </figure>
    </div>
  );
};

export default Header;
