import facebook from "../images/Facebook Icon.svg";
import github from "../images/GitHub Icon.svg";
import instagram from "../images/Instagram Icon.svg";
import twitter from "../images/Twitter Icon.svg";

export default function Footer() {
    return (
        <section className="footer">
            <img src={twitter} alt=""></img>
            <img src={facebook} alt=""></img>
            <img src={instagram} alt=""></img>
            <img src={github} alt=""></img>
        
        </section>
    )
}