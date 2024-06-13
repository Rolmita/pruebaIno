import RegisterForm from '@/components/register-form'


function page() {
  return (
    <section className='auth-section' >
      <div className="form">
        <h1>Sign up for MyChartBoard</h1>
        <RegisterForm />
      </div>
    </section>
  )
}

export default page