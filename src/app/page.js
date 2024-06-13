import Navbar from "../components/NavBar";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/data";

const Home = async () => {

  return (
    <main>
      <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
        <Navbar></Navbar>
        <nav className='nav-section-page' style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Link className='route-link' href='/'><h1>MyChartBoard</h1></Link>
          </div>
        </nav>
      </div>
    </main>
  )
}

export default Home;

