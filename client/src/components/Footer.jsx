import { Image } from 'mui-image'
import logo from '../logo.png'


const Footer = () => {
    return (
        <>
            <div className="footer">
                <p><Image src={logo} style={{ width: '20px', height: 'auto' }}/>© 2023 All Rights Reserved</p>
            </div>
        </>
    )
}

export default Footer