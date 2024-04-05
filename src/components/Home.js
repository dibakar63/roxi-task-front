import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";


const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [input, setInput] = useState("");
    const [value, setValue] = useState("All data");

    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchData = async () => {
        try {
            //const url="http//localhost:3001/api/v1/get"
            const response = await axios.get("https://roxi-task-back.onrender.com/api/v1/get");
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = () => {
        const filtered = data.filter(item => item.category.toLowerCase() === input.toLowerCase());
        setData(filtered);
    };
    let sold=0;
    let unsold=0;
    for(let i=0;i<data.length;i++){
        if(data[i].sold ){
            sold++;
        }else{
            unsold++;
        }
    }
    let count1=0;
    let count2=0;
    let count3=0;
    let count4=0;
    let count5=0;
    let count6=0;
    let count7=0;
    let count8=0;
    let count9=0;
    for(let i=0;i<data.length;i++){
        if(data[i].price>0 && data[i].price<=100){
            count1++;
        }
        else if(data[i].price>100 && data[i].price<=200){
            count2++;
        }
        else if(data[i].price>200 && data[i].price<=300){
            count3++;
        }
        else if(data[i].price>300 && data[i].price<=400){
            count4++;
        }
        else if(data[i].price>400 && data[i].price<=500){
            count5++;
        }
        else if(data[i].price>500 && data[i].price<=600){
            count6++;
        }
        else if(data[i].price>600 && data[i].price<=700){
            count7++;
        }
        else if(data[i].price>700 && data[i].price<=800){
            count8++;
        }
        else if(data[i].price>900 ){
            count9++;
        }
    }
    const chartData={
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
                name:"Price",
                labels:{rotate : -45 },
              categories: [100, 200, 300, 400, 500, 600, 700, 800, 900]
            }
          },
          series: [
            {
              name: "No of Prudcts",
              data: [count1, count2, count3, count4, count5, count6, count7, count8,count9]
            }
          ]

    }
    let value1;

    let filterByYearMonth = (value) => {
        setValue(value)
      if (value === 'All data') {
          // Fetch current month's data
          fetchData();
      } else if (value === "2022-5") {
          // Handle custom logic
          console.log(value)
          let [year, month] = value.split('-');
          let filtered = data.filter(item => {
              let [day, mon, yr] = item.dateOfSale.split('-').map(Number);
              return yr === parseInt(year) && mon === parseInt(month);
          });
          setData(filtered);
      } else {
          let [year, month] = value.split('-');
          let filtered = data.filter(item => {
              let [day, mon, yr] = item.dateOfSale.split('-').map(Number);
              return yr === parseInt(year) && mon === parseInt(month);
          });
          setData(filtered);
      }
      setTimeout(()=>{
      if(data.length == 0){
    
       return value="1" && window.location.reload()
      }
    },3000)
    
      
  };
    // if(data.length == 0){
    //      window.location.reload();
    //   }

  console.log(value1)

    return (
        <div>
        
            <input className='input' type='text' placeholder='find category' onChange={(e) => setInput(e.target.value)} />
            <button className='btn btn-success' onClick={filteredData} style={{height:"49px",marginLeft:"2px",width:"90px",marginBottom:"2px"}}>Filter</button>

            <select className='h-20 overflow-y' onChange={(e) => filterByYearMonth(e.target.value)} style={{height:"49px",marginLeft:"10px"}} >

                <option value="All data">All Data</option>
                <option value="2022-1">January 2022</option>
                <option value="2022-2">February 2022</option>
                <option value="2022-3">March 2022</option>
                <option value="2022-4">April 2022</option>
                <option value="2022-5">May 2022</option>
                <option value="2022-6">June 2022</option>
                <option value="2022-7">July 2022</option>
                <option value="2022-8">August 2022</option>
                <option value="2022-9">September 2022</option>
                <option value="2022-10">October 2022</option>
                <option value="2022-10">November 2022</option>
                <option value="2022-12">Decemebr 2022</option>
                <option value="2023-1">January 2023</option>
                {/* Add more options for other months and years */}
                <option value="custom">Custom</option>
            </select>
            {/* <button onClick={filterByYearMonth(value)}></button> */}
            <span className='span' style={{color:"green"}}>Total Sold :{sold}</span>
            <span className='span' style={{color:"red"}}>Total Unsold :{unsold}</span>
            
             <div style={{maxHeight:"500px",overflowY:"auto"}}>
            <table className="table table-hover table-bordered mt-100" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <thead className='table-dark '>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Date</th>
                        <th>Image</th>
                    </tr>
                </thead>
                {currentItems.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td className={item.sold ? "bg-success" : "bg-danger"}>{item.sold ? "Sold" : "Unsold"}</td>
                            <td>{item.dateOfSale}</td>
                            <td><img style={{ width: "80px", height: "80px" }} src={item.image} alt={item.title} /></td>
                        </tr>
                    </tbody>
                ))}
            </table>
            </div>
            <Pagination
                itemsPerPage={itemsPerPage} currentPage={currentPage} setItemsPerPage={setItemsPerPage}
                totalItems={data.length}
                paginate={paginate}
            />
  <h3>{value}(YYYY-MM)</h3>
<div className="d-flex chart align-items-center justify-content-center">
            
            <Chart 
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="800"
            />
          </div>
        </div>
    );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate, setItemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    const handleClickNext = () => {
        if (hasNextPage) {
            paginate(currentPage + 1);
        }
    };

    const handleClickPrev = () => {
        if (hasPrevPage) {
            paginate(currentPage - 1);
        }
    };
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
    };

    return (
        <nav className="d-flex justify-content-between  my-4">
            <div className='d-flex '>
                <button
                    onClick={handleClickPrev}
                    disabled={!hasPrevPage}
                    className={`d-flex btn btn-primary pagination-btn mr-2 px-3 py-1 border rounded-md ${!hasPrevPage ? "text-gray-400 cursor-not-allowed" : ""}`}
                >
                    prev
                </button>
                <span className='p-2 text-sm text-gray'>{currentPage} of {totalPages}</span>
                <button
                    onClick={handleClickNext}
                    disabled={!hasNextPage}
                    className={`d-flex btn btn-primary pagination-btn px-3 py-1 border rounded-md ${!hasNextPage ? "text-gray-400 cursor-not-allowed" : ""}`}
                >
                    next
                </button>
            </div>
            <div className="mr-14">
                <select onChange={handleItemsPerPageChange} value={itemsPerPage} className="select btn btn-primary px-2 py-1">
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                </select>
            </div>
        </nav>
    );
};

export default Home;
