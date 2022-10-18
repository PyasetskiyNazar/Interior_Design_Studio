import React, { useState } from 'react'
import * as Scroll from 'react-scroll'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {

  const scroller = Scroll.scroller
  const [active, setActive] = useState('Home')
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const handleNavigate = async (item) => {
    setActive(item)
    if (item === 'Products') {
      await navigate('/products')
      setTimeout(() => {
        scroller.scrollTo(item, {
          duration: 800,
          delay: 100,
          smooth: true,
          spy: true,
          offset: 0
        });
      }, 500);
    } else {
      await navigate('/home')
      setTimeout(() => {
        scroller.scrollTo(item, {
          duration: 800,
          delay: 100,
          smooth: true,
          spy: true,
          offset: 0
        });
      }, 500);
    }
  }

  return (

    <header className="header">
      <motion.div className="header_container app_container">
        <motion.div className="header_box">
          <div className="header_logo">
            <NavLink className="big_logo" to="/" onClick={() => handleNavigate('Home')}>
              Slava Design
          </NavLink>
            <NavLink className="small_logo" to="/" onClick={() => handleNavigate('Home')}>
              SD
          </NavLink>
          </div>
          <nav className="header_menu menu">

            <ul className="menu_list">
              {['Home', 'Products', 'Services', 'Contact', 'About Us'].map((item, index) => (
                <motion.li className="menu_item" key={item}>
                  <NavLink to={item === 'Products' ? '/products' : '/'}
                    className={`menu_link ${active === item && 'active_navbar-link'}`}
                    onClick={() => handleNavigate(item)}
                    animate="true"
                  >
                    {item === active && (
                      <motion.div
                        className="underline"
                        initial={{ opacity: 0, scale: 0.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    {item}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div className="app__navbar-menu">
              <HiMenuAlt4 onClick={() => setToggle(true)} />
              {
                toggle && (
                  <motion.div
                    whileInView={{ x: [250, 0] }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                  >
                    <HiX onClick={() => setToggle(false)} />
                    <ul className="app__navbar-links">
                      {['Home', 'Products', 'Services', 'Contact', 'About Us'].map(item => (
                        <li key={item}>
                          <NavLink to={item === 'Products' ? '/products' : '/'}
                            onClick={() => {
                              handleNavigate(item)
                              setToggle(false)
                            }}
                          >
                            {item}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
            </motion.div>
          </nav>
        </motion.div>
      </motion.div>
    </header>
  )
}

export default Navbar
