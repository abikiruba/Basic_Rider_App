import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../constants/BaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, Select, MenuItem, Button, Typography, styled } from "@mui/material";
import { Image } from 'mui-image';
import { toast } from "react-toastify";
import validator from "validator";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 2% auto 0 auto;
  & > div {
    margin-top: 30px;
  }
`;

const EditRider = () => {
  const { id } = useParams();
  const [riderData, setRiderData] = useState({
    Id: "",
    Name: "",
    Email: "",
    Position: "",
    NRIC: "",
    Status: "",
    Image: null,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRider = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/v1/${id}`);
        const rider = response.data;
        setRiderData({
          Id: rider.Id.toString(),
          Name: rider.Name,
          Email: rider.Email,
          Position: rider.Position,
          NRIC: rider.NRIC,
          Status: rider.Status,
          Image: null,
        });
      } catch (error) {
        console.error("Error fetching rider:", error);
      }
    };

    fetchRider();
  }, [id]);

  const handleInputChange = (event) => {
    if (event.target.name === "Image") {
      setRiderData({ ...riderData, [event.target.name]: event.target.files[0] });
    } else {
      setRiderData({ ...riderData, [event.target.name]: event.target.value });
    }
  };

  const validateForm = () => {
    const formErrors = {};

    // Validate Id
    if (!riderData.Id) {
      formErrors.Id = "Please enter an Id.";
    }

    // Validate Name
    if (!riderData.Name) {
      formErrors.Name = "Please enter a Name.";
    } else if (!/^[A-Za-z]/.test(riderData.Name)) {
      formErrors.Name = "Name must start with an alphabet.";
    }

    // Validate Email
    if (!riderData.Email) {
      formErrors.Email = "Please enter an Email.";
    } else if (!validator.isEmail(riderData.Email)) {
      formErrors.Email = "Please enter a valid Email.";
    }

    // Validate NRIC
    if (!riderData.NRIC) {
      formErrors.NRIC = "Please enter an NRIC.";
    } else if (!validator.isLength(riderData.NRIC, { min: 1, max: 12 })) {
      formErrors.NRIC = "NRIC should be between 1 and 12 characters long.";
    }

    // Validate Status
    if (typeof riderData.Status !== "boolean") {
      formErrors.Status = "Please select a Status.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("Id", riderData.Id);
    formData.append("Name", riderData.Name);
    formData.append("Email", riderData.Email);
    formData.append("Position", riderData.Position);
    formData.append("NRIC", riderData.NRIC);
    formData.append("Status", riderData.Status);
    formData.append("Image", riderData.Image);

    try {
      const response = await axios.put(`${BASEURL}/api/v1/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        navigate("/");
        // Rider edited successfully
        console.log("Rider edited:", response.data);
        toast.success("Rider edited successfully.");

      }
    } catch (error) {
      console.error("Error editing rider:", error);
      if (error.response && error.response.data && error.response.data.error) {
        // Backend validation error occurred
        const validationErrors = error.response.data.error;
        setErrors(validationErrors);
      } else {
        // Other error occurred
        toast.error("Error editing riders. Please try again.");
      }
    }
  };

  return (
    <form>
      <Container>
        <Typography variant="h4" align="center">
          Edit Rider
        </Typography>
        <FormControl error={errors.Id}>
          <InputLabel>Id:</InputLabel>
          <Input name="Id" value={riderData.Id} onChange={handleInputChange} />
          {errors.Id && <span>{errors.Id}</span>}
        </FormControl>
        <FormControl error={errors.Name}>
          <InputLabel>Name:</InputLabel>
          <Input
            name="Name"
            value={riderData.Name}
            onChange={handleInputChange}
          />
          {errors.Name && <span>{errors.Name}</span>}
        </FormControl>
        <FormControl error={errors.Email}>
          <InputLabel>Email:</InputLabel>
          <Input
            name="Email"
            value={riderData.Email}
            onChange={handleInputChange}
          />
          {errors.Email && <span>{errors.Email}</span>}
        </FormControl>
        <FormControl error={errors.Position}>
          <InputLabel>Position:</InputLabel>
          <Input
            name="Position"
            value={riderData.Position}
            onChange={handleInputChange}
          />
          {errors.Position && <span>{errors.Position}</span>}
        </FormControl>
        <FormControl error={errors.NRIC}>
          <InputLabel>NRIC:</InputLabel>
          <Input
            name="NRIC"
            value={riderData.NRIC}
            onChange={handleInputChange}
          />
          {errors.NRIC && <span>{errors.NRIC}</span>}
        </FormControl>
        <FormControl error={errors.Status} fullWidth>
          <InputLabel>Status:</InputLabel>
          <Select
            name="Status"
            value={riderData.Status}
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
          {errors.Status && <span>{errors.Status}</span>}
        </FormControl>
        <FormControl>
          <Input
            accept="image/*"
            multiple
            type="file"
            name="Image"
            onChange={handleInputChange}
          />
        </FormControl>
        {riderData.Image && (
          <FormControl>
            <Image src={URL.createObjectURL(riderData.Image)} alt="Uploaded Image" style={{ width: '100px', marginTop: '10px' }} />
          </FormControl>
        )}
        <FormControl>
          <Button variant="contained" onClick={handleFormSubmit}>
            Edit Rider
          </Button>
        </FormControl>
      </Container>
    </form>
  );
};

export default EditRider;
