import PropTypes from "prop-types";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { Button } from "antd";

const ToggleThemeButton = ({ darkTheme, ToggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={ToggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

ToggleThemeButton.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  ToggleTheme: PropTypes.func.isRequired,
};

export default ToggleThemeButton;
