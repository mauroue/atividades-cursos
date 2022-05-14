
import profile from "../images/profile-photo.png";
import iconemail from "../images/icon-email.svg";
import iconlinkedin from "../images/icon-linkedin.svg";

export default function Info() {
    return (
        <div className="container">
            <img src={profile} alt="mauros face"></img>
            <h1 className="info--name">Mauro Ue</h1>
            <h4 className="info--job">Frontend Developer</h4>
            <p className="info--website">mauro.tech</p>
            <div className="info--buttons">
                <a href="mailto:mauroue@gmail.com" className="info--email">
                    <img src={iconemail} alt=""></img>
                    Email
                </a>
                <a href="https://www.linkedin.com/in/mauroue" className="info--linkedin">
                    <img src={iconlinkedin} alt=""></img>
                    Linkedin
                </a>
            </div>
        </div>
    )
}