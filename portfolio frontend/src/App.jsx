import React from 'react'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Experiences from './sections/Experiences.jsx'
import Projects from './sections/Projects.jsx'

const App = () => {
  return (
    <SmoothScroll>
      <div className='container mx-auto max-w-7xl'>
        <Navbar/>
        <Hero />
        <About />
        <Projects />
        <Experiences />
        <section className='min-h-screen'/>
        <section className='min-h-screen'/>
      </div>
    </SmoothScroll>
  )
}

export default App;

