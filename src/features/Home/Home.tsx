import CardProductList from "../../components/CardProduct/CardProductList";
import NavbarDefault from "../../components/Navbar/NavbarDefault";

export default function Home(){
    return(
        <div className="home" >
            <CardProductList />
            <NavbarDefault />
        </div>
    )
}