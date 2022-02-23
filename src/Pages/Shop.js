import React, { useContext, createContext, useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Topbar from '../Components/Topbar'
import ExportApis from '../API/ExportApis';
import { Link } from 'react-router-dom';

const UserContext = createContext();

export default function Shop() {

    const [Products, setProducts] = useState([]);
    let [fProducts, setfProducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [Cart, setCart] = useState([]);



    function Add(i) {


        const data = JSON.parse(localStorage.getItem("Cart"))
        console.log(data)
        // setAllcart([data])
        setCart(data ? [...data, i] : [...Cart, i])
         console.log(Cart)
        localStorage.setItem("Cart", JSON.stringify(data ? [...data, i] : [...Cart, i]))
        handeldata()
        const l = Cart.length + 1;

        localStorage.setItem("count", l)



    }

    const handeldata = () => {


        var counts = [];
        const cartdata = JSON.parse(localStorage.getItem("Cart"));
        // console.log(cart)
        const pair = { count: 1 }
        if (cartdata) {
            cartdata.map((i) => {
                // Price += i.price * i.count;
           
                counts = [...counts, { ...i, ...pair }]
            })

            setCart(counts ? [...counts] : [...Cart])
            localStorage.setItem("Cart", JSON.stringify(counts ? [...counts] : [...Cart]))
        }
        else {

        }
    }

    

    function getProducts() {
        ExportApis.getProduct().then((resp) => {
            if (resp.ok) {
                let Data = resp.data;
                setProducts(Data);
                setfProducts(Data);
            }
        });
    }
    useEffect(() => {
        getProducts();
    }, []);

    function getCat() {
        ExportApis.getCategories().then((resp) => {
            if (resp.ok) {
                let Data = resp.data;
                //  console.log("data", Data);
                setcategories(Data);


            }
        });
    }

    useEffect(() => {
        getCat();
    }, []);


    function handleCat(e) {

        if (e === "All") {
            setfProducts(Products);
        }
        else {
            let newdata = Products.filter((item) => item.category === e)
            setfProducts(newdata);
        }
    }

    function getCart() {
        let data = JSON.parse(localStorage.getItem("Cart"));
        setCart(data);
    }
    return (
        <>
            <Topbar />
            <Navbar />
            <div class="container-fluid pt-5">
                <div class="row px-xl-5">
                    {/* <!-- Shop Sidebar Start --> */}
                    <div class="col-lg-3 col-md-12">
                        {/* <!-- Price Start --> */}
                        <div class="border-bottom mb-4 pb-4">
                            <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
                            <form>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="text" class="custom-control-input" />
                                    <label class="custom-control-label" for="price-all">All Price</label>
                                    <span class="badge border font-weight-normal">1000</span>
                                </div>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" class="custom-control-input" id="price-1" />
                                    <label class="custom-control-label" for="price-1">$0 - $100</label>
                                    <span class="badge border font-weight-normal">150</span>
                                </div>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" class="custom-control-input" id="price-2" />
                                    <label class="custom-control-label" for="price-2">$100 - $200</label>
                                    <span class="badge border font-weight-normal">295</span>
                                </div>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" class="custom-control-input" id="price-3" />
                                    <label class="custom-control-label" for="price-3">$200 - $300</label>
                                    <span class="badge border font-weight-normal">246</span>
                                </div>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="checkbox" class="custom-control-input" id="price-4" />
                                    <label class="custom-control-label" for="price-4">$300 - $400</label>
                                    <span class="badge border font-weight-normal">145</span>
                                </div>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                    <input type="checkbox" class="custom-control-input" id="price-5" />
                                    <label class="custom-control-label" for="price-5">$400 - $500</label>
                                    <span class="badge border font-weight-normal">168</span>
                                </div>
                            </form>
                        </div>
                        {/* <!-- Price End -->
                
                <!-- Color Start --> */}
                        <div class="border-bottom mb-4 pb-4">
                            <h5 class="font-weight-semi-bold mb-4">Filter by  Categories </h5>
                            <form>
                                <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <span onClick={() => handleCat("All")} >All Category</span>

                                    <span class="badge border font-weight-normal"></span>
                                </div>
                                {

                                    categories.map((cat) => {
                                        return <>
                                            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                                <span value="electronics" onClick={() => handleCat(cat)} >{cat}</span>
                                                <span class="badge border font-weight-normal">{cat.count}</span>
                                            </div>
                                        </>

                                    })
                                }



                            </form>
                        </div>
                        {/* <!-- Color End --> */}

                        {/* <!-- Size Start --> */}
                        {/* <div class="mb-5">
                            <h5 class="font-weight-semi-bold mb-4">Filter by size</h5>
                         
                        </div> */}
                        {/* <!-- Size End --> */}
                    </div>
                    {/* <!-- Shop Sidebar End --> */}


                    {/* <!-- Shop Product Start --> */}
                    <div class="col-lg-9 col-md-12">
                        <div class="row pb-3">
                            <div class="col-12 pb-1">
                                <div class="d-flex align-items-center justify-content-between mb-4">
                                    <form action="">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search by name" />
                                            <div class="input-group-append">
                                                <span class="input-group-text bg-transparent text-primary">
                                                    <i class="fa fa-search"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="dropdown ml-4">
                                        <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Sort by
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                            <a class="dropdown-item" href="#">Latest</a>
                                            <a class="dropdown-item" href="#">Popularity</a>
                                            <a class="dropdown-item" href="#">Best Rating</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {fProducts.map((product) => {
                                return <>
                                    <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                                        <div class="card product-item border-0 mb-4">
                                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                <img class="img-fluid w-100" src={product.image} alt="" style={{ height: "350px" }} />
                                            </div>
                                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                <h6 class="text-truncate mb-3">{product.title}</h6>
                                                <div class="d-flex justify-content-center">
                                                    <h6>${product.price}</h6><h6 class="text-muted ml-2"><del></del></h6>
                                                </div>
                                            </div>
                                            <div class="card-footer d-flex justify-content-between bg-light border">
                                                <Link to={`/Detail/${product.id}`} class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                                {/* <a href="" class="btn btn-sm text-dark p-0"  ><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a> */}
                                                <button onClick={() => Add(product)} >Add to cart </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })

                            }

                        </div>
                    </div>
                    {/* <!-- Shop Product End --> */}
                </div>
            </div>
            <Footer />
        </>
    )
}
