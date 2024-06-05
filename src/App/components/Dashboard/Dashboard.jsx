import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='dash_list_ajn'>
                <ul>
                    <li onClick={() => navigate('/customer')} className='cusrt_pointer'>
                        Customer
                    </li>
                    <li onClick={() => navigate('/bill')} className='cusrt_pointer'>
                        Bill
                    </li>
                </ul>
            </div>
        </div>
    )
}
