import { logout } from "@/lib/actions"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

async function page() {
  const sesion = await auth()

  if (sesion) {
    return (
      <main className="contenido">
        <h2 style={{ marginTop: '5%' }}>Cerrar sesión</h2>
        <form className="user-form">
          <button formAction={logout} className="logout">
            <img src="/logout.svg" alt="Exit" /> Cerrar sesión
          </button>
        </form>
      </main>
    )
  }
  else {
    redirect('/auth/login')
  }
}

export default page