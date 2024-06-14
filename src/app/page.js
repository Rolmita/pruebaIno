import Navbar from "../components/Menu";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/data";

const Home = async () => {

  return (
    <main>
      <div className='nav-section-page' style={{ display: 'flex', flexDirection: 'row' }}>
        <Navbar></Navbar>
      </div>
    </main>
  )
}

export default Home;

