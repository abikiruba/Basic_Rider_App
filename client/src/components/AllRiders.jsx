import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { BASEURL } from '../constants/BaseUrl';
import { styled, Typography, Container, Button, TextField } from "@mui/material";
import { Image } from 'mui-image'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "../Loader/Loader";
import {toast } from "react-toastify";


const Btn = styled(Button)`
    background: transparant;
    height:10px;
    width:10px;
`


const AllRiders = () => {
    const [riders, setRiders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getAllRiders(currentPage);
    }, [currentPage]);




    //Axios Connecting the get backend method with frontend
    const getAllRiders = async (page) => {
        try {
            setIsLoading(true); // Start the loader

            const response = await axios.get(`${BASEURL}/api/v1`, {
                params: {
                    page: currentPage, // Use the current page value
                    limit: 2,
                    Name: searchQuery
                },
            });

            if (response.status === 200) {
                setTimeout(() => {
                    setRiders(response.data);
                    setIsLoading(false); // Stop the loader after a delay
                }, 2000); // Adjust the delay time as needed
            }
        } catch (error) {
            console.error("Error retrieving riders:", error);
            toast.error("Error retrieving riders. Please try again."); // Display error message using Toastify
        }
    };




    //Axios Connecting the delete backend method with frontend
    const deleteRider = async (id) => {
        try {
            setIsLoading(true); // Start the loader

            const response = await axios.delete(`${BASEURL}/api/v1/${id}`);

            if (response.status === 200) {
                setTimeout(() => {

                // Remove the deleted rider from the state
                setRiders(prevRiders => prevRiders.filter(rider => rider._id !== id));
                setIsLoading(false); // Stop the loader after a delay
                toast.success("Rider deleted successfully."); // Display success message using Toastify
            }, 2000); // Adjust the delay time as needed
        }
        } catch (error) {
            console.error("Error deleting rider:", error);
            toast.error("Error deleting rider. Please try again."); // Display error message using Toastify

        }
    };

    const getStatusLabel = (status) => {
        return status ? "Active" : "Not Active";
    };

    //handle the search function

    const handleSearchQueryChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        // Trigger search query
        if (value.trim() !== '') {
            handleSearch();
        } else {
            getAllRiders();
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${BASEURL}/api/v1`, {
                params: { Name: searchQuery },
            });

            if (response.status === 200) {
                setRiders(response.data);
            }
        } catch (error) {
            console.error('Error searching riders:', error);
            toast.error("Error searching riders. Please try again."); // Display error message using Toastify
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);

    };




    return (
        <>
            <Container>
                <Typography variant="h4" align="center" style={{ paddingTop: '40px' }}>All Riders List</Typography>
                <TextField
                    label="Search by Name"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    variant="outlined"
                    margin="normal"
                />
                <Button variant="contained" onClick={handleSearch} sx={{ margin: '25px 10px ' }}>
                    Search
                </Button>
                <div className="responsive-table">
                    <table>
                        <thead >
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>NRIC</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="8">
                                        <Loader />
                                    </td>
                                </tr>
                            ) : (
                                riders.map((rider) => (
                                    <tr key={rider._id}>
                                        <td>{rider.Id}</td>
                                        <td>{rider.Name}</td>
                                        <td>{rider.Email}</td>
                                        <td>{rider.Position}</td>
                                        <td>{getStatusLabel(rider.Status)}</td>
                                        <td>{rider.NRIC}</td>
                                        <td>
                                            <Image src={rider.Image} style={{ width: 100, height: 100 }} />
                                        </td>
                                        <td>
                                            <Btn component={Link} to={`/edit/${rider._id}`}>
                                                <EditIcon style={{ color: 'green' }} />
                                            </Btn>
                                            <Btn onClick={() => deleteRider(rider._id)}>
                                                <DeleteForeverIcon style={{ color: 'red' }} />
                                            </Btn>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>


                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1} sx={{ margin: '10px' }}>
                        Previous Page
                    </Button>
                    <Button variant="contained" onClick={handleNextPage} disabled={isLoading} sx={{ margin: '10px' }}>
                        {isLoading ? 'Loading...' : 'Next Page'}
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default AllRiders;
