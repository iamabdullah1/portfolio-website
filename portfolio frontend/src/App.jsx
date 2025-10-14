import React from 'react'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Experiences from './sections/Experiences.jsx'
import Projects from './sections/Projects.jsx'
import Testimonial from './sections/Testimonial.jsx'
// import Contact from './sections/Contact.jsx' // Removed for Upwork compliance and
import Footer from './sections/Footer.jsx'

const App = () => {
  return (
    <SmoothScroll>
      <div className='container mx-auto max-w-7xl'>
        <Navbar/>
        <Hero />
        <About />
        <Experiences />
        <Projects />
        <Testimonial />
        {/* <Contact /> */} {/* Removed for Upwork compliance */}
        <Footer />
    
      </div>
    </SmoothScroll>
  )
}

export default App;

