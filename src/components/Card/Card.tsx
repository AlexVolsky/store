import React, {useEffect, useState, ChangeEvent} from 'react';
import { ICardProducts } from './interface';
import http from '../../http';
import './cards.css';
import AddNewCard from './AddNewCard';
import Loader from '../Loader/Loader';




const CardProduct = () => {
    const [arrProducts, setArrProducts] = useState<ICardProducts[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => { getAllProducts()}, []);

    
        const getAllProducts = async () => {
            try {
                const responseData = await http.get('/products');
                const products = responseData.data;
                console.log(arrProducts)
                setArrProducts(products);
                
            } catch (err) {
                alert(err);
                console.log(arrProducts)
            }
        };

        const deleteProduct = async (id: number) => {
            const confirm = window.confirm('Do you want delete this product?');
            if (confirm) {
                const deleteProduct = await http.delete(`/products/${id}`);

                if (deleteProduct.status === 200) {
                    setArrProducts(arrProducts.filter(product => product.id !== id));
                    console.log(deleteProduct.status);
                }
            }
        }




    return (
        <>
         <div className='btn btn-primary btn-add-product' onClick={()=>{setShowAddForm(!showAddForm)}}>Add product</div>
         
         { arrProducts.length ? arrProducts.map(product =>
                    <div className="card mb-3" style={{maxWidth: '740px', border: '2px solid black'}}  key={product.id}>
                        <div className="row g-0">
                            <div className="col-md-4 d-flex justify-content-center align-items-center" >
                                <img src={product.image} className="img-fluid rounded-start" alt="img" style={{width: '220px', maxHeight: '300px'}} />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">{product.title}</h2>
                                <p className="card-text">{product.category}</p>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">полученные быллы: {product.rating.count}</p>
                                <p className="card-text">рейтинг: {product.rating.rate}</p>
                                <p className="card-text"><small className="text-muted">цена: {product.price} $</small></p>
                            </div>
                            </div>
                        </div>
                        <div className='close-button'><span 
                                                            className="badge rounded-pill text-bg-danger"
                                                            onClick={() => deleteProduct(product.id)}>&#10060;
                                                    </span></div>
                    </div>
            ) : < Loader />}

            <AddNewCard arrProducts={arrProducts} setArrProducts={setArrProducts} setShowAddForm={setShowAddForm} showAddForm={showAddForm}/>
            
        </>
       
       
    );
};

export default CardProduct;