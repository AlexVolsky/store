import React, {ChangeEvent, useState, FormEvent, useEffect} from 'react';
import http from '../../http';
import { ICardProducts } from './interface';

const AddNewCard = ({arrProducts, setArrProducts, showAddForm, setShowAddForm}: {
                arrProducts: ICardProducts[], 
                setArrProducts: React.Dispatch<ICardProducts[]>, 
                showAddForm: boolean,
                setShowAddForm: React.Dispatch<boolean>
            }) => {
const inicelisetionProducts = {
    category: '', 
    description: '', 
    id: 0, 
    image: '',
    price: '',
    title: '' 

}

/*   */
 const [productCard, setProductCard] = useState<any>(inicelisetionProducts);

const postNewProduct = async() =>{
    try{ 
        const responseData = await http.post('/products', productCard);
        console.log(responseData.status);
       /*  setArrProducts([...arrProducts, responseData.data]); */
        

    } catch (err){
        
            alert(err);
    }
}

const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field: string = event.target.id;
    setProductCard({...productCard,[field]: event.target.value})
    console.log(productCard)
}

const addProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postNewProduct();
        setProductCard({...productCard, ...inicelisetionProducts} );
        setShowAddForm(false);
        console.log(productCard);

}

    
    
    return (
        <div>
           
            <div className={!showAddForm ? 'modal add-modal-card' : 'modal add-modal-card show'}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setShowAddForm(false)}}/>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={event => addProduct(event)}>
                            <>
                                {Object.keys(inicelisetionProducts).reverse().map(field => {
                                    if(field === "rating")return;
                                    return <input type="text" 
                                        required
                                        className='form-control my-2'
                                        key={field}
                                        id={field}
                                        value={productCard[field]} 
                                        placeholder={`Input product ${field}`} 
                                        onChange={(event) => {onChange(event)}}
                                   />
                                })}
                            </>
                           
                            
                            <button className='btn btn-primary' type='submit'>Add Product</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            
        </div>
    );
};

export default AddNewCard;