import React from 'react';

const Loader = () => {
    return (
      
        <div className='d-flex h-100 w-100  justify-content-center align-items-center'>
            <div className="spinner-border" style={{width: '4rem', height: '4rem',}} role="status">
                                    <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
      
                    
        
    );
};

export default Loader;