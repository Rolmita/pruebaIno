import { logout } from "@/lib/actions"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

async function page() {
  const sesion = await auth()

  if (sesion) {
    return (
      <section className='auth-section' >
        <h2 style={{ marginTop: '5%' }}>Cerrar sesión</h2>
        <form className="user-form">
          <button formAction={logout} className="logout button btn-dropdown">
           Logout
          </button>
        </form>
      </section>
    )
  }
  else {
    redirect('/auth/login')
  }
}

export default page