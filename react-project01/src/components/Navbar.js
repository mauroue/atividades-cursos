import logo from '../images/react-icon-small.png';

export default function Navbar() {
    return (
        <nav className="container">
            <img className="nav--icon" src={logo} alt="react logo, looks like an atom"></img>
            <h3 className="nav--logo_text">ReactFacts</h3>
            <h4 className="nav--title">React Course - Project 1</h4>
        </nav>
    );
}