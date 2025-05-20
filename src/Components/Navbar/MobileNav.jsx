import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { closeMobileNav, menuBtn, openMobileNav } from './navbar.animate'
import './Navbar.css'
import { useNavigateTo } from '../../Hooks/navbar.hooks'

function MobileNav() {

    const [openMenu, setOpenMenu] = useState(false)
    const handleMenu = () => setOpenMenu(previous => !previous)

    const btnRef = useRef()
    const divRef = useRef()
    const { contextSafe } = useGSAP(() => { menuBtn(btnRef) }, [])
    const navigate = useNavigateTo() // Hook used to navigate

    useEffect( () => {

        // I want to animate manu bar on it adding into DOM, and it is added according to openMenu state
        // It is not possible to animate the menu just after the state value changes,
        // because state updation works asynchrounously
        // So I should do it in here, whenever the opanState value changed asynchrounously
        if( openMenu ) contextSafe( () => openMobileNav( divRef ) )()

    }, [ openMenu ] )

    // In here, the menu div is removed from DOM so I cant animate an element which is not in DOM
    // So perform the closing animation first then remove it from DOM
    const handleCloseDiv = () => contextSafe( () => closeMobileNav( divRef, setOpenMenu ) )()

    return (

        <>

            {!openMenu && <button ref={btnRef} onClick={handleMenu} className='nav-menu-button'>Menu</button>}

            {openMenu &&

                <section id='display-nav-items' ref={ divRef } >

                    <section id="upper">

                        <p>CAPSULES</p>
                        <button onClick={ handleCloseDiv } className='nav-menu-button white'>Close</button>

                    </section>
                    <section id="lower">

                        <p onClick={ () => navigate('landing') }>Home</p>
                        <p onClick={ () => navigate('') }>Find other homes</p>
                        <p onClick={ () => navigate('') }>Medicines</p>
                        <p onClick={ () => navigate('') }>About</p>
                        <p onClick={ () => navigate('') }>Profile</p>
                        <p onClick={ () => navigate('') }>Notification <i className='bx bx-bell' /></p>

                    </section>

                </section>

            }

        </>

    )

}

export default MobileNav