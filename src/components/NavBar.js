import React, { useState } from 'react';
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const [selectedCountry, setSelectedCountry] = useState('us'); // Default to 'us'

    const handleCountryChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCountry(selectedValue);
        props.onCountryChange(selectedValue); // Callback to parent to update the country
    };

    const countryList = [
        { code: 'ar', name: 'Argentina' },
        { code: 'au', name: 'Australia' },
        { code: 'at', name: 'Austria' },
        { code: 'be', name: 'Belgium' },
        { code: 'br', name: 'Brazil' },
        { code: 'bg', name: 'Bulgaria' },
        { code: 'ca', name: 'Canada' },
        { code: 'cn', name: 'China' },
        { code: 'co', name: 'Colombia' },
        { code: 'cu', name: 'Cuba' },
        { code: 'cz', name: 'Czech Republic' },
        { code: 'eg', name: 'Egypt' },
        { code: 'fr', name: 'France' },
        { code: 'de', name: 'Germany' },
        { code: 'gr', name: 'Greece' },
        { code: 'hk', name: 'Hong Kong' },
        { code: 'hu', name: 'Hungary' },
        { code: 'in', name: 'India' },
        { code: 'id', name: 'Indonesia' },
        { code: 'ie', name: 'Ireland' },
        { code: 'il', name: 'Israel' },
        { code: 'it', name: 'Italy' },
        { code: 'jp', name: 'Japan' },
        { code: 'lv', name: 'Latvia' },
        { code: 'lt', name: 'Lithuania' },
        { code: 'my', name: 'Malaysia' },
        { code: 'mx', name: 'Mexico' },
        { code: 'ma', name: 'Morocco' },
        { code: 'nl', name: 'Netherlands' },
        { code: 'nz', name: 'New Zealand' },
        { code: 'ng', name: 'Nigeria' },
        { code: 'no', name: 'Norway' },
        { code: 'ph', name: 'Philippines' },
        { code: 'pl', name: 'Poland' },
        { code: 'pt', name: 'Portugal' },
        { code: 'ro', name: 'Romania' },
        { code: 'ru', name: 'Russia' },
        { code: 'sa', name: 'Saudi Arabia' },
        { code: 'rs', name: 'Serbia' },
        { code: 'sg', name: 'Singapore' },
        { code: 'sk', name: 'Slovakia' },
        { code: 'si', name: 'Slovenia' },
        { code: 'za', name: 'South Africa' },
        { code: 'kr', name: 'South Korea' },
        { code: 'se', name: 'Sweden' },
        { code: 'ch', name: 'Switzerland' },
        { code: 'tw', name: 'Taiwan' },
        { code: 'th', name: 'Thailand' },
        { code: 'tr', name: 'Turkey' },
        { code: 'ae', name: 'UAE' },
        { code: 'ua', name: 'Ukraine' },
        { code: 'gb', name: 'United Kingdom' },
        { code: 'us', name: 'United States' },
        { code: 've', name: 'Venezuela' }
    ];

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Daily Stream</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                        </ul>

                        {/* Country Dropdown */}
                        <div className="dropdown">
                            <select className="form-select" value={selectedCountry} onChange={handleCountryChange}>
                                {countryList.map((country) => (
                                    <option key={country.code} value={country.code}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
